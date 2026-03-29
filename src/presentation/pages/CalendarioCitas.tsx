import { Layout } from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  ClipboardList,
  Plus,
} from "lucide-react";

export const CalendarioCitas = () => {
  // Mock data for the calendar based on the image provided
  // March 2026 starts on Sunday (assuming DOM at left based on image, "DOM LUN MAR MIE JUE VIE SAB")
  const daysInMonth = 31;
  const startingEmptyCells = 0; // Starts exactly on Sunday 1
  const renderingCells = 35; // 5 rows x 7 cols

  const generateCalendarDays = () => {
    const cells = [];

    // Fill empty starting cells (none in this specific month view as 1 is DOM, wait image implies 1 is DOM)
    for (let i = 0; i < startingEmptyCells; i++) {
      cells.push(
        <div
          key={`empty-start-${i}`}
          className="min-h-[120px] p-2 border-r border-b border-slate-100 bg-slate-50/30"
        ></div>,
      );
    }

    // Fill actual days
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(
        <div
          key={`day-${day}`}
          className="min-h-[120px] p-3 border-r border-b border-slate-100 hover:bg-slate-50 transition-colors relative group"
        >
          <span
            className={`text-sm font-bold ${day < 32 ? "text-slate-700" : "text-slate-300"}`}
          >
            {day}
          </span>

          {/* Example Events */}
          {day === 14 && (
            <div className="mt-2 bg-[#006085] text-white text-xs font-bold px-2.5 py-2 rounded-lg flex items-center gap-1.5 truncate shadow-sm">
              <CalendarIcon size={12} />
              14:40 Oscar
            </div>
          )}

          {day === 18 && (
            <div className="mt-2 bg-[#bde0fe] text-[#006085] text-xs font-bold px-2.5 py-2 rounded-lg flex items-center gap-1.5 truncate shadow-sm">
              <CalendarIcon size={12} />
              9:00 Cirugía
            </div>
          )}
        </div>,
      );
    }

    // Fill remaining cells for next month
    let nextMonthDay = 1;
    while (cells.length < renderingCells) {
      cells.push(
        <div
          key={`empty-end-${nextMonthDay}`}
          className="min-h-[140px] p-4 border-r border-b border-slate-100 bg-slate-50/50"
        >
          <span className="text-sm font-bold text-slate-300">
            {nextMonthDay}
          </span>
        </div>,
      );
      nextMonthDay++;
    }

    return cells;
  };

  return (
    <Layout>
      <div className="p-10 h-full flex flex-col gap-8 w-full">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
              Calendario de Citas
            </h1>
            <p className="text-base font-medium text-slate-500 mt-1">
              Manage clinical appointments and schedules
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
            {/* Left: Month Navigation */}
            <div className="flex items-center gap-8">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Marzo de 2026
              </h2>
              <div className="flex bg-slate-50 border border-slate-200 rounded-xl p-1 items-center">
                <button className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <button className="px-4 text-sm font-bold text-slate-700 hover:text-slate-900 uppercase">
                  Today
                </button>
                <button className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Right: View Toggles */}
            <div className="flex bg-slate-50 border border-slate-200 rounded-xl p-1">
              <button className="px-6 py-2 text-sm font-bold text-[#006085] bg-white rounded-lg shadow-sm border border-slate-100 uppercase">
                Month
              </button>
              <button className="px-6 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors uppercase">
                Week
              </button>
              <button className="px-6 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors uppercase">
                Day
              </button>
            </div>
          </div>

          {/* Calendar Grid Header */}
          <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/30">
            {["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"].map((day) => (
              <div
                key={day}
                className="py-4 text-center text-xs font-bold text-slate-500 tracking-widest border-r border-slate-100 last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid Body */}
          <div className="grid grid-cols-7 flex-1 border-l border-slate-100">
            {generateCalendarDays()}
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
                  Monthly Summary
                </p>
                <h3 className="text-3xl font-bold text-slate-800 -tracking-wide mt-1">
                  128 Citas
                </h3>
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 mb-3">
              <div
                className="bg-[#0ea5e9] h-3 rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
            <p className="text-sm font-medium text-slate-500">
              70% capacity reached for March
            </p>
          </div>

          {/* Metric 2: Pending Confirmation */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col justify-center">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                <ClipboardList size={32} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                  Pending Confirmation
                </p>
                <h3 className="text-3xl font-bold text-slate-800 -tracking-wide mt-1">
                  12 Patient
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-[-8px]">
              {/* Dummy stacked avatars */}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300 -mr-3 overflow-hidden flex items-center justify-center text-sm font-bold text-white relative z-30">
                <img
                  src="https://i.pravatar.cc/150?img=11"
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-400 -mr-3 overflow-hidden flex items-center justify-center text-sm font-bold text-white relative z-20">
                <img
                  src="https://i.pravatar.cc/150?img=32"
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-500 -mr-3 overflow-hidden flex items-center justify-center text-sm font-bold text-white relative z-10">
                <img
                  src="https://i.pravatar.cc/150?img=47"
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 relative z-0">
                +9
              </div>
            </div>
          </div>

          {/* Metric 3: Quick Appointment */}
          <div className="bg-[#007ba7] rounded-3xl shadow-sm p-8 flex flex-col justify-center relative overflow-hidden group">
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Quick Appointment
                </h3>
                <p className="text-sm font-medium text-sky-100 mb-8">
                  Schedule a new patient in less than 30 seconds.
                </p>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-white/20 hover:bg-white/30 text-white text-sm font-bold py-3.5 rounded-xl transition-colors border border-white/10 uppercase tracking-widest">
                  New Appointment
                </button>
                <button className="w-14 h-14 bg-[#005f82] hover:bg-[#004e6c] text-white flex items-center justify-center rounded-xl transition-colors">
                  <Plus size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
