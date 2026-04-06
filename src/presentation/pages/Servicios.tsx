import { useEffect, useState, useMemo } from "react";
import { CustomInput } from "../components/ui/CustomInput";
import { CustomTextarea } from "../components/ui/CustomTextarea";
import { Layout } from "../components/Layout/Layout";
import { formatCurrencyInput, formatTextOnly } from "../utils/formatters";
import { useServiceStore } from "../../infrastructure/store/useServiceStore";
import {
  CreditCard,
  X,
  Save,
  Info,
  List,
  Search,
  TrendingUp,
  Clock,
  DollarSign,
} from "lucide-react";

export const Servicios = () => {
  const {
    services,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    fetchServices,
    createService,
    deleteService,
  } = useServiceStore();

  const [formData, setFormData] = useState({
    name: "",
    cost: "",
    description: "",
  });

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const resetForm = () => {
    setFormData({ name: "", cost: "", description: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createService(formData);
      resetForm();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Error desconocido al registrar el servicio.");
      }
    }
  };

  const handleDelete = async (id: string) => {
    await deleteService(id);
  };

  // Filtered services
  const filteredServices = useMemo(() => {
    if (!searchTerm.trim()) return services;
    const term = searchTerm.toLowerCase();
    return services.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term),
    );
  }, [services, searchTerm]);

  // Computed stats
  const avgCost = useMemo(() => {
    if (services.length === 0) return "0.00";
    const total = services.reduce((sum, s) => {
      const num = parseFloat(s.cost.replace(/,/g, "")) || 0;
      return sum + num;
    }, 0);
    return (total / services.length).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [services]);

  const lastUpdated = useMemo(() => {
    if (services.length === 0) return "Sin registros";
    const sorted = [...services].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
    const d = new Date(sorted[0].updatedAt);
    return d.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [services]);

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-slate-50 transition-all text-gray-700 font-medium text-base";
  const labelClass =
    "block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide";

  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-10 h-full flex flex-col w-full overflow-y-auto">
        {/* Header */}
        <div className="mb-6 md:mb-10">
          <div className="text-sm font-bold text-sky-600 mb-2 flex items-center gap-2">
            Configuración <span className="text-slate-300">›</span> Servicios y
            Precios
          </div>
          <h1 className="text-xl md:text-3xl font-bold text-[#006085] tracking-tight">
            Gestión de Servicios y Precios
          </h1>
          <p className="text-base font-medium text-slate-500 mt-2">
            Actualiza el catálogo de procedimientos y tarifas de tu clínica.
          </p>
        </div>

        {/* Content Split */}
        <div className="flex flex-col xl:flex-row gap-8 flex-1 items-start">
          {/* Left Column - Nuevo Servicio */}
          <div className="w-full xl:w-[420px] flex flex-col gap-6 shrink-0">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-5 md:p-8 flex flex-col gap-6 md:gap-8">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-3 tracking-tight">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <CreditCard size={20} />
                </div>
                Nuevo Servicio
              </h2>

              {error && (
                <div className="p-3 text-xs font-bold bg-red-50 text-red-600 rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                  <div>
                    <label className={labelClass}>NOMBRE DEL SERVICIO *</label>
                    <CustomInput
                      type="text"
                      className={inputClass}
                      placeholder="Ej: Limpieza Ultrasónica"
                      maxLength={50}
                      value={formData.name}
                      onInput={(e) => {
                        e.currentTarget.value = formatTextOnly(
                          e.currentTarget.value,
                        );
                        setFormData({
                          ...formData,
                          name: e.currentTarget.value,
                        });
                      }}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>MONTO DEL SERVICIO ($) *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-lg">
                        $
                      </span>
                      <CustomInput
                        type="text"
                        className={`${inputClass} pl-10`}
                        placeholder="0.00"
                        maxLength={10}
                        value={formData.cost}
                        onInput={(e) => {
                          e.currentTarget.value = formatCurrencyInput(
                            e.currentTarget.value,
                          );
                          setFormData({
                            ...formData,
                            cost: e.currentTarget.value,
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>DESCRIPCIÓN BREVE</label>
                    <CustomTextarea
                      className={`${inputClass} min-h-[120px] resize-none pb-8`}
                      placeholder="Detalles del procedimiento..."
                      maxLength={200}
                      value={formData.description}
                      onInput={(e) => {
                        setFormData({
                          ...formData,
                          description: (e.target as HTMLTextAreaElement).value,
                        });
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-8 flex items-center justify-center gap-2 bg-[#007ba7] text-white px-6 py-4 rounded-xl font-bold text-base hover:bg-[#006085] transition-colors shadow-sm disabled:opacity-50"
                >
                  <Save size={20} />
                  {isLoading ? "REGISTRANDO..." : "+ REGISTRAR EN CATÁLOGO"}
                </button>
              </form>
            </div>

            {/* Info Box */}
            <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#006085] font-bold text-base">
                <Info size={20} />
                Actualización Global
              </div>
              <p className="text-sm font-medium text-slate-500 leading-relaxed pl-7">
                Los cambios realizados en los precios se reflejarán
                instantáneamente en el módulo de facturación y agenda.
              </p>
            </div>
          </div>

          {/* Right Column - Panel and Stats */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Catálogo Vigente Panel */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col flex-1">
              {/* Header */}
              <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-3 tracking-tight">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center">
                    <List size={20} />
                  </div>
                  Catálogo Vigente
                </h2>
                <div className="flex items-center gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      className="pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 bg-slate-50 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 w-56 transition-all"
                      placeholder="Buscar servicio..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider flex items-center gap-2">
                    TOTAL:{" "}
                    <span className="text-[#006085] text-sm">
                      {services.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Table Header */}
              <div className="hidden md:grid grid-cols-[1fr_2fr_120px_80px] gap-6 px-4 md:px-8 py-5 border-b border-slate-100 bg-slate-50/50">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  SERVICIO
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  DESCRIPCIÓN
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                  COSTO
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                  ELIMINAR
                </div>
              </div>

              {/* Table Body */}
              <div className="flex flex-col flex-1">
                {isLoading && services.length === 0 ? (
                  <div className="flex justify-center p-12 text-slate-400 font-bold text-sm">
                    Cargando servicios...
                  </div>
                ) : filteredServices.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-16 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                      <CreditCard
                        size={36}
                        className="text-slate-300"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700 mb-2">
                      {searchTerm
                        ? "Sin resultados"
                        : "Catálogo vacío"}
                    </h3>
                    <p className="text-sm font-medium text-slate-400 max-w-xs">
                      {searchTerm
                        ? `No se encontraron servicios con "${searchTerm}".`
                        : "Utiliza el formulario lateral para registrar el primer servicio."}
                    </p>
                  </div>
                ) : (
                  filteredServices.map((srv) => (
                    <div
                      key={srv.id}
                      className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_2fr_120px_80px] gap-2 md:gap-6 px-4 md:px-8 py-4 md:py-6 border-b border-slate-50 items-center hover:bg-slate-50 transition-colors"
                    >
                      <div className="text-base font-bold text-slate-800 capitalize">
                        {srv.name}
                      </div>
                      <div className="hidden md:block text-sm font-medium text-slate-500 truncate">
                        {srv.description || "—"}
                      </div>
                      <div className="text-base font-bold text-[#007ba7] text-right">
                        $ {srv.cost}
                      </div>
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleDelete(srv.id)}
                          className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-xl bg-transparent border-none cursor-pointer"
                        >
                          <X size={20} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-4 md:p-6 border-t border-slate-100 flex justify-between items-center mt-auto">
                <div className="text-sm font-medium text-slate-500">
                  Mostrando {filteredServices.length} de {services.length}{" "}
                  registros
                </div>
              </div>
            </div>

            {/* Bottom Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-2">
              {/* Total Servicios */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-5 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500">
                    <TrendingUp size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                      TOTAL SERVICIOS
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                      {services.length}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Costo Promedio */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-5 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-500">
                    <DollarSign size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                      COSTO PROMEDIO
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                      $ {avgCost}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Última actualización */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-5 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                    <Clock size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                      ÚLTIMA ACTUALIZACIÓN
                    </p>
                    <h3 className="text-lg font-bold text-slate-800">
                      {lastUpdated}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
