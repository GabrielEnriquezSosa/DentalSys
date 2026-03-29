import { useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { NuevoConsentimientoModal } from "../components/modals/NuevoConsentimientoModal";
import {
  Search,
  FileUp,
  Plus,
  FileText,
  HelpCircle,
  Play,
  CheckCircle2,
  PenLine,
  CloudUpload,
} from "lucide-react";

export const ConsentimientoInformado = () => {
  const [showNuevo, setShowNuevo] = useState(false);
  return (
    <Layout>
      <div className="p-10 pb-8 flex flex-col min-h-[calc(100vh-2rem)]">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 uppercase tracking-wide mb-1">
              Consentimiento Informado
            </h1>
            <p className="text-base text-slate-500 font-medium">
              Gestiona y genera documentos legales para tus procedimientos.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 shadow-sm">
              <FileUp size={18} />
              CARGAR TXT
            </button>
            <button
              onClick={() => setShowNuevo(true)}
              className="flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-sky-700 transition-colors shadow-sm border-none cursor-pointer"
            >
              <Plus size={18} />
              NUEVO CONSENTIMIENTO
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Buscar consentimiento por nombre..."
            className="w-full max-w-2xl border border-slate-200 rounded-xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white transition-all text-slate-700 font-medium text-base"
          />
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
          <div className="w-24 h-24 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
            <FileText size={40} className="text-slate-300" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            No se encontraron consentimientos
          </h2>
          <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
            Intenta ajustar tu búsqueda o crea uno nuevo para comenzar a
            gestionar la documentación legal de tu clínica.
          </p>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 cursor-pointer">
              <HelpCircle size={18} />
              Guía de uso
            </button>
            <button className="flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-sky-700 transition-colors shadow-sm border-none cursor-pointer">
              <Play size={16} />
              Ver Tutorial
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex justify-between items-center py-4 border-t border-slate-200 mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-semibold tracking-wider">
            <span className="w-2 h-2 bg-slate-300 rounded-full" />0 DOCUMENTOS
            EN TOTAL
          </div>
          <div className="flex gap-6">
            <button className="text-sm font-bold text-sky-700 uppercase tracking-wider bg-transparent border-none cursor-pointer hover:text-sky-800 transition-colors">
              Ver Historial
            </button>
            <button className="text-sm font-bold text-sky-700 uppercase tracking-wider bg-transparent border-none cursor-pointer hover:text-sky-800 transition-colors">
              Configuración de Firma
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-5">
          {/* Plantillas base */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                <CheckCircle2 size={20} className="text-sky-600" />
              </div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Legal
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              Plantillas base
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Accede a 15 modelos legales pre-aprobados por el gremio dental.
            </p>
          </div>

          {/* Configurar Firmas */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <PenLine size={20} className="text-amber-600" />
              </div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Firma Digital
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              Configurar Firmas
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Habilita la captura de firma biométrica en tabletas o smartphones.
            </p>
          </div>

          {/* Archivo en la Nube */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <CloudUpload size={20} className="text-amber-700" />
              </div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Sincronización
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              Archivo en la Nube
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Todos los consentimientos se vinculan automáticamente al historial
              clínico.
            </p>
          </div>
        </div>
      </div>

      {/* Modal Nuevo Consentimiento */}
      <NuevoConsentimientoModal
        isOpen={showNuevo}
        onClose={() => setShowNuevo(false)}
      />
    </Layout>
  );
};
