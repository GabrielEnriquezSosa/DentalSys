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
} from "lucide-react";

const modulesData = [
  {
    icon: FolderOpen,
    title: "Expedientes",
    desc: "Historial clínico de pacientes",
    colorClass: "bg-blue-50",
  },
  {
    icon: ClipboardList,
    title: "Receta Médica",
    desc: "Generar nuevas prescripciones",
    colorClass: "bg-green-50",
    path: "/receta",
  },
  {
    icon: CalendarCheck,
    title: "Agenda de citas",
    desc: "Gestión de tiempos y turnos",
    colorClass: "bg-orange-50",
  },
  {
    icon: Stethoscope,
    title: "Servicios",
    desc: "Catálogo de tratamientos",
    colorClass: "bg-purple-50",
  },
  {
    icon: BadgeInfo,
    title: "Mis Datos",
    desc: "Perfil profesional y cédula",
    colorClass: "bg-cyan-50",
    path: "/perfiles",
  },
  {
    icon: Pill,
    title: "Medicamentos",
    desc: "Vademécum y stock base",
    colorClass: "bg-rose-50",
    path: "/medicamentos",
  },
  {
    icon: DoorOpen,
    title: "Mi Consultorio",
    desc: "Configuración del local",
    colorClass: "bg-amber-50",
  },
  {
    icon: FileCheck2,
    title: "Consentimiento",
    desc: "Documentos legales firma",
    colorClass: "bg-stone-50",
  },
  {
    icon: FileBadge,
    title: "Certificado",
    desc: "Validaciones y licencias",
    colorClass: "bg-emerald-50",
  },
  {
    icon: Headset,
    title: "Soporte",
    desc: "Ayuda técnica directa",
    colorClass: "bg-indigo-50",
  },
];

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="dashboard-container">
        {/* Hero Section */}
        <div className="hero-banner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot" />
              ESTADO DEL DÍA
            </div>
            <h1 className="hero-title">0 citas programadas para hoy</h1>
            <div className="hero-date">
              <CalendarDays size={18} />
              Martes, 17 de Septiembre, 2024
            </div>
          </div>
          <button className="btn-primary">
            <Plus size={18} />
            Agendar Nueva Cita
          </button>
        </div>

        {/* Modules Section */}
        <div className="modules-header">
          <div className="section-title">
            <LayoutGrid color="#0ea5e9" />
            Gestión del Consultorio
          </div>
          <div className="section-subtitle">10 módulos activos</div>
        </div>

        <div className="modules-grid">
          {modulesData.map((mod, i) => (
            <div
              key={i}
              className={`module-card`}
              onClick={() => mod.path && navigate(mod.path)}
            >
              <div className={`module-icon-wrapper ${mod.colorClass}`}>
                <mod.icon size={24} />
              </div>
              <h3 className="module-title">{mod.title}</h3>
              <p className="module-desc">{mod.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Summaries */}
        <div className="summary-section">
          {/* RecordWeekly Summary */}
          <div className="summary-card">
            <div className="summary-header">
              <span className="summary-title">Resumen Semanal</span>
              <a href="#" className="summary-link">
                Ver reporte
              </a>
            </div>

            <div className="progress-item">
              <div className="progress-info">
                <span className="progress-label">Pacientes atendidos</span>
                <span className="progress-value">12</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-info">
                <span className="progress-label">Nuevos expedientes</span>
                <span className="progress-value">4</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill green"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Next Reminders */}
          <div className="summary-card">
            <div className="summary-header">
              <span className="summary-title">Próximos Recordatorios</span>
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#94a3b8",
                }}
              >
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="reminder-item">
              <div className="reminder-content">
                <TriangleAlert size={20} color="#f59e0b" />
                <span className="reminder-text">
                  Renovación de licencia médica
                </span>
              </div>
              <span className="reminder-time">2 días</span>
            </div>

            <div className="reminder-item">
              <div className="reminder-content">
                <ClipboardPaste size={20} color="#3b82f6" />
                <span className="reminder-text">
                  Reabastecer guantes de nitrilo
                </span>
              </div>
              <span className="reminder-time">Mañana</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
