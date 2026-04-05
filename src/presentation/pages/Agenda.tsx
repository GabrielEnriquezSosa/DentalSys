import { useEffect, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { CustomInput } from "../components/ui/CustomInput";
import { formatTextOnly, formatNumber } from "../utils/formatters";
import { Link } from "react-router-dom";
import { CustomTimePicker } from "../components/ui/CustomTimePicker";
import { CustomDatePicker } from "../components/ui/CustomDatePicker";
import { useAppointmentStore } from "../../infrastructure/store/useAppointmentStore";
import type { AppointmentStatus } from "../../domain/models/Appointment";
import {
  PlusCircle,
  Calendar as CalendarIcon,
  Lightbulb,
  CalendarDays,
  Clock,
  User,
  Trash2,
  Phone,
} from "lucide-react";

const STATUS_BADGES: Record<AppointmentStatus, { bg: string; text: string; label: string }> = {
  confirmed: { bg: "bg-sky-100", text: "text-sky-600", label: "Confirmado" },
  pending: { bg: "bg-orange-100", text: "text-orange-600", label: "Pendiente" },
  cancelled: { bg: "bg-red-100", text: "text-red-600", label: "Cancelado" },
  completed: { bg: "bg-green-100", text: "text-green-600", label: "Completado" },
};

const getTodayISO = (): string => new Date().toISOString().split("T")[0];

// Convert dd/mm/yyyy → YYYY-MM-DD
const dmyToISO = (dmy: string): string => {
  if (!dmy) return '';
  const parts = dmy.split('/');
  if (parts.length !== 3) return dmy; // already ISO or invalid
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};

// Convert YYYY-MM-DD → dd/mm/yyyy
const isoToDMY = (iso: string): string => {
  if (!iso) return '';
  const parts = iso.split('-');
  if (parts.length !== 3) return iso; // already DMY or invalid
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

export const Agenda = () => {
  const {
    appointments,
    selectedDate,
    fetchAppointmentsByDate,
    createAppointment,
    deleteAppointment,
    isLoading,
    error,
  } = useAppointmentStore();

  const [formData, setFormData] = useState({
    patientName: "",
    whatsapp: "",
    date: getTodayISO(),
    time: "",
    duration: "30 min",
    treatment: "Limpieza",
  });

  useEffect(() => {
    fetchAppointmentsByDate(selectedDate);
  }, [selectedDate, fetchAppointmentsByDate]);

  const resetForm = () => {
    setFormData({
      patientName: "",
      whatsapp: "",
      date: selectedDate,
      time: "",
      duration: "30 min",
      treatment: "Limpieza",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAppointment({
        ...formData,
        status: "pending" as AppointmentStatus,
      });
      // Re-fetch for the appointment's date so it shows immediately
      await fetchAppointmentsByDate(formData.date);
      resetForm();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Error desconocido al agendar la cita.");
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Está seguro de eliminar esta cita?")) {
      await deleteAppointment(id);
      fetchAppointmentsByDate(selectedDate);
    }
  };

  const handleDateFilter = (val: string) => {
    const isoDate = dmyToISO(val);
    setFormData({ ...formData, date: isoDate });
    fetchAppointmentsByDate(isoDate);
  };

  const pendingCount = appointments.filter((a) => a.status === "pending").length;

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-slate-50 transition-all text-gray-700 font-medium text-base";
  const labelClass =
    "block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide";

  return (
    <Layout>
      <div className="p-4 md:p-10 h-full flex flex-col w-full max-w-full overflow-x-hidden overflow-y-auto bg-slate-50">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:justify-between items-start xl:items-end gap-6 mb-10 w-full">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 uppercase tracking-tight flex items-center gap-3">
              <CalendarDays size={32} className="text-sky-500" />
              AGENDA
            </h1>
            <p className="text-base font-medium text-slate-500 mt-1">
              Registro y control de citas
            </p>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap gap-4 items-end w-full xl:w-auto">
            <Link
              to="/agenda/calendario"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all bg-sky-50 text-sky-600 hover:bg-sky-100 text-base shadow-sm"
            >
              <CalendarDays size={20} />
              MOSTRAR CALENDARIO
            </Link>
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                Filtrar por fecha
              </label>
              <CustomDatePicker
                className="w-44 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500 bg-white transition-all text-slate-700 font-bold text-base shadow-sm cursor-pointer"
                value={isoToDMY(selectedDate)}
                onChange={(val: string) => handleDateFilter(val)}
                align="right"
              />
            </div>
          </div>
        </div>

        {/* Content Split */}
        <div className="flex flex-col xl:flex-row gap-8 flex-1 items-start w-full">
          {/* Left Column - Nueva Cita */}
          <div className="w-full xl:w-[420px] flex flex-col gap-6 shrink-0">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 tracking-tight">
                <PlusCircle size={24} className="text-sky-500" />
                NUEVA CITA
              </h2>

              {error && (
                <div className="p-3 mb-4 text-xs font-bold bg-red-50 text-red-600 rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className={labelClass}>
                    NOMBRE COMPLETO DEL PACIENTE *
                  </label>
                  <CustomInput
                    type="text"
                    className={inputClass}
                    placeholder="Ej. Juan Pérez"
                    maxLength={50}
                    value={formData.patientName}
                    onInput={(e) => {
                      e.currentTarget.value = formatTextOnly(
                        e.currentTarget.value,
                      );
                      setFormData({
                        ...formData,
                        patientName: e.currentTarget.value,
                      });
                    }}
                  />
                </div>

                <div className="mb-6">
                  <label className={labelClass}>WHATSAPP *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-base">
                      +52 ...
                    </span>
                    <CustomInput
                      type="tel"
                      className={`${inputClass} pl-16`}
                      maxLength={10}
                      value={formData.whatsapp}
                      onInput={(e) => {
                        e.currentTarget.value = formatNumber(
                          e.currentTarget.value,
                        );
                        setFormData({
                          ...formData,
                          whatsapp: e.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <label className={labelClass}>FECHA *</label>
                    <CustomDatePicker
                      className={inputClass}
                      value={isoToDMY(formData.date)}
                      onChange={(val: string) =>
                        setFormData({ ...formData, date: dmyToISO(val) })
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <label className={labelClass}>HORA *</label>
                    <CustomTimePicker
                      className={inputClass}
                      placeholder="--:--"
                      value={formData.time}
                      onChange={(val: string) =>
                        setFormData({ ...formData, time: val })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <label className={labelClass}>DURACIÓN</label>
                    <select
                      className={inputClass}
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                    >
                      <option>15 min</option>
                      <option>30 min</option>
                      <option>45 min</option>
                      <option>60 min</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className={labelClass}>TRATAMIENTO *</label>
                    <select
                      className={inputClass}
                      value={formData.treatment}
                      onChange={(e) =>
                        setFormData({ ...formData, treatment: e.target.value })
                      }
                    >
                      <option>Consulta M.</option>
                      <option>Limpieza</option>
                      <option>Extracción</option>
                      <option>Ortodoncia</option>
                      <option>Endodoncia</option>
                      <option>Prótesis</option>
                      <option>Cirugía</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-[#0ea5e9] text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-sky-600 transition-colors shadow-sm disabled:opacity-50"
                >
                  <PlusCircle size={20} />
                  {isLoading ? "AGENDANDO..." : "AGENDAR CITA"}
                </button>
              </form>
            </div>

            {/* Info Box */}
            <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100 flex gap-4 items-start">
              <Lightbulb size={28} className="text-sky-500 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-sky-800 leading-relaxed">
                Los pacientes recibirán un recordatorio automático por WhatsApp
                2 horas antes de su cita.
              </p>
            </div>
          </div>

          {/* Right Column - Panel Consultas */}
          <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col relative min-h-[700px]">
            {/* Panel Header */}
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-800 tracking-wide uppercase">
                PANEL DE CONSULTAS PROGRAMADAS
              </h2>
              <div
                className={`text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider ${
                  pendingCount > 0
                    ? "bg-orange-50 text-orange-500"
                    : "bg-green-50 text-green-500"
                }`}
              >
                {appointments.length} Cita(s) — {pendingCount} Pendiente(s)
              </div>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto">
              {isLoading && appointments.length === 0 ? (
                <div className="flex justify-center p-16 text-slate-400 font-bold">
                  Cargando citas...
                </div>
              ) : appointments.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-10 bg-slate-50/50 min-h-[500px]">
                  <div className="w-40 h-40 bg-red-50 rounded-3xl flex items-center justify-center mb-8">
                    <CalendarIcon
                      size={64}
                      className="text-slate-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">
                    Sin actividad para este día
                  </h3>
                  <p className="text-base font-medium text-slate-500 text-center max-w-sm leading-relaxed">
                    No hay citas registradas para {selectedDate}.
                    <br />
                    Utiliza el formulario lateral para programar un nuevo
                    paciente.
                  </p>
                </div>
              ) : (
                <div className="p-6 flex flex-col gap-3">
                  {appointments
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((appt) => {
                      const badge = STATUS_BADGES[appt.status];
                      return (
                        <div
                          key={appt.id}
                          className="p-5 rounded-2xl border border-slate-100 hover:border-sky-200 hover:shadow-md transition-all group bg-slate-50/50"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center shrink-0 group-hover:bg-sky-100 transition-colors">
                                <Clock
                                  size={22}
                                  className="text-sky-500"
                                />
                              </div>
                              <div>
                                <h3 className="font-bold text-slate-800 text-lg group-hover:text-sky-600 transition-colors flex items-center gap-2">
                                  <User size={16} className="text-slate-400" />
                                  {appt.patientName}
                                </h3>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="text-sm font-bold text-sky-500">
                                    {appt.time}
                                  </span>
                                  <span className="text-xs text-slate-400">
                                    •
                                  </span>
                                  <span className="text-sm font-medium text-slate-500">
                                    {appt.duration}
                                  </span>
                                  <span className="text-xs text-slate-400">
                                    •
                                  </span>
                                  <span className="text-sm font-medium text-slate-500">
                                    {appt.treatment}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${badge.bg} ${badge.text}`}
                              >
                                {badge.label}
                              </span>
                              <button
                                onClick={() => handleDelete(appt.id)}
                                className="text-slate-300 hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer p-1"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          {appt.whatsapp && (
                            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium ml-16">
                              <Phone size={12} />
                              +52 {appt.whatsapp}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Panel Footer */}
            <div className="p-6 border-t border-slate-100 flex justify-between items-center bg-white rounded-b-3xl">
              <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                <Lightbulb size={16} />
                Las citas se muestran ordenadas por hora
              </p>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                  <span className="text-xs font-bold text-slate-600 uppercase">
                    Confirmado
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                  <span className="text-xs font-bold text-slate-600 uppercase">
                    Pendiente
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
