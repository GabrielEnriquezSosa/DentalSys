import { useEffect, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { CustomInput } from "../components/ui/CustomInput";
import { useMedicationStore } from "../../infrastructure/store/useMedicationStore";
import {
  PlusCircle,
  Save,
  Search,
  Trash2,
  Pill,
  Tag,
  Stethoscope,
  Calendar,
} from "lucide-react";

// Badge color map by category keyword
const CATEGORY_COLORS: Record<string, string> = {
  antibiótico: "bg-blue-100 text-blue-600",
  analgésico: "bg-orange-100 text-orange-600",
  antiséptico: "bg-green-100 text-green-600",
  antiinflamatorio: "bg-amber-100 text-amber-600",
  anestésico: "bg-purple-100 text-purple-600",
  antifúngico: "bg-rose-100 text-rose-600",
  vitamina: "bg-emerald-100 text-emerald-600",
};

const getBadgeColor = (category: string): string => {
  const lower = category.toLowerCase();
  for (const key of Object.keys(CATEGORY_COLORS)) {
    if (lower.includes(key)) return CATEGORY_COLORS[key];
  }
  return "bg-slate-100 text-slate-600";
};

export const Medicamentos = () => {
  const {
    medications,
    fetchMedications,
    createMedication,
    deleteMedication,
    isLoading,
    error,
  } = useMedicationStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    usage: "",
  });

  useEffect(() => {
    fetchMedications();
  }, [fetchMedications]);

  const resetForm = () => {
    setFormData({ name: "", category: "", usage: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMedication(formData);
      resetForm();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Error desconocido al registrar el medicamento.");
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Está seguro de eliminar este medicamento?")) {
      await deleteMedication(id);
    }
  };

  const filteredMedications = medications.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const inputClass =
    "w-full py-3.5 px-4 border border-transparent bg-slate-100 rounded-xl font-sans text-base text-slate-700 outline-none transition-all duration-200 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 placeholder:text-slate-400";
  const labelClass = "text-sm font-bold text-slate-700 mb-2";

  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-10 w-full flex flex-col h-full overflow-y-auto bg-slate-50">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl md:text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
            <Pill size={32} className="text-rose-500" />
            Catálogo de Medicamentos
          </h1>
          <p className="text-base font-medium text-slate-500 tracking-wide">
            Registra fármacos y sus usos para consultas rápidas en recetas.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-5 md:p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex items-center gap-3 text-lg font-bold mb-6 text-slate-900 uppercase tracking-wider">
            <PlusCircle color="#0ea5e9" size={22} />
            <span>Registro de Nuevo Medicamento</span>
          </div>

          {error && (
            <div className="p-3 mb-4 text-xs font-bold bg-red-50 text-red-600 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
              <div className="flex-1 flex flex-col">
                <label className={labelClass}>
                  Nombre del Medicamento *
                </label>
                <div className="relative">
                  <Pill
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <CustomInput
                    type="text"
                    className={`${inputClass} pl-11`}
                    placeholder="Ej: Amoxicilina 500mg"
                    maxLength={50}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <label className={labelClass}>
                  Categoría Terapéutica *
                </label>
                <div className="relative">
                  <Tag
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <CustomInput
                    type="text"
                    className={`${inputClass} pl-11`}
                    placeholder="Ej: Antibiótico / Analgésico"
                    maxLength={50}
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <label className={labelClass}>
                  Uso Principal / Indicación *
                </label>
                <div className="relative">
                  <Stethoscope
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <CustomInput
                    type="text"
                    className={`${inputClass} pl-11`}
                    placeholder="Ej: Infecciones bacterianas"
                    maxLength={50}
                    value={formData.usage}
                    onChange={(e) =>
                      setFormData({ ...formData, usage: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 bg-sky-500 text-white border-none py-4 px-6 rounded-xl font-bold text-base cursor-pointer transition-all duration-200 shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:bg-sky-600 hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-50"
            >
              <Save size={20} />
              {isLoading ? "REGISTRANDO..." : "REGISTRAR MEDICAMENTO"}
            </button>
          </form>
        </div>

        {/* Table Header + Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            Medicamentos Registrados
            <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-bold ml-2">
              {medications.length}
            </span>
          </h2>
          <div className="relative flex items-center w-full sm:w-[360px]">
            <Search
              size={18}
              className="absolute left-4 text-slate-400"
            />
            <input
              type="text"
              className={`${inputClass} pl-11 bg-white border-slate-200`}
              placeholder="Buscar por nombre o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-x-auto shadow-sm">
          {isLoading && medications.length === 0 ? (
            <div className="flex justify-center p-16 text-slate-400 font-bold">
              Cargando medicamentos...
            </div>
          ) : filteredMedications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 text-slate-400">
              <Pill size={48} className="mb-4 opacity-50 text-slate-300" />
              <p className="font-bold text-slate-500">
                {searchTerm
                  ? "No se encontraron medicamentos con ese criterio."
                  : "Aún no hay medicamentos registrados."}
              </p>
              <p className="text-sm mt-1">
                {searchTerm
                  ? "Intenta con otro término de búsqueda."
                  : "Registra el primero usando el formulario de arriba."}
              </p>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-5 px-8 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 bg-slate-50">
                    Medicamento
                  </th>
                  <th className="text-left py-5 px-8 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 bg-slate-50">
                    Categoría
                  </th>
                  <th className="text-left py-5 px-8 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 bg-slate-50">
                    Uso Principal
                  </th>
                  <th className="text-left py-5 px-8 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 bg-slate-50">
                    Registrado
                  </th>
                  <th className="text-left py-5 px-8 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 bg-slate-50 w-20">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMedications.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 group transition-colors"
                  >
                    <td className="py-5 px-8 text-base text-slate-900 border-b border-slate-100 font-bold group-last:border-b-0">
                      {item.name}
                    </td>
                    <td className="py-5 px-8 border-b border-slate-100 group-last:border-b-0">
                      <span
                        className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${getBadgeColor(item.category)}`}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="py-5 px-8 text-base font-medium text-slate-500 border-b border-slate-100 group-last:border-b-0">
                      {item.usage}
                    </td>
                    <td className="py-5 px-8 border-b border-slate-100 group-last:border-b-0">
                      <div className="flex items-center gap-1.5 text-sm text-slate-400 font-medium">
                        <Calendar size={14} />
                        {new Date(item.createdAt).toLocaleDateString("es-MX", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="py-5 px-8 border-b border-slate-100 group-last:border-b-0">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-transparent border-none cursor-pointer flex items-center justify-center text-slate-300 transition-colors duration-200 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};
