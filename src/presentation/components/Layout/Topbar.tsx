import { Search, Bell } from "lucide-react";

export const Topbar = () => {
  return (
    <header className="h-[70px] bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="relative w-[400px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-[18px] h-[18px]" />
        <input
          type="text"
          placeholder="Buscar paciente o cita..."
          className="w-full py-2.5 pr-3 pl-10 rounded-lg border-none bg-slate-100 font-sans text-sm outline-none transition-colors duration-200 focus:bg-slate-200"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full border-none bg-slate-100 text-slate-900 flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-slate-200">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-200">
          <div className="flex flex-col items-end">
            <span className="font-semibold text-sm">Dr. Martínez</span>
            <span className="text-xs text-slate-500">Administrador</span>
          </div>
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};
