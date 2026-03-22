import {
  Smile,
  LayoutDashboard,
  Users,
  Calendar,
  Package,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Smile size={28} color="#0ea5e9" fill="#0ea5e9" />
        <span>Dental.sys</span>
      </div>

      <nav className="sidebar-nav">
        <a
          href="/"
          className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </a>
        <a href="#" className="nav-item">
          <Users size={20} />
          <span>Pacientes</span>
        </a>
        <a href="#" className="nav-item">
          <Calendar size={20} />
          <span>Agenda</span>
        </a>
        <a href="#" className="nav-item">
          <Package size={20} />
          <span>Inventario</span>
        </a>

        <div className="nav-section">
          <div className="nav-section-title">Sistema</div>
          <a href="#" className="nav-item">
            <Settings size={20} />
            <span>Configuración</span>
          </a>
          <a href="#" className="nav-item">
            <HelpCircle size={20} />
            <span>Soporte</span>
          </a>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-button">
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};
