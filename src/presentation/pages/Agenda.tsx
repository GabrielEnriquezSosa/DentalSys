import { Layout } from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import { CustomTimePicker } from "../components/ui/CustomTimePicker";
import { CustomDatePicker } from "../components/ui/CustomDatePicker";
import {
  PlusCircle,
  Calendar as CalendarIcon,
  Lightbulb,
  CalendarDays,
} from "lucide-react";

export const Agenda = () => {
  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-slate-50 transition-all text-gray-700 font-medium text-base";
  const labelClass =
    "block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide";

  return (
    <Layout>
      <div className="p-10 h-full flex flex-col w-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 uppercase tracking-tight">
              AGENDA
            </h1>
            <p className="text-base font-medium text-slate-500 mt-1">
              Registro y control de citas
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/agenda/calendario"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all bg-sky-50 text-sky-600 hover:bg-sky-100 text-base shadow-sm"
            >
              <CalendarDays size={20} />
              MOSTRAR CALENDARIO
            </Link>
            <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-base shadow-sm">
              <CalendarIcon size={20} className="text-sky-500" />
              09/03/2026
            </button>
          </div>
        </div>

        {/* Content Split */}
        <div className="flex gap-8 flex-1 items-start">
          {/* Left Column - Nueva Cita */}
          <div className="w-[420px] flex flex-col gap-6 shrink-0">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 tracking-tight">
                <PlusCircle size={24} className="text-sky-500" />
                NUEVA CITA
              </h2>

              <div className="mb-4">
                <label className={labelClass}>
                  NOMBRE COMPLETO DEL PACIENTE
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Ej. Juan Pérez"
                />
              </div>

              <div className="mb-6">
                <label className={labelClass}>WHATSAPP</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-base">
                    +52 ...
                  </span>
                  <input type="text" className={`${inputClass} pl-16`} />
                </div>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className={labelClass}>FECHA</label>
                  <CustomDatePicker className={inputClass} value="09/03/2026" />
                </div>
                <div className="flex-1">
                  <label className={labelClass}>HORA</label>
                  <CustomTimePicker
                    className={inputClass}
                    placeholder="--:--"
                  />
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className={labelClass}>DURACIÓN</label>
                  <select className={inputClass} defaultValue="30 min">
                    <option>15 min</option>
                    <option>30 min</option>
                    <option>45 min</option>
                    <option>60 min</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className={labelClass}>TRATAMIENTO</label>
                  <select className={inputClass} defaultValue="Limpieza">
                    <option>Consulta M.</option>
                    <option>Limpieza</option>
                    <option>Extracción</option>
                    <option>Ortodoncia</option>
                  </select>
                </div>
              </div>

              <button className="w-full mt-4 flex items-center justify-center gap-2 bg-[#0ea5e9] text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-sky-600 transition-colors shadow-sm">
                <PlusCircle size={20} />
                AGENDAR CITA
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100 flex gap-4 items-start">
              <Lightbulb size={28} className="text-sky-500 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-sky-800 leading-relaxed">
                Los pacientes recibirán un recordatorio automático por WhatsApp
                2 horas antes de su cita.
              </p>
            </div>
          </div>

          {/* Right Column - Panel Consultas */}
          <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col relative h-[700px]">
            {/* Panel Header */}
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-800 tracking-wide uppercase">
                PANEL DE CONSULTAS PROGRAMADAS
              </h2>
              <div className="bg-red-50 text-red-500 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                0 Cita(s) Pendiente(s)
              </div>
            </div>

            {/* Panel Content (Empty State) */}
            <div className="flex-1 flex flex-col items-center justify-center p-10 bg-slate-50/50">
              <div className="w-40 h-40 bg-red-50 rounded-3xl flex items-center justify-center mb-8">
                <CalendarIcon
                  size={64}
                  className="text-slate-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Sin actividad para hoy
              </h3>
              <p className="text-base font-medium text-slate-500 text-center max-w-sm leading-relaxed">
                No hay citas registradas para el día 2026-03-09.
                <br />
                Utiliza el formulario lateral para programar un nuevo paciente.
              </p>
            </div>

            {/* Panel Footer */}
            <div className="p-6 border-t border-slate-100 flex justify-between items-center bg-white rounded-b-3xl">
              <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                <Lightbulb size={16} />
                Haga clic en una franja horaria para ver detalles rápidos
              </p>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                  <span className="text-xs font-bold text-slate-600 uppercase">
                    Confirmado
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                  <span className="text-xs font-bold text-slate-600 uppercase">
                    Pendiente
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
