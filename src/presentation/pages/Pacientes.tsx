import { useEffect, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { CustomInput } from "../components/ui/CustomInput";
import { usePatientStore } from "../../infrastructure/store/usePatientStore";
import { Users, Plus, Trash2, Mail, Phone, Calendar } from "lucide-react";

export const Pacientes = () => {
  const { patients, fetchPatients, createPatient, isLoading, error } = usePatientStore();
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    gender: "Masculino" as "Masculino" | "Femenino" | "Otro",
  });

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPatient(formData);
      setFormData({ fullName: "", phone: "", email: "", gender: "Masculino" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message || 'Error al guardar el paciente');
      } else {
        alert('Error desconocido al guardar el paciente');
      }
    }
  };

  const inputClass =
    "w-full py-3 px-4 border border-slate-200 bg-slate-50 rounded-xl font-sans text-sm text-slate-700 outline-none transition-all duration-200 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20";
  const labelClass = "text-xs font-bold text-slate-700 mb-2 uppercase";

  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-10 w-full flex flex-col h-full overflow-y-auto bg-slate-50">
        <div className="mb-8">
          <h1 className="text-xl md:text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
            <Users size={32} className="text-sky-500" />
            Directorio de Pacientes
          </h1>
          <p className="text-base font-medium text-slate-500 tracking-wide">
            Gestione la información clínica y de contacto de sus pacientes. (Ejemplo de Clean Architecture con Zustand)
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Formulario de Creación */}
          <div className="w-full xl:w-[400px] shrink-0">
            <div className="bg-white rounded-3xl p-5 md:p-8 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Plus size={20} className="text-sky-500" />
                NUEVO REGISTRO
              </h2>
              
              {error && (
                <div className="p-3 mb-4 text-xs font-bold bg-red-50 text-red-600 rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Nombre Completo *</label>
                  <CustomInput
                    type="text"
                    className={inputClass}
                    placeholder="Ej. María García"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Teléfono *</label>
                  <CustomInput
                    type="text"
                    className={inputClass}
                    placeholder="10 dígitos"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Correo (Opcional)</label>
                  <CustomInput
                    type="email"
                    className={inputClass}
                    placeholder="m.garcia@correo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Género</label>
                  <select 
                    className={inputClass}
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as "Masculino" | "Femenino" | "Otro" })}
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-4 w-full bg-sky-500 text-white font-bold py-3.5 rounded-xl hover:bg-sky-600 transition-colors shadow-sm disabled:opacity-50"
                >
                  {isLoading ? 'GUARDANDO...' : 'REGISTRAR PACIENTE'}
                </button>
              </form>
            </div>
          </div>

          {/* Lista de Pacientes */}
          <div className="flex-1 bg-white rounded-3xl p-5 md:p-8 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex justify-between items-center">
              <span>LISTADO GENERAL</span>
              <span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full text-xs font-bold">
                Total: {patients.length}
              </span>
            </h2>

            {isLoading && patients.length === 0 ? (
              <div className="flex justify-center p-10 text-slate-400 font-bold">Cargando datos...</div>
            ) : patients.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-16 text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl">
                <Users size={48} className="mb-4 opacity-50 text-slate-300" />
                <p className="font-bold text-slate-500">Aún no hay pacientes registrados.</p>
                <p className="text-sm">Agrega el primero desde el panel lateral.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {patients.map(patient => (
                  <div key={patient.id} className="p-5 border border-slate-100 rounded-2xl hover:border-sky-200 hover:shadow-md transition-all group cursor-pointer bg-slate-50/50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg group-hover:text-sky-600 transition-colors">
                          {patient.fullName}
                        </h3>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{patient.gender}</span>
                      </div>
                      <button className="text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="flex flex-col gap-2 mt-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <Phone size={14} className="text-slate-400" /> {patient.phone}
                      </div>
                      {patient.email && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                          <Mail size={14} className="text-slate-400" /> {patient.email}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <Calendar size={14} className="text-slate-400" /> Reg: {new Date(patient.createdAt).toLocaleDateString()}
                      </div>
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
