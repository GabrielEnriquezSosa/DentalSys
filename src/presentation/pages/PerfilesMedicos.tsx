import { Layout } from "../components/Layout/Layout";
import { Phone, Upload, Link, Contact, BadgeCheck } from "lucide-react";

export const PerfilesMedicos = () => {
  const inputClass =
    "w-full py-3.5 px-4 border border-transparent bg-slate-100 rounded-xl font-sans text-base text-slate-700 outline-none transition-all duration-200 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 placeholder:text-slate-400";
  const labelClass = "text-sm font-bold text-slate-700 mb-2";

  return (
    <Layout>
      <div className="p-10 w-full flex flex-col h-full overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">
            Perfiles Médicos
          </h1>
          <p className="text-base font-medium text-slate-500">
            Complete la información para registrar un nuevo médico en el sistema
            centralizado de Dental.sys.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-200">
          <div className="flex flex-col mb-8">
            <label className={labelClass}>Nombre Completo del Médico</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Ej. Dr. Juan Pérez"
            />
          </div>

          <div className="flex gap-8 mb-8">
            <div className="flex-1 flex flex-col">
              <label className={labelClass}>Especialidad</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Ej. Odontología Pediátrica"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className={labelClass}>Cédula Profesional</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Ingrese número de cédula"
              />
            </div>
          </div>

          <div className="flex gap-8 mb-8">
            <div className="flex-1 flex flex-col">
              <label className={labelClass}>Teléfono para Citas</label>
              <div className="relative flex items-center">
                <Phone size={20} className="absolute left-4 text-slate-400" />
                <input
                  type="text"
                  className={`${inputClass} pl-12`}
                  placeholder="+52 (55) 0000 0000"
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <label className={labelClass}>Universidad de Egreso</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Nombre de la institución"
              />
            </div>
          </div>

          <div className="flex flex-col mb-8">
            <label className={labelClass}>Domicilio del Consultorio</label>
            <textarea
              className={`${inputClass} resize-y min-h-[80px]`}
              placeholder="Calle, número, colonia, CP, ciudad"
            ></textarea>
          </div>

          <div className="flex-1 flex flex-col">
            <label className={labelClass}>Firma Digital (URL de Imagen)</label>
            <div className="relative flex items-center">
              <Link size={20} className="absolute left-4 text-slate-400" />
              <input
                type="text"
                className={`${inputClass} pl-12`}
                placeholder="https://ejemplo.com/firma.png"
              />
              <button className="bg-slate-200 border-none rounded-xl px-6 font-bold text-base flex items-center gap-2 cursor-pointer transition-colors duration-200 ml-4 h-[52px] text-slate-700 hover:bg-slate-300 shrink-0">
                <Upload size={20} />
                Subir
              </button>
            </div>

            <div className="mt-6 border-2 border-dashed border-slate-300 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 text-slate-400 text-sm font-medium">
              <span>Vista previa de la firma</span>
              <div className="w-56 h-28 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200">
                <Contact size={40} color="#cbd5e1" />
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center">
            <button className="w-full py-4 px-6 bg-sky-500 text-white border-none rounded-xl font-bold text-lg flex justify-center items-center gap-2 cursor-pointer transition-all duration-200 shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:bg-sky-600 hover:-translate-y-[1px] active:translate-y-0">
              <BadgeCheck size={24} />
              REGISTRAR PERFIL MÉDICO
            </button>
            <p className="mt-5 text-sm font-medium text-slate-400 text-center">
              Al registrar, el médico podrá acceder a su panel personalizado y
              gestionar expedientes clínicos.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
