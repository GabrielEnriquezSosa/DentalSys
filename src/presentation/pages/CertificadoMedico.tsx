import { Layout } from "../components/Layout/Layout";
import { formatTextOnly, formatNumber, formatTextWithPunctuation } from "../utils/formatters";
import { CustomInput } from "../components/ui/CustomInput";
import { CustomTextarea } from "../components/ui/CustomTextarea";
import {
  FileBadge,
  User,
  Info,
  Stethoscope,
  Search,
  Calendar as CalendarIcon,
  PenLine,
  Award,
} from "lucide-react";

export const CertificadoMedico = () => {
  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white transition-all text-gray-700 font-medium text-base";
  const inputDarkClass =
    "w-full border border-slate-600 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-slate-700 transition-all text-white font-medium text-base";
  const labelClass =
    "block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider";

  return (
    <Layout>
      <div className="p-10 pb-36 w-full">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
              <FileBadge size={28} className="text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                CERTIFICADO MÉDICO
              </h1>
              <p className="text-base font-medium text-slate-500 mt-0.5">
                Gestión y emisión de certificados oficiales
              </p>
            </div>
          </div>
        </div>

        {/* Datos del Paciente */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <User size={24} className="text-sky-600" />
            DATOS DEL PACIENTE
          </h2>

          <div className="flex gap-8">
            <div className="flex-[2]">
              <label className={labelClass}>NOMBRE COMPLETO</label>
              <CustomInput
                type="text"
                className={inputClass}
                placeholder="Ej: Juan Pérez García"
                maxLength={50}
                onInput={(e) => {
                  e.currentTarget.value = formatTextOnly(e.currentTarget.value);
                }}
              />
            </div>
            <div className="flex-[0.6]">
              <label className={labelClass}>EDAD</label>
              <CustomInput
                type="text"
                className={inputClass}
                placeholder="Ej: 34"
                maxLength={2}
                onInput={(e) => {
                  e.currentTarget.value = formatNumber(e.currentTarget.value);
                }}
              />
            </div>
          </div>
        </div>

        {/* Datos Generales */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Info size={24} className="text-sky-600" />
            DATOS GENERALES
          </h2>

          <div className="grid grid-cols-3 gap-8">
            <div>
              <label className={labelClass}>MÉDICO CERTIFICANTE</label>
              <CustomInput
                type="text"
                className={inputDarkClass}
                placeholder="Ej: Dr. Martínez"
                maxLength={50}
                onInput={(e) => {
                  e.currentTarget.value = formatTextWithPunctuation(e.currentTarget.value);
                }}
              />
            </div>
            <div>
              <label className={labelClass}>LUGAR DE EXPEDICIÓN</label>
              <CustomInput
                type="text"
                className={inputDarkClass}
                placeholder="Ej: Ciudad de México"
                maxLength={50}
                onInput={(e) => {
                  e.currentTarget.value = formatTextWithPunctuation(e.currentTarget.value);
                }}
              />
            </div>
            <div>
              <label className={labelClass}>FECHA DE EXPEDICIÓN</label>
              <CustomInput
                type="date"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Información Clínica */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Stethoscope size={24} className="text-sky-600" />
            INFORMACIÓN CLÍNICA
          </h2>

          <div className="mb-6">
            <label className={labelClass}>DIAGNÓSTICO</label>
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <CustomInput
                type="text"
                className={`${inputClass} pl-12`}
                placeholder="Buscar diagnóstico (CIE-10)..."
                maxLength={25}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>PROCEDIMIENTO REALIZADO</label>
            <CustomTextarea
              className={`${inputClass} resize-none overflow-hidden min-h-[160px] pb-8`}
              placeholder="Describa a detalle..."
              onInput={(e) => {
                e.currentTarget.style.height = "160px";
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
            />
          </div>
        </div>

        {/* Indicaciones de Reposo */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <CalendarIcon size={24} className="text-sky-600" />
            INDICACIONES DE REPOSO
          </h2>

          <div className="grid grid-cols-3 gap-8">
            <div>
              <label className={labelClass}>DÍAS DE REPOSO</label>
              <input
                type="number"
                className={inputDarkClass}
                placeholder="Ej: 3"
                min={0}
              />
            </div>
            <div>
              <label className={labelClass}>DESDE (FECHA)</label>
              <input
                type="date"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>HASTA (FECHA)</label>
              <input
                type="date"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Firmas */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-0">
          <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <PenLine size={24} className="text-sky-600" />
            FIRMAS
          </h2>

          <label className="flex items-center gap-4 cursor-pointer select-none bg-slate-50 rounded-xl px-5 py-4 border border-slate-200 hover:border-sky-300 transition-colors">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-sky-600 focus:ring-sky-500 accent-sky-600"
            />
            <span className="text-base font-medium text-slate-700">
              Incluir espacios para firmas digitales
            </span>
          </label>
        </div>

        {/* Footer Actions */}
        <div className="fixed bottom-0 left-64 right-0 p-6 bg-white border-t border-gray-200 flex justify-end gap-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
          <button className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base transition-all text-sky-600 hover:text-sky-700 hover:bg-sky-50">
            Cancelar
          </button>
          <button className="flex items-center gap-2 bg-sky-500 text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-sky-600 transition-colors shadow-sm">
            <Award size={20} />
            Generar Certificado
          </button>
        </div>
      </div>
    </Layout>
  );
};
