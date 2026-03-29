import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Bell,
  Filter,
  ClipboardList,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type TabType = "recientes" | "pendientes" | "archivadas";

export const HistorialRecetas = () => {
  const [activeTab, setActiveTab] = useState<TabType>("recientes");

  const tabs: { key: TabType; label: string }[] = [
    { key: "recientes", label: "Recientes" },
    { key: "pendientes", label: "Pendientes" },
    { key: "archivadas", label: "Archivadas" },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900">
      {/* Custom Top Bar */}
      <header className="h-[70px] bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
        <div className="flex items-center gap-8">
          <Link
            to="/receta"
            className="flex items-center gap-2 text-slate-600 font-semibold text-sm hover:text-sky-600 transition-colors no-underline"
          >
            <ArrowLeft size={18} />
            Regresar
          </Link>

          <h1 className="text-lg font-bold text-slate-900">
            Historial de Recetas
          </h1>

          {/* Tabs */}
          <nav className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all border-none cursor-pointer ${
                  activeTab === tab.key
                    ? "text-sky-600 bg-sky-50 border-b-2 border-sky-600"
                    : "text-slate-500 bg-transparent hover:text-slate-700 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar paciente..."
              className="w-full py-2.5 pr-3 pl-9 rounded-lg border border-slate-200 bg-white text-sm outline-none transition-colors focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium"
            />
          </div>
          <button className="w-10 h-10 rounded-full border-none bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-sky-500 rounded-full border-2 border-white" />
          </button>
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-200">
            <span className="text-sm font-semibold text-slate-800">
              Dr. Rivera
            </span>
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-10">
        {/* Filter Section */}
        <div className="flex items-end gap-8 mb-10">
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              Búsqueda de Registros
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Gestiona y consulta las recetas emitidas a tus pacientes.
            </p>
          </div>

          <div className="flex-1 flex items-end gap-4 justify-end">
            {/* Paciente o Folio */}
            <div className="flex-1 max-w-[280px]">
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                Paciente o Folio
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Escribe para buscar..."
                  className="w-full py-3 pr-4 pl-10 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium text-slate-700"
                />
              </div>
            </div>

            {/* Desde */}
            <div className="w-[170px]">
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                Desde
              </label>
              <input
                type="date"
                className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium text-slate-700"
              />
            </div>

            {/* Hasta */}
            <div className="w-[170px]">
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                Hasta
              </label>
              <input
                type="date"
                className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium text-slate-700"
              />
            </div>

            {/* Filtrar Button */}
            <button className="flex items-center gap-2 bg-sky-500 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-sky-600 transition-colors shadow-sm whitespace-nowrap">
              <Filter size={16} />
              Filtrar
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-6 bg-slate-50 border-b border-slate-200 px-8 py-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Fecha
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Hora
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Folio
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Paciente
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Médico
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
              Acciones
            </span>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-24 px-8">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
              <ClipboardList size={36} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              No hay recetas
            </h3>
            <p className="text-sm text-slate-500 text-center max-w-sm mb-6 leading-relaxed">
              No se encontraron registros que coincidan con los criterios de
              búsqueda seleccionados.
            </p>
            <button className="flex items-center gap-2 text-sky-600 font-bold text-sm hover:text-sky-700 transition-colors bg-transparent border-none cursor-pointer">
              <RefreshCw size={16} />
              Limpiar filtros
            </button>
          </div>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between px-8 py-4 bg-slate-50 border-t border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Mostrando 0 - 0 de 0 resultados
            </span>
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-1 text-sm font-semibold text-slate-400 cursor-not-allowed bg-transparent border-none"
                disabled
              >
                <ChevronLeft size={16} />
                Anterior
              </button>
              <button
                className="flex items-center gap-1 text-sm font-semibold text-slate-400 cursor-not-allowed bg-transparent border-none"
                disabled
              >
                Siguiente
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
