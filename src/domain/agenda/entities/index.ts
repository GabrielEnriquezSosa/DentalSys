export interface Cita {
  id: string;
  pacienteNombre: string;
  telefono: string;
  fechaHoraInicio: Date;
  duracionMinutos: number; // Ej. 60 para una hora
  tratamiento: string;
  estado: "Programada" | "Completada" | "Cancelada" | "No Asistió";
}
