import { Layout } from "../components/Layout/Layout";
import {
  CreditCard,
  X,
  Save,
  Info,
  ChevronLeft,
  ChevronRight,
  List,
} from "lucide-react";

export const Servicios = () => {
  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-slate-50 transition-all text-gray-700 font-medium text-base";
  const labelClass =
    "block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide";

  const serviciosList = [
    {
      id: 1,
      name: "extraccion",
      desc: "extraccion de molares",
      cost: "800.00",
    },
    {
      id: 2,
      name: "limpieza profunda",
      desc: "remoción de sarro y pulido",
      cost: "650.00",
    },
    {
      id: 3,
      name: "ortodoncia - mensualidad",
      desc: "ajuste de brackets metálicos",
      cost: "1,200.00",
    },
    {
      id: 4,
      name: "blanqueamiento led",
      desc: "procedimiento estético por sesión",
      cost: "2,500.00",
    },
    {
      id: 5,
      name: "radiografía periapical",
      desc: "diagnóstico por imagen digital",
      cost: "350.00",
    },
  ];

  return (
    <Layout>
      <div className="p-10 h-full flex flex-col w-full">
        {/* Header */}
        <div className="mb-10">
          <div className="text-sm font-bold text-sky-600 mb-2 flex items-center gap-2">
            Configuración <span className="text-slate-300">›</span> Servicios y
            Precios
          </div>
          <h1 className="text-3xl font-bold text-[#006085] tracking-tight">
            Gestión de Servicios y Precios
          </h1>
          <p className="text-base font-medium text-slate-500 mt-2">
            Actualiza el catálogo de procedimientos y tarifas de tu clínica.
          </p>
        </div>

        {/* Content Split */}
        <div className="flex gap-8 flex-1 items-start">
          {/* Left Column - Nuevo Servicio */}
          <div className="w-[420px] flex flex-col gap-6 shrink-0">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col gap-8">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-3 tracking-tight">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <CreditCard size={20} />
                </div>
                Nuevo Servicio
              </h2>

              <div className="flex flex-col gap-5">
                <div>
                  <label className={labelClass}>NOMBRE DEL SERVICIO</label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Ej: Limpieza Ultrasónica"
                  />
                </div>

                <div>
                  <label className={labelClass}>MONTO DEL SERVICIO ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-lg">
                      $
                    </span>
                    <input
                      type="text"
                      className={`${inputClass} pl-10`}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>DESCRIPCIÓN BREVE</label>
                  <textarea
                    className={`${inputClass} min-h-[120px] resize-none`}
                    placeholder="Detalles del procedimiento..."
                  ></textarea>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-[#007ba7] text-white px-6 py-4 rounded-xl font-bold text-base hover:bg-[#006085] transition-colors shadow-sm">
                <Save size={20} />+ REGISTRAR EN CATÁLOGO
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#006085] font-bold text-base">
                <Info size={20} />
                Actualización Global
              </div>
              <p className="text-sm font-medium text-slate-500 leading-relaxed pl-7">
                Los cambios realizados en los precios se reflejarán
                instantáneamente en el módulo de facturación y agenda.
              </p>
            </div>
          </div>

          {/* Right Column - Panel and Stats */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Catálogo Vigente Panel */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col flex-1">
              {/* Header */}
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-3 tracking-tight">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center">
                    <List size={20} />
                  </div>
                  Catálogo Vigente
                </h2>
                <div className="bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider flex items-center gap-2">
                  TOTAL: <span className="text-[#006085] text-sm">24</span>
                </div>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-[1fr_2fr_120px_80px] gap-6 px-8 py-5 border-b border-slate-100 bg-slate-50/50">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  SERVICIO
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  DESCRIPCIÓN
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                  COSTO
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                  ELIMINAR
                </div>
              </div>

              {/* Table Body */}
              <div className="flex flex-col">
                {serviciosList.map((srv) => (
                  <div
                    key={srv.id}
                    className="grid grid-cols-[1fr_2fr_120px_80px] gap-6 px-8 py-6 border-b border-slate-50 items-center hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="text-base font-bold text-slate-800">
                      {srv.name}
                    </div>
                    <div className="text-sm font-medium text-slate-500 truncate">
                      {srv.desc}
                    </div>
                    <div className="text-base font-bold text-[#007ba7] text-right">
                      $ {srv.cost}
                    </div>
                    <div className="flex justify-center">
                      <button className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-xl">
                        <X size={20} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="p-6 border-t border-slate-100 flex justify-between items-center mt-auto">
                <div className="text-sm font-medium text-slate-500">
                  Mostrando 5 de 24 registros
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-[#007ba7] text-white font-bold text-base flex items-center justify-center shadow-sm">
                    1
                  </button>
                  <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-50 transition-colors text-base">
                    2
                  </button>
                  <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Summary Stats */}
            <div className="grid grid-cols-2 gap-8 mt-2">
              {/* Costo Promedio */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col justify-center">
                <p className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">
                  COSTO PROMEDIO
                </p>
                <h3 className="text-3xl font-bold text-slate-800 tracking-tight">
                  $ 1,100.00
                </h3>
              </div>
              {/* Ultima actualización */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col justify-center">
                <p className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">
                  ÚLTIMA ACTUALIZACIÓN
                </p>
                <h3 className="text-lg font-bold text-slate-800">
                  Hoy, 10:45 AM
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
