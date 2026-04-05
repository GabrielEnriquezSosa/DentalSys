import type { Appointment } from '../../domain/models/Appointment';
import type { AppointmentRepository } from '../../domain/repositories/AppointmentRepository';

export class CreateAppointmentUseCase {
  private repository: AppointmentRepository;

  constructor(repository: AppointmentRepository) {
    this.repository = repository;
  }

  async execute(data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment> {
    // Domain validations
    if (!data.patientName || data.patientName.trim().length < 3) {
      throw new Error('El nombre del paciente es obligatorio (mínimo 3 caracteres).');
    }
    if (!data.whatsapp || data.whatsapp.replace(/\D/g, '').length < 10) {
      throw new Error('El WhatsApp debe tener al menos 10 dígitos.');
    }
    if (!data.date) {
      throw new Error('La fecha de la cita es obligatoria.');
    }
    if (!data.time) {
      throw new Error('La hora de la cita es obligatoria.');
    }
    if (!data.treatment || data.treatment.trim() === '') {
      throw new Error('El tratamiento es obligatorio.');
    }

    try {
      return await this.repository.createAppointment(data);
    } catch (error) {
      console.error('Error in CreateAppointmentUseCase:', error);
      throw new Error('No se pudo agendar la cita.');
    }
  }
}
