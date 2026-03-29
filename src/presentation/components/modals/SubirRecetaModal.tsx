import {
  X,
  Upload,
  RefreshCw,
  Eye,
  CheckCircle2,
  RotateCcw,
  Info,
} from "lucide-react";

interface SubirRecetaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubirRecetaModal = ({ isOpen, onClose }: SubirRecetaModalProps) => {
  if (!isOpen) return null;

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal — wider for 2-column layout */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden animate-[fadeIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center">
              <Upload size={18} className="text-sky-600" />
            </div>
            Plantilla personalizada
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-transparent border-none cursor-pointer text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body — 2 columns */}
        <div className="flex divide-x divide-slate-100 overflow-y-auto max-h-[calc(90vh-82px)]">
          {/* Left Column — Vista Previa */}
          <div className="flex-[1.2] p-8">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Vista Previa
              </span>
              <span className="text-xs font-bold text-sky-600 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
                Interactivo
              </span>
            </div>

            {/* Preview Canvas */}
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 bg-white min-h-[480px] relative">
              {/* Folio & Date */}
              <div className="flex justify-between items-start mb-1">
                <div className="w-24 h-4 bg-slate-100 rounded" />
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800 tracking-wider">
                    FOLIO #0001
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                    [fecha_actual]
                  </div>
                </div>
              </div>

              {/* Decorative lines */}
              <div className="w-full h-px bg-slate-100 my-3" />
              <div className="w-3/4 h-3 bg-slate-50 rounded mb-2" />
              <div className="w-full h-px bg-slate-100 my-3" />

              {/* Patient fields row 1 */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Nombre del Paciente
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700">
                    [pac_nombre]
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Teléfono Contacto
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700">
                    [pac_telefono]
                  </div>
                </div>
              </div>

              {/* Patient fields row 2 */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Identificación
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700">
                    [pac_id]
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Edad
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700">
                    [pac_edad]
                  </div>
                </div>
              </div>

              {/* Diagnostico */}
              <div className="mb-4">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Diagnóstico Clínico
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700">
                  [pac_diagnostico]
                </div>
              </div>

              {/* Separator */}
              <div className="w-full h-px bg-slate-200 my-4" />

              {/* Rp. Section */}
              <div className="text-xl font-bold italic text-teal-600 mb-3">
                Rp.
              </div>
              <div className="space-y-2 mb-6">
                <div className="w-full h-2.5 bg-slate-100 rounded" />
                <div className="w-3/4 h-2.5 bg-slate-100 rounded" />
                <div className="w-2/3 h-2.5 bg-slate-100 rounded" />
              </div>

              {/* Footer fields */}
              <div className="flex justify-between items-end mt-auto pt-4">
                <div className="space-y-1">
                  <div className="text-[10px] text-slate-400 font-medium">
                    [clinica_direccion]
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    [clinica_web]
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-24 h-px bg-slate-300 mb-1" />
                  <div className="text-[10px] font-bold text-slate-600">
                    [firma_doctor]
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Controls */}
          <div className="flex-[0.8] p-8 bg-slate-50/50 flex flex-col">
            <h3 className="text-base font-bold text-slate-900 mb-5">
              Imagen de plantilla
            </h3>

            {/* Upload area */}
            <div className="border-2 border-dashed border-slate-300 rounded-xl py-8 px-6 flex flex-col items-center justify-center gap-2 mb-3 cursor-pointer hover:border-sky-400 hover:bg-sky-50/30 transition-all group">
              <Upload
                size={24}
                className="text-slate-400 group-hover:text-sky-600 transition-colors"
              />
              <span className="text-sm font-semibold text-slate-600 group-hover:text-sky-600 transition-colors">
                Subir fondo (.jpg, .png)
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Formatos permitidos: JPG, PNG. Máx 5MB.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <button className="w-full flex items-center justify-center gap-2.5 bg-white border border-slate-200 rounded-xl py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
                <RefreshCw size={16} />
                Actualizar campos
              </button>
              <button className="w-full flex items-center justify-center gap-2.5 bg-white border border-slate-200 rounded-xl py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
                <Eye size={16} />
                Prueba
              </button>
              <button className="w-full flex items-center justify-center gap-2.5 bg-sky-500 text-white border-none rounded-xl py-3.5 text-sm font-bold hover:bg-sky-600 transition-colors cursor-pointer shadow-sm">
                <CheckCircle2 size={16} />
                Aplicar
              </button>
              <button className="w-full flex items-center justify-center gap-2.5 bg-white border border-slate-200 rounded-xl py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
                <RotateCcw size={16} />
                Restaurar posiciones
              </button>
            </div>

            {/* Info Note */}
            <div className="mt-auto bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-start gap-3">
              <Info size={18} className="text-sky-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-sky-700 leading-relaxed">
                <span className="font-bold">Nota:</span> Los datos entre
                corchetes se sustituirán automáticamente. El lienzo está
                configurado para un formato{" "}
                <span className="font-bold">Media Carta (5.5 × 8.5 in)</span>{" "}
                con márgenes de seguridad de 0.5 in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
