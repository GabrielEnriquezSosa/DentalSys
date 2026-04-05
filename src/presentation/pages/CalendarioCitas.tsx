import { useEffect, useMemo, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import { useAppointmentStore } from "../../infrastructure/store/useAppointmentStore";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  ClipboardList,
  Plus,
} from "lucide-react";

const MONTHS_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export const CalendarioCitas = () => {
  const { appointments, fetchAppointments, isLoading } =
    useAppointmentStore();

  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const goToday = () => setCurrentDate(new Date());
  const goPrev = () =>
    setCurrentDate(new Date(year, month - 1, 1));
  const goNext = () =>
    setCurrentDate(new Date(year, month + 1, 1));

  // Build calendar grid
  const calendarCells = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: Array<{ day: number; isCurrentMonth: boolean; dateISO: string }> = [];

    // Previous month trailing days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      cells.push({
        day: d,
        isCurrentMonth: false,
        dateISO: `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({
        day: d,
        isCurrentMonth: true,
        dateISO: `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      });
    }

    // Next month leading days to fill the grid (up to 42 cells = 6 rows)
    const totalNeeded = cells.length <= 35 ? 35 : 42;
    let nextDay = 1;
    while (cells.length < totalNeeded) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      cells.push({
        day: nextDay,
        isCurrentMonth: false,
        dateISO: `${nextYear}-${String(nextMonth + 1).padStart(2, "0")}-${String(nextDay).padStart(2, "0")}`,
      });
      nextDay++;
    }

    return cells;
  }, [year, month]);

  // Index appointments by date for fast lookup
  const appointmentsByDate = useMemo(() => {
    const map: Record<string, typeof appointments> = {};
    for (const appt of appointments) {
      if (!map[appt.date]) map[appt.date] = [];
      map[appt.date].push(appt);
    }
    return map;
  }, [appointments]);

  const todayISO = new Date().toISOString().split("T")[0];

  // Stats
  const currentMonthAppts = appointments.filter((a) => {
    const d = new Date(a.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });
  const pendingCount = currentMonthAppts.filter(
    (a) => a.status === "pending",
  ).length;

  return (
    <Layout>
      <div className="p-10 h-full flex flex-col gap-8 w-full overflow-y-auto bg-slate-50">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
              <CalendarIcon size={32} className="text-sky-500" />
              Calendario de Citas
            </h1>
            <p className="text-base font-medium text-slate-500 mt-1">
              Gestiona las citas clínicas y los horarios
            </p>
          </div>
          <Link
            to="/agenda"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all bg-sky-50 text-[#006085] hover:bg-sky-100 text-base shadow-sm"
          >
            <ArrowLeft size={20} />
            Volver a Agenda
          </Link>
        </div>

        {/* Main Calendar Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          {/* Calendar Toolbar */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-8">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                {MONTHS_ES[month]} de {year}
              </h2>
              <div className="flex bg-slate-50 border border-slate-200 rounded-xl p-1 items-center">
                <button
                  onClick={goPrev}
                  className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition-colors cursor-pointer border-none bg-transparent"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={goToday}
                  className="px-4 text-sm font-bold text-slate-700 hover:text-slate-900 uppercase cursor-pointer border-none bg-transparent"
                >
                  Hoy
                </button>
                <button
                  onClick={goNext}
                  className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition-colors cursor-pointer border-none bg-transparent"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            {isLoading && (
              <span className="text-xs font-bold text-slate-400 animate-pulse">
                Cargando...
              </span>
            )}
          </div>

          {/* Calendar Grid Header */}
          <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/30">
            {["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"].map(
              (day) => (
                <div
                  key={day}
                  className="py-4 text-center text-xs font-bold text-slate-500 tracking-widest border-r border-slate-100 last:border-r-0"
                >
                  {day}
                </div>
              ),
            )}
          </div>

          {/* Calendar Grid Body */}
          <div className="grid grid-cols-7 flex-1 border-l border-slate-100">
            {calendarCells.map((cell, idx) => {
              const dayAppts = appointmentsByDate[cell.dateISO] || [];
              const isToday = cell.dateISO === todayISO && cell.isCurrentMonth;
              return (
                <div
                  key={idx}
                  className={`min-h-[120px] p-3 border-r border-b border-slate-100 hover:bg-slate-50 transition-colors relative group ${
                    !cell.isCurrentMonth ? "bg-slate-50/30" : ""
                  } ${isToday ? "bg-sky-50/40" : ""}`}
                >
                  <span
                    className={`text-sm font-bold ${
                      !cell.isCurrentMonth
                        ? "text-slate-300"
                        : isToday
                          ? "text-sky-600"
                          : "text-slate-700"
                    }`}
                  >
                    {cell.day}
                  </span>

                  {/* Appointment badges for this day */}
                  <div className="mt-1.5 flex flex-col gap-1">
                    {dayAppts.slice(0, 2).map((appt) => (
                      <div
                        key={appt.id}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 truncate shadow-sm ${
                          appt.status === "confirmed"
                            ? "bg-[#006085] text-white"
                            : "bg-[#bde0fe] text-[#006085]"
                        }`}
                      >
                        <CalendarIcon size={10} />
                        {appt.time} {appt.patientName.split(" ")[0]}
                      </div>
                    ))}
                    {dayAppts.length > 2 && (
                      <span className="text-[10px] font-bold text-slate-400 pl-1">
                        +{dayAppts.length - 2} más
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Metrics Section */}
        <div className="grid grid-cols-3 gap-8">
          {/* Metric 1: Monthly Summary */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col justify-center">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500">
                <CalendarIcon size={32} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                  Resumen Mensual
                </p>
                <h3 className="text-3xl font-bold text-slate-800 -tracking-wide mt-1">
                  {currentMonthAppts.length} Citas
                </h3>
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 mb-3">
              <div
                className="bg-[#0ea5e9] h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    (currentMonthAppts.length / 50) * 100,
                    100,
                  )}%`,
                }}
              ></div>
            </div>
            <p className="text-sm font-medium text-slate-500">
              {Math.min(
                Math.round((currentMonthAppts.length / 50) * 100),
                100,
              )}
              % de capacidad estimada en {MONTHS_ES[month].toLowerCase()}
            </p>
          </div>

          {/* Metric 2: Confirmación Pendiente */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col justify-center">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                <ClipboardList size={32} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                  Confirmación Pendiente
                </p>
                <h3 className="text-3xl font-bold text-slate-800 -tracking-wide mt-1">
                  {pendingCount} Pacientes
                </h3>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">
              {pendingCount > 0
                ? `${pendingCount} cita(s) pendiente(s) de confirmar este mes`
                : "Todas las citas del mes están confirmadas"}
            </p>
          </div>

          {/* Metric 3: Cita Rápida */}
          <div className="bg-[#007ba7] rounded-3xl shadow-sm p-8 flex flex-col justify-center relative overflow-hidden group">
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Cita Rápida
                </h3>
                <p className="text-sm font-medium text-sky-100 mb-8">
                  Agenda un nuevo paciente en menos de 30 segundos.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  to="/agenda"
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white text-sm font-bold py-3.5 rounded-xl transition-colors border border-white/10 uppercase tracking-widest text-center"
                >
                  Nueva Cita
                </Link>
                <Link
                  to="/agenda"
                  className="w-14 h-14 bg-[#005f82] hover:bg-[#004e6c] text-white flex items-center justify-center rounded-xl transition-colors"
                >
                  <Plus size={24} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
