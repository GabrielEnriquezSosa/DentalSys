import { Layout } from "../components/Layout/Layout";
import {
  FileText,
  History,
  Settings,
  Lock,
  User,
  Activity,
  Plus,
  Search,
  X,
  AlertTriangle,
  Calendar as CalendarIcon,
  Info,
  Printer,
} from "lucide-react";

export const RecetaMedica = () => {
  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all text-gray-700 font-medium text-base";
  const labelClass =
    "block text-sm font-bold text-gray-500 mb-2 tracking-wider";

  return (
    <Layout>
      <div className="p-10 pb-36">
        {/* Breadcrumbs & Header Actions */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="text-sm font-semibold text-gray-500 mb-2 tracking-wider">
              PACIENTES /{" "}
              <span className="text-gray-900 border-b border-gray-900 pb-0.5">
                NUEVA RECETA
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              Nueva Receta Médica
              <FileText size={28} className="text-slate-400" />
            </h1>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-base transition-all border border-pink-500 text-pink-500 hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <History size={18} /> Ver Hist. de Consultas
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-base transition-all border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <Settings size={18} /> Ajustes Receta
            </button>
          </div>
        </div>

        {/* Top Cards Row: Médico / Paciente */}
        <div className="flex gap-8 mb-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 flex-[0.4]">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lock size={24} className="text-sky-500" />
              Datos del Médico
            </h2>
            <div className="mb-6">
              <label className={labelClass}>MÉDICO TRATANTE</label>
              <select
                className={inputClass}
                defaultValue="Dr. Smith (Odontología General)"
              >
                <option>Dr. Smith (Odontología General)</option>
                <option>Dra. Martínez (Ortodoncia)</option>
              </select>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-orange-50 border border-orange-200 text-orange-800">
              <AlertTriangle size={24} className="shrink-0" />
              <span className="text-sm font-medium leading-relaxed">
                Asegúrese de que el folio de la receta coincida con el rango
                autorizado por la clínica para este médico.
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 flex-[0.6]">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <User size={24} className="text-sky-500" />
              Datos del Paciente
            </h2>

            <div className="flex gap-6 mb-4">
              <div className="flex-1">
                <label className={labelClass}>NOMBRE COMPLETO</label>
                <input
                  type="text"
                  className={`${inputClass} bg-slate-50 font-semibold`}
                  defaultValue="Juan Pérez López"
                  readOnly
                />
              </div>
              <div className="flex-1">
                <label className={labelClass}>TELÉFONO</label>
                <input
                  type="text"
                  className={`${inputClass} bg-slate-50 font-semibold`}
                  defaultValue="+52 555-0123"
                  readOnly
                />
              </div>
            </div>

            <div className="flex gap-6 mb-4">
              <div className="flex-1">
                <label className={labelClass}>GÉNERO</label>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button className="flex-1 py-2 text-sm font-semibold rounded-md transition-all shadow-sm bg-white text-gray-900">
                    Masculino
                  </button>
                  <button className="flex-1 py-2 text-sm font-semibold rounded-md transition-all text-gray-500 hover:text-gray-900">
                    Femenino
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <label className={labelClass}>EDAD / FECHA NAC.</label>
                <input
                  type="text"
                  className={`${inputClass} bg-slate-50 font-semibold`}
                  defaultValue="28 años (12/05/1995)"
                  readOnly
                />
              </div>
            </div>

            <div className="mb-0">
              <label className={labelClass}>ALERGIAS CONOCIDAS</label>
              <div className="flex flex-wrap gap-3 mt-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-red-100 text-red-700">
                  PENICILINA{" "}
                  <X size={14} className="cursor-pointer hover:opacity-70" />
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-red-100 text-red-700">
                  LÁTEX{" "}
                  <X size={14} className="cursor-pointer hover:opacity-70" />
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500 bg-transparent transition-colors">
                  + AÑADIR
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Signos Vitales y Diagnóstico Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Activity size={24} className="text-sky-500" />
            Signos Vitales y Diagnóstico
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-10">
            <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
              <div className="text-xs font-bold text-gray-500 mb-2">PESO</div>
              <div className="text-2xl font-bold text-gray-900">
                74
                <span className="text-sm text-gray-400 font-medium ml-1">
                  kg
                </span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
              <div className="text-xs font-bold text-gray-500 mb-2">TALLA</div>
              <div className="text-2xl font-bold text-gray-900">
                1.78
                <span className="text-sm text-gray-400 font-medium ml-1">
                  m
                </span>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
              <div className="text-xs font-bold text-blue-600 mb-2">IMC</div>
              <div className="text-2xl font-bold text-blue-700">23.4</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
              <div className="text-xs font-bold text-gray-500 mb-2">SPO2</div>
              <div className="text-2xl font-bold text-gray-900">
                98
                <span className="text-sm text-gray-400 font-medium ml-1">
                  %
                </span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
              <div className="text-xs font-bold text-gray-500 mb-2">FC</div>
              <div className="text-2xl font-bold text-gray-900">
                72
                <span className="text-sm text-gray-400 font-medium ml-1">
                  bpm
                </span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
              <div className="text-xs font-bold text-gray-500 mb-2">FR</div>
              <div className="text-2xl font-bold text-gray-900">
                16
                <span className="text-sm text-gray-400 font-medium ml-1">
                  rpm
                </span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
              <div className="text-xs font-bold text-gray-500 mb-2">T/A</div>
              <div className="text-xl font-bold text-gray-900">120/80</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
              <div className="text-xs font-bold text-gray-500 mb-2">TEMP</div>
              <div className="text-2xl font-bold text-gray-900">
                36.6
                <span className="text-sm text-gray-400 font-medium ml-1">
                  °C
                </span>
              </div>
            </div>
          </div>

          <div className="mb-0">
            <label className={labelClass}>DIAGNÓSTICO MÉDICO</label>
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  className={`${inputClass} pl-12 text-base`}
                  placeholder="Buscar diagnóstico (CIE-10)..."
                />
              </div>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap">
                BUSCAR
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gray-100 text-gray-700">
                K02.1 - Caries de la dentina{" "}
                <X size={14} className="cursor-pointer hover:opacity-70" />
              </div>
            </div>
          </div>
        </div>

        {/* Medicamentos e Indicaciones */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-0">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Plus size={24} className="text-sky-500" />
            Medicamentos e Indicaciones
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50 mb-8 group">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus size={32} />
            </div>
            <div className="text-base font-bold text-gray-900 mb-2 tracking-wide">
              AGREGAR MEDICAMENTO
            </div>
            <div className="text-sm text-gray-500 font-medium">
              Presione para buscar en el catálogo o agregar entrada manual
            </div>
          </div>

          <div className="flex gap-8 mb-0">
            <div className="flex-[1.5]">
              <label className={labelClass}>INDICACIONES ADICIONALES</label>
              <textarea
                className={`${inputClass} resize-y min-h-[140px]`}
                placeholder="Dieta blanda, evitar irritantes, no realizar esfuerzos físicos..."
              ></textarea>
            </div>
            <div className="flex-1">
              <label className={labelClass}>PRÓXIMA CITA</label>
              <div className="relative mb-6">
                <CalendarIcon
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  className={`${inputClass} pl-12 text-base`}
                  defaultValue="24 / Septiembre / 2024"
                />
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 mt-0">
                <Info size={24} className="shrink-0" />
                <span className="text-sm font-medium leading-relaxed">
                  Se generará un recordatorio automático para el paciente 24
                  horas antes de su consulta vía WhatsApp y correo electrónico.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="fixed bottom-0 left-64 right-0 p-6 bg-white border-t border-gray-200 flex justify-end gap-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
          <button className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base transition-all border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
            GUARDAR BORRADOR
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
            <Printer size={20} /> EMITIR RECETA MÉDICA
          </button>
        </div>
      </div>
    </Layout>
  );
};
