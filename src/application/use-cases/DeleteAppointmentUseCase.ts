import type { AppointmentRepository } from '../../domain/repositories/AppointmentRepository';

export class DeleteAppointmentUseCase {
  private repository: AppointmentRepository;

  constructor(repository: AppointmentRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<void> {
    if (!id || id.trim() === '') {
      throw new Error('El ID de la cita es obligatorio para eliminar.');
    }
    try {
      return await this.repository.deleteAppointment(id);
    } catch (error) {
      console.error('Error in DeleteAppointmentUseCase:', error);
      throw new Error('No se pudo eliminar la cita.');
    }
  }
}
