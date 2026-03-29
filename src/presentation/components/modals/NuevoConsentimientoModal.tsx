import { X } from "lucide-react";

interface NuevoConsentimientoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NuevoConsentimientoModal = ({
  isOpen,
  onClose,
}: NuevoConsentimientoModalProps) => {
  if (!isOpen) return null;

  const labelClass =
    "block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider";
  const inputClass =
    "w-full border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-slate-50 transition-all text-slate-700 font-medium text-base placeholder:text-slate-400";

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-[fadeIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-4">
          <h2 className="text-xl font-bold text-slate-900">
            Nuevo Consentimiento
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-transparent border-none cursor-pointer text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="px-7 pb-4 space-y-5">
          {/* Nombre del procedimiento */}
          <div>
            <label className={labelClass}>Nombre del Procedimiento</label>
            <input
              type="text"
              placeholder="Ej: Exodoncia Simple"
              className={inputClass}
            />
          </div>

          {/* Descripción del procedimiento */}
          <div>
            <label className={labelClass}>Descripción del Procedimiento</label>
            <textarea
              rows={3}
              placeholder="Explica en qué consiste el tratamiento..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Riesgos y Complicaciones */}
          <div>
            <label className={labelClass}>Riesgos y Complicaciones</label>
            <textarea
              rows={3}
              placeholder="Posibles riesgos (dolor, inflamación, infección, etc.)..."
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 py-5 flex justify-end gap-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-bold text-sm text-slate-600 bg-transparent border-none cursor-pointer hover:bg-slate-100 transition-colors"
          >
            Cancelar
          </button>
          <button className="bg-sky-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-sky-700 transition-colors cursor-pointer border-none shadow-sm">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
