import { Search, Bell, Menu } from "lucide-react";

interface TopbarProps {
  onToggleSidebar?: () => void;
}

export const Topbar = ({ onToggleSidebar }: TopbarProps) => {
  return (
    <header className="h-[60px] md:h-[70px] bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* Hamburger — visible only <1024px */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors border-none cursor-pointer"
        >
          <Menu size={22} />
        </button>

        {/* Search — hidden on mobile, visible ≥768px */}
        <div className="relative hidden md:block w-[280px] lg:w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-[18px] h-[18px]" />
          <input
            type="text"
            placeholder="Buscar paciente o cita..."
            className="w-full py-2.5 pr-3 pl-10 rounded-lg border-none bg-slate-100 font-sans text-sm outline-none transition-colors duration-200 focus:bg-slate-200"
          />
        </div>

        {/* Mobile logo — visible only <1024px when no search */}
        <span className="md:hidden text-lg font-bold text-sky-500">Dental.sys</span>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="w-9 h-9 md:w-10 md:h-10 rounded-full border-none bg-slate-100 text-slate-900 flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-slate-200">
          <Bell size={18} />
        </button>
        <div className="flex items-center gap-2 md:gap-3 ml-2 md:ml-4 pl-2 md:pl-4 border-l border-slate-200">
          <div className="hidden sm:flex flex-col items-end">
            <span className="font-semibold text-sm">Dr. Martínez</span>
            <span className="text-xs text-slate-500">Administrador</span>
          </div>
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Avatar"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};
