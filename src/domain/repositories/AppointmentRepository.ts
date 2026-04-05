import type { Appointment } from '../models/Appointment';

export interface AppointmentRepository {
  /**
   * Retrieves all appointments.
   */
  getAppointments(): Promise<Appointment[]>;

  /**
   * Retrieves appointments for a specific date (YYYY-MM-DD).
   */
  getAppointmentsByDate(date: string): Promise<Appointment[]>;

  /**
   * Retrieves a single appointment by ID.
   */
  getAppointmentById(id: string): Promise<Appointment | null>;

  /**
   * Creates a new appointment.
   */
  createAppointment(data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment>;

  /**
   * Updates an existing appointment.
   */
  updateAppointment(id: string, data: Partial<Appointment>): Promise<Appointment>;

  /**
   * Deletes an appointment by ID.
   */
  deleteAppointment(id: string): Promise<void>;
}
