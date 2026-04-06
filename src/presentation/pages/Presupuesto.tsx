import { useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { CustomInput } from "../components/ui/CustomInput";
import { formatTextOnly } from "../utils/formatters";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  FileDown,
  Users,
  Settings,
  ChevronDown,
  PlusCircle,
  Trash2,
  Share2,
  ClipboardList,
} from "lucide-react";
import { useBudgetStore } from "../../infrastructure/store/useBudgetStore";

// Mock del catálogo de base de datos
const CATALOGO_SERVICIOS = [
  {
    id: 's-1',
    nombre: "Limpieza Dental Ultrasonido",
    descripcion: "Incluye profilaxis y pulido dental",
    monto: 1200.0,
  },
  {
    id: 's-2',
    nombre: "Resina 3M Filttek - Molar",
    descripcion: "Material fotocurable de alta resistencia",
    monto: 1800.0,
  },
  {
    id: 's-3',
    nombre: "Blanqueamiento Dental LED",
    descripcion: "Sesión de 45 minutos con peróxido de hidrógeno",
    monto: 3500.0,
  }
];

export const Presupuesto = () => {
  const store = useBudgetStore();
  const navigate = useNavigate();
  
  const labelClass =
    "block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider";
  const inputClass =
    "w-full border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white transition-all text-slate-700 font-medium text-base";

  // Formateadores controlados
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, "");
    let val = parseInt(rawVal || "0", 10);
    if (val > 100) val = 100;
    if (val < 0) val = 0;
    store.setDraftDiscount(val);
  };

  const handleValidityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, "");
    let val = parseInt(rawVal || "15", 10);
    if (val > 365) val = 365;
    store.setDraftValidityDays(val);
  };

  const handleAddService = (serviceId: string) => {
    if (!serviceId) return;
    const service = CATALOGO_SERVICIOS.find(s => s.id === serviceId);
    if (service) {
      store.addDraftItem({
        nombre: service.nombre,
        descripcion: service.descripcion,
        cantidad: 1,
        monto: service.monto
      });
    }
  };

  const [pdfGenerating, setPdfGenerating] = useState(false);

  const handleSaveBudget = async () => {
    try {
      await store.createBudget();
      alert('Presupuesto guardado con éxito y limpiado');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Error al guardar');
      }
    }
  };

  const subtotal = store.getSubtotal();
  const descuento = store.getDiscountAmount();
  const total = store.getTotal();

  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-10 pb-28">
        {/* Breadcrumbs */}
        <div className="text-sm font-semibold text-slate-500 mb-6 tracking-wider flex justify-between items-center">
          <span>
            Dashboard &gt; Presupuestos &gt;{" "}
            <span className="text-slate-900 border-b border-slate-900 pb-0.5">
              Nuevo Presupuesto
            </span>
          </span>
          <button
            onClick={() => navigate("/presupuesto/historial")}
            className="flex items-center gap-2 text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors border-none cursor-pointer"
          >
            <ClipboardList size={14} />
            Ver Historial
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center">
              <FileText size={28} className="text-sky-600" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 uppercase tracking-wide">
                Nuevo Presupuesto
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-0.5">
                Folio en borrador...
              </p>
            </div>
          </div>
          <button 
            disabled={pdfGenerating || store.isLoading}
            onClick={() => setPdfGenerating(true)}
            className="flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-sky-700 transition-colors shadow-sm border-none cursor-pointer disabled:opacity-50"
          >
            <FileDown size={18} />
            {pdfGenerating ? 'GENERANDO...' : 'GENERAR PDF'}
          </button>
        </div>

        {/* Paciente + Servicio Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 md:mb-10">
          <div>
            <label className={labelClass}>Paciente / Prospecto</label>
            <div className="relative">
              <Users
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <CustomInput
                type="text"
                placeholder="Buscar por nombre o ID..."
                className={`${inputClass} pl-11`}
                maxLength={50}
                value={store.draftPatientName}
                onInput={(e) => {
                  e.currentTarget.value = formatTextOnly(e.currentTarget.value);
                  store.setDraftPatientName(e.currentTarget.value);
                }}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Añadir Servicio del Catálogo</label>
            <div className="relative">
              <Settings
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <select
                className={`${inputClass} pl-11 pr-10 appearance-none cursor-pointer`}
                onChange={(e) => {
                  handleAddService(e.target.value);
                  e.target.value = ""; // Reset
                }}
              >
                <option value="">Selecciona un tratamiento para añadir...</option>
                {CATALOGO_SERVICIOS.map(s => (
                  <option key={s.id} value={s.id}>{s.nombre} - ${s.monto}</option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Desglose de Servicios */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider">
              Desglose de Servicios
            </h2>
            <button 
              onClick={() => store.addDraftItem({ nombre: 'Concepto Manual', descripcion: 'Descripción manual', cantidad: 1, monto: 500 })}
              className="flex items-center gap-2 text-sm font-bold text-sky-600 bg-transparent border-none cursor-pointer hover:text-sky-700 transition-colors"
            >
              <PlusCircle size={16} />
              Añadir Muestra Manual
            </button>
          </div>

          {/* Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider py-4 px-6">
                    Descripción del Servicio / Material
                  </th>
                  <th className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider py-4 px-4 w-20">
                    Cant.
                  </th>
                  <th className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider py-4 px-4 w-32">
                    Monto
                  </th>
                  <th className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider py-4 px-4 w-40">
                    Extras
                  </th>
                  <th className="w-12" />
                </tr>
              </thead>
              <tbody>
                {store.draftItems.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400 text-sm font-medium">
                      No hay servicios añadidos. Utilice el catálogo arriba.
                    </td>
                  </tr>
                )}
                {store.draftItems.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-slate-50 last:border-b-0 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-5 px-6">
                      <div className="font-bold text-slate-900 text-sm">
                        {s.nombre}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {s.descripcion}
                      </div>
                    </td>
                    <td className="text-center text-sm font-semibold text-slate-700 py-5 px-4">
                      {s.cantidad}
                    </td>
                    <td className="text-center text-sm font-bold text-slate-900 py-5 px-4">
                      ${s.monto.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="text-center py-5 px-4">
                      <button className="text-xs font-bold text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 bg-white hover:bg-slate-50 cursor-pointer transition-colors uppercase tracking-wider">
                        Añadir Extra
                      </button>
                    </td>
                    <td className="py-5 pr-4">
                      <button 
                        onClick={() => store.removeDraftItem(s.id)}
                        className="p-2 rounded-lg bg-transparent border-none cursor-pointer text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Section: Discount/Notes + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left: Discount & Notes */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div>
                <label className={labelClass}>Porcentaje de Descuento (%)</label>
                <div className="relative">
                  <input
                    type="text"
                    value={store.draftDiscountPercentage}
                    onChange={handleDiscountChange}
                    className={`${inputClass} pr-10`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                    %
                  </span>
                </div>
              </div>
              <div>
                <label className={labelClass}>Vigencia (Días)</label>
                <input
                  type="text"
                  value={store.draftValidityDays}
                  onChange={handleValidityChange}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Nota Extra / Observaciones</label>
              <textarea
                rows={3}
                placeholder="Ej: Válido solo pago en efectivo. Requiere cita previa..."
                className={`${inputClass} resize-none`}
                value={store.draftNotes}
                onChange={(e) => store.setDraftNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Right: Resumen Económico */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-7 text-white shadow-lg flex flex-col">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-5">
              Resumen Económico
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-300">
                Subtotal Bruto
              </span>
              <span className="text-sm font-bold">
                ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center mb-5">
              <span className="text-sm font-medium text-slate-300">
                Descuento Aplicado ({store.draftDiscountPercentage}%)
              </span>
              <span className="text-sm font-bold text-rose-400">
                -${descuento.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="border-t border-slate-700 pt-4 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Total Estimado
              </div>
              <div className="text-4xl font-extrabold">
                ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="flex gap-3 mt-auto">
              <button 
                onClick={handleSaveBudget}
                disabled={store.isLoading}
                className="flex-1 bg-white text-slate-800 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors cursor-pointer border-none shadow-sm uppercase tracking-wider disabled:opacity-50"
              >
                {store.isLoading ? 'Guardando...' : 'Guardar Borrador'}
              </button>
              <button className="w-12 h-12 rounded-xl bg-sky-500 flex items-center justify-center border-none cursor-pointer hover:bg-sky-600 transition-colors shadow-sm">
                <Share2 size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 p-4 md:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 gap-3">
        <div className="flex items-center gap-6 text-xs text-slate-400 font-medium">
          <span>© Creado: {new Date().toLocaleDateString()}</span>
          <span>© Firma Digital Habilitada</span>
        </div>
        <div className="flex gap-6">
          <button 
            onClick={() => store.resetDraft()}
            className="text-sm font-bold text-slate-600 uppercase tracking-wider bg-transparent border-none cursor-pointer hover:text-slate-800 transition-colors"
          >
            Siguiente / Limpiar
          </button>
          <button className="text-sm font-bold text-slate-900 uppercase tracking-wider bg-transparent border-none cursor-pointer hover:text-sky-600 transition-colors">
            Vista Previa
          </button>
        </div>
      </div>
    </Layout>
  );
};
