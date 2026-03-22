import { Search, Bell } from "lucide-react";

export const Topbar = () => {
  return (
    <header className="topbar">
      <div className="search-container">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Buscar paciente o cita..."
          className="search-input"
        />
      </div>

      <div className="topbar-actions">
        <button className="icon-button">
          <Bell size={20} />
        </button>
        <div className="topbar-user">
          <div className="user-info">
            <span className="user-name">Dr. Martínez</span>
            <span className="user-role">Administrador</span>
          </div>
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Avatar"
            className="topbar-avatar"
          />
        </div>
      </div>
    </header>
  );
};
