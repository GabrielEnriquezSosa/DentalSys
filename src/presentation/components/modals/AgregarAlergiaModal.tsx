import { useState } from "react";
import { X, Plus } from "lucide-react";

interface AgregarAlergiaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AgregarAlergiaModal = ({
  isOpen,
  onClose,
}: AgregarAlergiaModalProps) => {
  const [alergia, setAlergia] = useState("");

  if (!isOpen) return null;

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
        <div className="flex items-start justify-between p-7 pb-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Agregar Nueva Alergia
            </h2>
            <p className="text-sm text-slate-500 mt-2 font-medium leading-relaxed pr-6">
              Registre cualquier hipersensibilidad medicamentosa o ambiental del
              paciente.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 -mr-2 rounded-lg flex items-center justify-center bg-transparent border-none cursor-pointer text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-5">
          <label className="block text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">
            NOMBRE DE LA ALERGIA O COMPONENTE
          </label>
          <input
            type="text"
            value={alergia}
            onChange={(e) => setAlergia(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white transition-all text-gray-700 font-medium text-base mb-2"
            placeholder="Ej. Ácido Acetilsalicílico"
          />
          <p className="text-xs text-slate-400 font-medium italic">
            Ingrese el nombre genérico del fármaco o material.
          </p>
        </div>

        {/* Footer */}
        <div className="px-7 py-5 flex justify-end gap-3 rounded-b-2xl bg-white">
          <button
            onClick={onClose}
            className="bg-transparent text-slate-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors cursor-pointer border-none"
          >
            Cancelar
          </button>
          <button className="bg-[#008ACA] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#007AB3] transition-colors flex items-center gap-2 shadow-sm border-none cursor-pointer">
            <Plus size={16} /> Añadir Alergia
          </button>
        </div>
      </div>
    </div>
  );
};
