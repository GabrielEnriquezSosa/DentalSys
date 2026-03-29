import { useState } from "react";
import { Settings, X, Upload, Save, Eye, ChevronRight } from "lucide-react";
import type { AjusteReceta } from "../../../domain/receta/entities";
import { SubirRecetaModal } from "./SubirRecetaModal";

interface AjustesRecetaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormatoImpresion = AjusteReceta["formato"];

export const AjustesRecetaModal = ({
  isOpen,
  onClose,
}: AjustesRecetaModalProps) => {
  const [formato, setFormato] = useState<FormatoImpresion>("MediaCarta");
  const [showSubirReceta, setShowSubirReceta] = useState(false);

  if (!isOpen) return null;

  const formatos: { key: FormatoImpresion; label: string }[] = [
    { key: "MediaCarta", label: "Media Carta" },
    { key: "Carta", label: "Carta" },
    { key: "Personalizada", label: "Personalizada" },
  ];

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-[fadeIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-7 pb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <Settings size={22} className="text-slate-500" />
              Configuración
            </h2>
            <p className="text-sm text-slate-500 mt-1 ml-[30px] font-medium">
              Personaliza el diseño y visibilidad de tu receta
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-transparent border-none cursor-pointer text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-7 pb-4">
          {/* Formato de Impresión */}
          <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
            Formato de Impresión
          </label>
          <div className="flex gap-3 mb-6">
            {formatos.map((f) => (
              <button
                key={f.key}
                onClick={() => setFormato(f.key)}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer border ${
                  formato === f.key
                    ? "bg-sky-500 text-white border-sky-500 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Upload area */}
          <div
            onClick={() => setShowSubirReceta(true)}
            className="border-2 border-dashed border-slate-300 rounded-xl py-4 px-6 flex items-center justify-center gap-3 mb-5 cursor-pointer hover:border-sky-400 hover:bg-sky-50/30 transition-all group"
          >
            <Upload
              size={20}
              className="text-sky-600 group-hover:scale-110 transition-transform"
            />
            <span className="text-sm font-bold text-sky-600">
              Subir receta personalizada
            </span>
          </div>

          {/* Guardar Ajustes */}
          <button className="w-full flex items-center justify-center gap-3 bg-slate-700 text-white py-4 rounded-xl font-bold text-base hover:bg-slate-800 transition-colors shadow-sm mb-4 cursor-pointer border-none">
            <Save size={20} />
            Guardar Ajustes
          </button>

          {/* Mostrar Ocultos */}
          <button className="w-full flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-5 cursor-pointer hover:bg-slate-100 transition-colors group">
            <div className="flex items-center gap-3">
              <Eye size={18} className="text-slate-500" />
              <span className="text-sm font-semibold text-slate-700">
                Mostrar Ocultos
              </span>
            </div>
            <ChevronRight
              size={18}
              className="text-slate-400 group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>

        {/* Footer */}
        <div className="px-7 py-5 flex justify-end border-t border-slate-100">
          <button
            onClick={onClose}
            className="bg-slate-700 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors cursor-pointer border-none uppercase tracking-wider"
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Sub-modal: Subir Receta */}
      <SubirRecetaModal
        isOpen={showSubirReceta}
        onClose={() => setShowSubirReceta(false)}
      />
    </div>
  );
};
