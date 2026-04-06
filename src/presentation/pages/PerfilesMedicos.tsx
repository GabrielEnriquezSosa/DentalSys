import { useEffect, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { CustomInput } from "../components/ui/CustomInput";
import { CustomTextarea } from "../components/ui/CustomTextarea";
import {
  formatTextWithPunctuation,
  formatNumber,
  formatPhoneMx,
} from "../utils/formatters";
import { useMedicalProfileStore } from "../../infrastructure/store/useMedicalProfileStore";
import {
  Phone,
  Upload,
  Link,
  Contact,
  BadgeCheck,
  Stethoscope,
  Trash2,
  GraduationCap,
  MapPin,
  Hash,
  User,
} from "lucide-react";

export const PerfilesMedicos = () => {
  const {
    profiles,
    fetchProfiles,
    createProfile,
    deleteProfile,
    isLoading,
    error,
  } = useMedicalProfileStore();

  const [formData, setFormData] = useState({
    fullName: "",
    specialty: "",
    licenseNumber: "",
    phone: "",
    university: "",
    officeAddress: "",
    signatureUrl: "",
  });

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const resetForm = () => {
    setFormData({
      fullName: "",
      specialty: "",
      licenseNumber: "",
      phone: "",
      university: "",
      officeAddress: "",
      signatureUrl: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProfile(formData);
      resetForm();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Error desconocido al registrar el perfil.");
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Está seguro de eliminar este perfil médico?")) {
      await deleteProfile(id);
    }
  };

  const inputClass =
    "w-full py-3.5 px-4 border border-transparent bg-slate-100 rounded-xl font-sans text-base text-slate-700 outline-none transition-all duration-200 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 placeholder:text-slate-400";
  const labelClass = "text-sm font-bold text-slate-700 mb-2";

  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-10 w-full flex flex-col h-full overflow-y-auto bg-slate-50">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl md:text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
            <Stethoscope size={32} className="text-cyan-500" />
            Perfiles Médicos
          </h1>
          <p className="text-base font-medium text-slate-500 tracking-wide">
            Registre y gestione los perfiles de los médicos del consultorio.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Formulario de Creación */}
          <div className="w-full xl:w-[680px] shrink-0">
            <div className="bg-white rounded-3xl p-5 md:p-8 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-wider">
                <BadgeCheck size={20} className="text-cyan-500" />
                Nuevo Perfil
              </h2>

              {error && (
                <div className="p-3 mb-4 text-xs font-bold bg-red-50 text-red-600 rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Nombre */}
                <div className="flex flex-col">
                  <label className={labelClass}>
                    Nombre Completo del Médico *
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <CustomInput
                      type="text"
                      className={`${inputClass} pl-11`}
                      placeholder="Ej. Dr. Juan Pérez"
                      maxLength={50}
                      value={formData.fullName}
                      onInput={(e) => {
                        e.currentTarget.value = formatTextWithPunctuation(
                          e.currentTarget.value,
                        );
                        setFormData({
                          ...formData,
                          fullName: e.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                </div>

                {/* Especialidad + Cédula */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col">
                    <label className={labelClass}>Especialidad *</label>
                    <CustomInput
                      type="text"
                      className={inputClass}
                      placeholder="Ej. Odontología Pediátrica"
                      maxLength={50}
                      value={formData.specialty}
                      onInput={(e) => {
                        e.currentTarget.value = formatTextWithPunctuation(
                          e.currentTarget.value,
                        );
                        setFormData({
                          ...formData,
                          specialty: e.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <label className={labelClass}>Cédula Profesional *</label>
                    <div className="relative">
                      <Hash
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <CustomInput
                        type="text"
                        className={`${inputClass} pl-11`}
                        placeholder="8 dígitos"
                        maxLength={8}
                        value={formData.licenseNumber}
                        onInput={(e) => {
                          e.currentTarget.value = formatNumber(
                            e.currentTarget.value,
                          );
                          setFormData({
                            ...formData,
                            licenseNumber: e.currentTarget.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Teléfono + Universidad */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col">
                    <label className={labelClass}>Teléfono para Citas *</label>
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <CustomInput
                        type="tel"
                        className={`${inputClass} pl-11`}
                        placeholder="+52 (55) 0000 0000"
                        maxLength={14}
                        value={formData.phone}
                        onInput={(e) => {
                          e.currentTarget.value = formatPhoneMx(
                            e.currentTarget.value,
                          );
                          setFormData({
                            ...formData,
                            phone: e.currentTarget.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <label className={labelClass}>Universidad de Egreso</label>
                    <div className="relative">
                      <GraduationCap
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <CustomInput
                        type="text"
                        className={`${inputClass} pl-11`}
                        placeholder="Nombre de la institución"
                        maxLength={50}
                        value={formData.university}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            university: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Domicilio */}
                <div className="flex flex-col">
                  <label className={labelClass}>
                    Domicilio del Consultorio
                  </label>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-4 text-slate-400"
                    />
                    <CustomTextarea
                      className={`${inputClass} pl-11 resize-none overflow-hidden min-h-[80px] pb-8`}
                      placeholder="Calle, número, colonia, CP, ciudad"
                      maxLength={100}
                      value={formData.officeAddress}
                      onInput={(e) => {
                        e.currentTarget.style.height = "80px";
                        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                        setFormData({
                          ...formData,
                          officeAddress: e.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                </div>

                {/* Firma Digital */}
                <div className="flex flex-col">
                  <label className={labelClass}>
                    Firma Digital (URL de Imagen)
                  </label>
                  <div className="relative flex items-center gap-3">
                    <div className="relative flex-1">
                      <Link
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        className={`${inputClass} pl-11`}
                        placeholder="https://ejemplo.com/firma.png"
                        value={formData.signatureUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            signatureUrl: e.target.value,
                          })
                        }
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-slate-200 border-none rounded-xl px-5 font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors duration-200 h-[52px] text-slate-700 hover:bg-slate-300 shrink-0"
                    >
                      <Upload size={18} />
                      Subir
                    </button>
                  </div>
                  {formData.signatureUrl ? (
                    <div className="mt-4 border border-slate-200 rounded-2xl p-4 flex items-center justify-center bg-white">
                      <img
                        src={formData.signatureUrl}
                        alt="Vista previa de firma"
                        className="max-w-[220px] max-h-[100px] object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="mt-4 border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 text-slate-400 text-sm font-medium">
                      <Contact size={32} color="#cbd5e1" />
                      <span>Vista previa de la firma</span>
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 w-full py-4 px-6 bg-sky-500 text-white border-none rounded-xl font-bold text-base flex justify-center items-center gap-2 cursor-pointer transition-all duration-200 shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:bg-sky-600 hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-50"
                >
                  <BadgeCheck size={22} />
                  {isLoading ? "REGISTRANDO..." : "REGISTRAR PERFIL MÉDICO"}
                </button>
              </form>
            </div>
          </div>

          {/* Listado de Perfiles */}
          <div className="flex-1 bg-white rounded-3xl p-5 md:p-8 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex justify-between items-center">
              <span className="uppercase tracking-wider">
                Directorio Médico
              </span>
              <span className="bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full text-xs font-bold">
                Total: {profiles.length}
              </span>
            </h2>

            {isLoading && profiles.length === 0 ? (
              <div className="flex justify-center p-10 text-slate-400 font-bold">
                Cargando perfiles...
              </div>
            ) : profiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-16 text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl">
                <Stethoscope
                  size={48}
                  className="mb-4 opacity-50 text-slate-300"
                />
                <p className="font-bold text-slate-500">
                  Aún no hay perfiles médicos registrados.
                </p>
                <p className="text-sm">
                  Registra el primero con el formulario lateral.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="p-5 border border-slate-100 rounded-2xl hover:border-cyan-200 hover:shadow-md transition-all group cursor-pointer bg-slate-50/50"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0 group-hover:bg-cyan-100 transition-colors">
                          <Stethoscope size={22} className="text-cyan-500" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 text-lg group-hover:text-cyan-600 transition-colors">
                            {profile.fullName}
                          </h3>
                          <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest">
                            {profile.specialty}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(profile.id);
                        }}
                        className="text-slate-300 hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 mt-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <Hash size={14} className="text-slate-400" />
                        Cédula: {profile.licenseNumber}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <Phone size={14} className="text-slate-400" />
                        {profile.phone}
                      </div>
                      {profile.university && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                          <GraduationCap size={14} className="text-slate-400" />
                          {profile.university}
                        </div>
                      )}
                      {profile.officeAddress && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                          <MapPin size={14} className="text-slate-400" />
                          {profile.officeAddress.length > 40
                            ? profile.officeAddress.substring(0, 40) + "..."
                            : profile.officeAddress}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
