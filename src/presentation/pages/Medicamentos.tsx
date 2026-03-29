import { Layout } from "../components/Layout/Layout";
import { 
  PlusCircle, 
  Save, 
  FileText, 
  Search, 
  Pencil, 
  Trash2 
} from "lucide-react";

const tableData = [
  {
    id: 1,
    nombre: "Amoxicilina 500mg",
    categoria: "Antibiótico",
    badgeColor: "bg-blue-100 text-blue-600",
    uso: "Infecciones bacterianas post-cirugía"
  },
  {
    id: 2,
    nombre: "Ibuprofeno 600mg",
    categoria: "Analgésico",
    badgeColor: "bg-orange-100 text-orange-600",
    uso: "Control de dolor e inflamación"
  },
  {
    id: 3,
    nombre: "Clorhexidina 0.12%",
    categoria: "Antiséptico",
    badgeColor: "bg-green-100 text-green-600",
    uso: "Enjuague bucal pre/post tratamiento"
  }
];

export const Medicamentos = () => {
  const inputClass = "w-full py-3.5 px-4 border border-transparent bg-slate-100 rounded-xl font-sans text-base text-slate-700 outline-none transition-all duration-200 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 placeholder:text-slate-400";
  const labelClass = "text-sm font-bold text-slate-700 mb-2";

  return (
    <Layout>
      <div className="p-10 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Catálogo de Medicamentos 💊</h1>
          <p className="text-base font-medium text-slate-500">
            Registra fármacos y sus usos para consultas rápidas.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 text-lg font-bold mb-8 text-slate-900">
            <PlusCircle color="#0ea5e9" size={24} />
            <span>Registro de Nuevo Medicamento</span>
          </div>

          <div className="flex gap-6 mb-6">
            <div className="flex-1 flex flex-col">
              <label className={labelClass}>Nombre del Medicamento</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Ej: Amoxicilina 500mg"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className={labelClass}>Categoría Terapéutica</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Ej: Antibiótico / Analgésico"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className={labelClass}>Uso Principal / Indicación</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Ej: Infecciones bacterianas"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button className="flex-1 flex justify-center items-center gap-2 bg-sky-500 text-white border-none py-4 px-6 rounded-xl font-bold text-base cursor-pointer transition-all duration-200 shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:bg-sky-600 hover:-translate-y-[1px] active:translate-y-0">
              <Save size={20} />
              REGISTRAR MEDICAMENTO
            </button>
            <button className="flex justify-center items-center gap-2 bg-slate-200 text-slate-700 border-none py-4 px-6 rounded-xl font-bold text-base cursor-pointer transition-colors duration-200 hover:bg-slate-300">
              <FileText size={20} />
              CARGA MASIVA (TXT)
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mt-10 mb-6">
          <h2 className="text-xl font-bold text-slate-900">Medicamentos Registrados</h2>
          <div className="relative flex items-center w-[360px]">
            <Search size={20} className="absolute left-4 text-slate-400" />
            <input 
              type="text" 
              className={`${inputClass} pl-12 bg-white border-slate-200`} 
              placeholder="Buscar medicamento..." 
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden mt-4 shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-5 px-8 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 bg-slate-50">MEDICAMENTO</th>
                <th className="text-left py-5 px-8 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 bg-slate-50">CATEGORÍA</th>
                <th className="text-left py-5 px-8 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 bg-slate-50">USO PRINCIPAL</th>
                <th className="text-left py-5 px-8 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 bg-slate-50">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 group transition-colors">
                  <td className="py-5 px-8 text-base text-slate-900 border-b border-slate-200 font-bold group-last:border-b-0">{item.nombre}</td>
                  <td className="py-5 px-8 border-b border-slate-200 group-last:border-b-0">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${item.badgeColor}`}>
                      {item.categoria}
                    </span>
                  </td>
                  <td className="py-5 px-8 text-base font-medium text-slate-500 border-b border-slate-200 group-last:border-b-0">{item.uso}</td>
                  <td className="py-5 px-8 border-b border-slate-200 group-last:border-b-0">
                    <div className="flex items-center gap-4">
                      <button className="bg-transparent border-none cursor-pointer flex items-center justify-center text-slate-400 transition-colors duration-200 hover:text-slate-600 hover:bg-slate-200 p-2 rounded-lg">
                        <Pencil size={20} />
                      </button>
                      <button className="bg-transparent border-none cursor-pointer flex items-center justify-center text-red-400 transition-colors duration-200 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};
