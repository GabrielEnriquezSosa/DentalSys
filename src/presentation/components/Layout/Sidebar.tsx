import {
  LayoutDashboard,
  Users,
  Calendar,
  Package,
  Settings,
  HelpCircle,
  LogOut,
  Banknote,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  onNavigate?: () => void;
}

export const Sidebar = ({ onNavigate }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const baseItemClass =
    "flex items-center gap-4 py-[11px] px-[15px] rounded-xl font-medium text-[16px] mb-2 transition-all duration-200 cursor-pointer border";

  const normalItemClass =
    "text-slate-500 hover:bg-slate-100 border-transparent";
  const activeItemClass =
    "bg-sky-100 text-sky-500 border-blue-800 hover:bg-sky-100";

  const handleNav = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
    onNavigate?.();
  };

  return (
    <aside className="w-[280px] h-full bg-white border-r border-slate-200 flex flex-col shrink-0">
      <div className="p-8 flex items-center gap-4 mb-2">
        <div className="w-10 h-10 rounded-full bg-sky-500 shrink-0"></div>
        <span className="text-[26px] font-bold text-sky-500 tracking-tight">
          Dental.sys
        </span>
      </div>

      <nav className="flex-1 px-4 overflow-y-auto">
        <a
          href="/"
          className={`${baseItemClass} ${location.pathname === "/" ? activeItemClass : normalItemClass}`}
          onClick={handleNav("/")}
        >
          <LayoutDashboard
            size={24}
            strokeWidth={1.5}
            className={
              location.pathname === "/" ? "text-sky-500" : "text-slate-500"
            }
          />
          <span>Dashboard</span>
        </a>
        <a
          href="/pagos"
          className={`${baseItemClass} ${location.pathname === "/pagos" ? activeItemClass : normalItemClass}`}
          onClick={handleNav("/pagos")}
        >
          <Banknote
            size={24}
            strokeWidth={1.5}
            className={
              location.pathname === "/pagos" ? "text-sky-500" : "text-slate-500"
            }
          />
          <span>Recibir Pago</span>
        </a>
        <a
          href="/pacientes"
          className={`${baseItemClass} ${location.pathname === "/pacientes" ? activeItemClass : normalItemClass}`}
          onClick={handleNav("/pacientes")}
        >
          <Users size={24} strokeWidth={1.5} className={location.pathname === "/pacientes" ? "text-sky-500" : "text-slate-500"} />
          <span>Pacientes</span>
        </a>
        <a
          href="/agenda"
          className={`${baseItemClass} ${location.pathname === "/agenda" ? activeItemClass : normalItemClass}`}
          onClick={handleNav("/agenda")}
        >
          <Calendar size={24} strokeWidth={1.5} className={location.pathname === "/agenda" ? "text-sky-500" : "text-slate-500"} />
          <span>Agenda</span>
        </a>
        <a
          href="/medicamentos"
          className={`${baseItemClass} ${location.pathname === "/medicamentos" ? activeItemClass : normalItemClass}`}
          onClick={handleNav("/medicamentos")}
        >
          <Package size={24} strokeWidth={1.5} className={location.pathname === "/medicamentos" ? "text-sky-500" : "text-slate-500"} />
          <span>Inventario</span>
        </a>

        <div className="mt-8">
          <div className="text-[13px] font-semibold text-slate-500 uppercase tracking-widest mb-4 pl-4">
            Sistema
          </div>
          <a
            href="/servicios"
            className={`${baseItemClass} ${location.pathname === "/servicios" ? activeItemClass : normalItemClass}`}
            onClick={handleNav("/servicios")}
          >
            <Settings size={24} strokeWidth={1.5} className={location.pathname === "/servicios" ? "text-sky-500" : "text-slate-500"} />
            <span>Configuración</span>
          </a>
          <a
            href="/soporte"
            className={`${baseItemClass} ${location.pathname === "/soporte" ? activeItemClass : normalItemClass}`}
            onClick={handleNav("/soporte")}
          >
            <HelpCircle
              size={24}
              strokeWidth={1.5}
              className={location.pathname === "/soporte" ? "text-sky-500" : "text-slate-500"}
            />
            <span>Soporte</span>
          </a>
        </div>
      </nav>

      <div className="p-5 border-t border-slate-200 flex items-center gap-3">
        <button className="w-full flex items-center justify-center gap-3 p-3 bg-slate-800 text-white rounded-lg font-semibold text-sm cursor-pointer transition-colors duration-200 hover:bg-slate-900">
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};
