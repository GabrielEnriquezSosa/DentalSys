import { useEffect, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { useBudgetStore } from "../../infrastructure/store/useBudgetStore";
import { useNavigate } from "react-router-dom";
import {
  Calculator,
  Plus,
  Search,
  Calendar,
  User,
  FileText,
  Tag,
  ArrowRight,
  Clock,
  TrendingDown,
} from "lucide-react";

export const HistorialPresupuestos = () => {
  const { budgets, fetchBudgets, isLoading } = useBudgetStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const filteredBudgets = budgets.filter((b) =>
    b.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.folio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalGeneral = budgets.reduce((acc, b) => acc + b.total, 0);

  const formatCurrency = (n: number) =>
    "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

  const formatDate = (d: Date | string) => {
    const date = typeof d === "string" ? new Date(d) : d;
    return date.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (budget: { validityDays: number; createdAt: Date | string }) => {
    const created = typeof budget.createdAt === "string" ? new Date(budget.createdAt) : budget.createdAt;
    const expiresAt = new Date(created.getTime() + budget.validityDays * 86400000);
    const now = new Date();
    if (now > expiresAt) return { bg: "bg-red-50", text: "text-red-600", label: "Vencido" };
    const daysLeft = Math.ceil((expiresAt.getTime() - now.getTime()) / 86400000);
    if (daysLeft <= 7) return { bg: "bg-amber-50", text: "text-amber-600", label: `${daysLeft}d restantes` };
    return { bg: "bg-emerald-50", text: "text-emerald-600", label: "Vigente" };
  };

  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-10 w-full flex flex-col h-full overflow-y-auto bg-slate-50">
        {/* Header */}
        <div className="mb-8">
          <div className="text-sm font-semibold text-slate-400 mb-3 tracking-wider">
            Dashboard &gt;{" "}
            <span
              className="text-sky-500 cursor-pointer hover:underline"
              onClick={() => navigate("/presupuesto")}
            >
              Presupuestos
            </span>{" "}
            &gt;{" "}
            <span className="text-slate-900 border-b border-slate-900 pb-0.5">
              Historial
            </span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
                <Calculator size={32} className="text-violet-500" />
                Historial de Presupuestos
              </h1>
              <p className="text-base font-medium text-slate-500 tracking-wide">
                Consulta, filtra y gestiona todos los presupuestos generados.
              </p>
            </div>
            <button
              onClick={() => navigate("/presupuesto")}
              className="flex items-center gap-2 bg-sky-500 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-sky-600 transition-colors shadow-sm border-none cursor-pointer"
            >
              <Plus size={18} />
              Nuevo Presupuesto
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                <FileText size={20} className="text-violet-500" />
              </div>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Total Presupuestos
              </span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900">
              {budgets.length}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <TrendingDown size={20} className="text-emerald-500" />
              </div>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Monto Total Cotizado
              </span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900">
              {formatCurrency(totalGeneral)}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                <Tag size={20} className="text-sky-500" />
              </div>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Descuento Promedio
              </span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900">
              {budgets.length > 0
                ? (budgets.reduce((a, b) => a + b.discountPercentage, 0) / budgets.length).toFixed(1)
                : "0"}
              %
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative w-full max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Buscar por paciente o folio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 px-4 pl-11 border border-slate-200 bg-white rounded-xl font-sans text-sm text-slate-700 outline-none transition-all duration-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 md:px-8 py-5 border-b border-slate-100 gap-3">
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider">
              Listado General
            </h2>
            <span className="bg-violet-50 text-violet-600 px-3 py-1 rounded-full text-xs font-bold">
              Mostrando: {filteredBudgets.length}
            </span>
          </div>

          {isLoading && budgets.length === 0 ? (
            <div className="flex justify-center p-16 text-slate-400 font-bold">
              Cargando presupuestos...
            </div>
          ) : filteredBudgets.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl m-6">
              <Calculator size={48} className="mb-4 opacity-50 text-slate-300" />
              <p className="font-bold text-slate-500">
                {searchTerm
                  ? "No se encontraron presupuestos con ese criterio."
                  : "Aún no hay presupuestos creados."}
              </p>
              <p className="text-sm mt-1">
                {searchTerm
                  ? "Intenta con otro término de búsqueda."
                  : "Crea el primero desde la pantalla de Nuevo Presupuesto."}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => navigate("/presupuesto")}
                  className="mt-5 flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-sky-600 transition-colors border-none cursor-pointer"
                >
                  <Plus size={16} />
                  Crear Presupuesto
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {filteredBudgets.map((budget) => {
                const status = getStatusColor(budget);
                return (
                  <div
                    key={budget.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between px-4 md:px-8 py-5 hover:bg-slate-50/70 transition-colors cursor-pointer group gap-4"
                  >
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center shrink-0 group-hover:bg-violet-100 transition-colors">
                        <FileText size={22} className="text-violet-500" />
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors truncate">
                            {budget.patientName || "Sin nombre"}
                          </h3>
                          <span className={`${status.bg} ${status.text} text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0`}>
                            {status.label}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-400 font-medium">
                          <span className="flex items-center gap-1.5">
                            <Tag size={12} />
                            {budget.folio}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            {formatDate(budget.createdAt)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <User size={12} />
                            {budget.items.length} servicio{budget.items.length !== 1 ? "s" : ""}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={12} />
                            {budget.validityDays}d vigencia
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Amounts */}
                    <div className="flex items-center gap-6 shrink-0">
                      {budget.discountPercentage > 0 && (
                        <div className="text-right">
                          <div className="text-xs text-slate-400 font-medium">Desc.</div>
                          <div className="text-sm font-bold text-rose-500">
                            -{budget.discountPercentage}%
                          </div>
                        </div>
                      )}
                      <div className="text-right">
                        <div className="text-xs text-slate-400 font-medium">Total</div>
                        <div className="text-lg font-extrabold text-slate-900">
                          {formatCurrency(budget.total)}
                        </div>
                      </div>
                      <ArrowRight
                        size={18}
                        className="text-slate-300 group-hover:text-sky-500 transition-colors"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
