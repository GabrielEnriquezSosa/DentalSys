import { Layout } from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Plus,
  LayoutGrid,
  FolderOpen,
  ClipboardList,
  CalendarCheck,
  Stethoscope,
  BadgeInfo,
  Pill,
  DoorOpen,
  FileCheck2,
  FileBadge,
  Headset,
  MoreHorizontal,
  TriangleAlert,
  ClipboardPaste,
  Banknote,
  Calculator,
} from "lucide-react";

const modulesData = [
  {
    icon: FolderOpen,
    title: "Expedientes",
    desc: "Historial clínico de pacientes",
    colorClass: "bg-blue-50",
    colorIcon: "#3c82f6",
  },
  {
    icon: ClipboardList,
    title: "Receta Médica",
    desc: "Generar nuevas prescripciones",
    colorClass: "bg-green-50",
    path: "/receta",
    colorIcon: "#22c55d",
  },
  {
    icon: CalendarCheck,
    title: "Agenda de citas",
    desc: "Gestión de tiempos y turnos",
    colorClass: "bg-orange-50",
    path: "/agenda",
    colorIcon: "#f97315",
  },
  {
    icon: Stethoscope,
    title: "Servicios",
    desc: "Catálogo de tratamientos",
    colorClass: "bg-purple-50",
    path: "/servicios",
    colorIcon: "#a855f7",
  },
  {
    icon: BadgeInfo,
    title: "Mis Datos",
    desc: "Perfil profesional y cédula",
    colorClass: "bg-cyan-50",
    path: "/perfiles",
    colorIcon: "#06b6d4",
  },
  {
    icon: Pill,
    title: "Medicamentos",
    desc: "Vademécum y stock base",
    colorClass: "bg-rose-50",
    path: "/medicamentos",
    colorIcon: "#f43f5f",
  },
  {
    icon: DoorOpen,
    title: "Mi Consultorio",
    desc: "Configuración del local",
    colorClass: "bg-amber-50",
    path: "/consultorio",
    colorIcon: "#f59e0c",
  },
  {
    icon: FileCheck2,
    title: "Consentimiento",
    desc: "Documentos legales firma",
    colorClass: "bg-stone-50",
    path: "/consentimiento",
    colorIcon: "#57534f",
  },
  {
    icon: FileBadge,
    title: "Certificado",
    desc: "Validaciones y licencias",
    colorClass: "bg-emerald-50",
    path: "/certificado",
    colorIcon: "#12b981",
  },
  {
    icon: Headset,
    title: "Soporte",
    desc: "Ayuda técnica directa",
    colorClass: "bg-indigo-50",
    path: "/soporte",
    colorIcon: "#6466f1",
  },
  {
    icon: Banknote,
    title: "Recibir Pago",
    desc: "Gestión de cobros y caja",
    colorClass: "bg-teal-50",
    path: "/pagos",
    colorIcon: "#14b8a6",
  },
  {
    icon: Calculator,
    title: "Presupuesto",
    desc: "Cotizaciones y estimados",
    colorClass: "bg-violet-50",
    path: "/presupuesto",
    colorIcon: "#8b5cf6",
  },
];

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-10 w-full">
        {/* Hero Section */}
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-white mb-6 md:mb-10 relative overflow-hidden shadow-md">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-sky-500/20 text-sky-400 py-2 px-4 rounded-full text-sm font-semibold mb-4">
              <span className="w-2 h-2 bg-sky-400 rounded-full" />
              ESTADO DEL DÍA
            </div>
            <h1 className="text-xl md:text-3xl font-bold mb-3">
              0 citas programadas para hoy
            </h1>
            <div className="flex items-center gap-2 text-slate-400 text-base">
              <CalendarDays size={20} />
              Martes, 17 de Septiembre, 2024
            </div>
          </div>
          <button className="bg-sky-500 text-white border-none py-3 px-5 md:py-3.5 md:px-6 rounded-lg font-bold text-sm md:text-base inline-flex items-center gap-2 cursor-pointer transition-all duration-200 shadow-[0_4px_12px_rgba(14,165,233,0.3)] z-10 hover:bg-sky-600 hover:-translate-y-[1px] active:translate-y-0 w-full md:w-auto justify-center">
            <Plus size={20} />
            Agendar Nueva Cita
          </button>
        </div>

        {/* Modules Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          <div className="flex items-center gap-3 text-xl md:text-2xl font-bold">
            <LayoutGrid color="#0ea5e9" size={24} />
            Gestión del Consultorio
          </div>
          <div className="text-slate-500 text-sm md:text-base font-medium">
            11 módulos activos
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 mb-6 md:mb-10">
          {modulesData.map((mod, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 md:p-6 flex flex-col border border-slate-200 transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-md hover:border-slate-300"
              onClick={() => mod.path && navigate(mod.path)}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${mod.colorClass}`}
              >
                <mod.icon size={28} color={mod.colorIcon} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">
                {mod.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {mod.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Summaries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          {/* RecordWeekly Summary */}
          <div className="bg-white rounded-2xl p-5 md:p-8 border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-lg">Resumen Semanal</span>
              <a
                href="#"
                className="text-sky-500 text-sm font-bold no-underline"
              >
                Ver reporte
              </a>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2 text-base">
                <span className="text-slate-500 font-medium">
                  Pacientes atendidos
                </span>
                <span className="font-bold text-slate-900">12</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-2 text-base">
                <span className="text-slate-500 font-medium">
                  Nuevos expedientes
                </span>
                <span className="font-bold text-slate-900">4</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Next Reminders */}
          <div className="bg-white rounded-2xl p-5 md:p-8 border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-lg">Próximos Recordatorios</span>
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#94a3b8",
                }}
              >
                <MoreHorizontal size={24} />
              </button>
            </div>

            <div className="flex justify-between items-center py-4 border-b border-slate-100 last:border-b-0">
              <div className="flex items-center gap-4">
                <TriangleAlert size={24} color="#f59e0b" />
                <span className="text-base font-medium text-slate-900">
                  Renovación de licencia médica
                </span>
              </div>
              <span className="text-sm text-slate-400 italic font-medium">
                2 días
              </span>
            </div>

            <div className="flex justify-between items-center py-4 border-b border-slate-100 last:border-b-0">
              <div className="flex items-center gap-4">
                <ClipboardPaste size={24} color="#3b82f6" />
                <span className="text-base font-medium text-slate-900">
                  Reabastecer guantes de nitrilo
                </span>
              </div>
              <span className="text-sm text-slate-400 italic font-medium">
                Mañana
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
