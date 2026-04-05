import type { Appointment } from '../../domain/models/Appointment';
import type { AppointmentRepository } from '../../domain/repositories/AppointmentRepository';

export class GetAppointmentsUseCase {
  private repository: AppointmentRepository;

  constructor(repository: AppointmentRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Appointment[]> {
    return await this.repository.getAppointments();
  }

  async executeByDate(date: string): Promise<Appointment[]> {
    return await this.repository.getAppointmentsByDate(date);
  }
}
