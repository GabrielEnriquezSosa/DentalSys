export type AppointmentStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed';

export interface Appointment {
  id: string;
  patientName: string;
  whatsapp: string;
  date: string;        // ISO date string YYYY-MM-DD
  time: string;        // HH:mm format
  duration: string;    // e.g. "30 min"
  treatment: string;   // e.g. "Limpieza", "Extracción"
  status: AppointmentStatus;
  createdAt: Date;
  updatedAt: Date;
}
