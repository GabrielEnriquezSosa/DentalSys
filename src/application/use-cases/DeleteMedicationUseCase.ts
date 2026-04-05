import type { MedicationRepository } from '../../domain/repositories/MedicationRepository';

export class DeleteMedicationUseCase {
  private repository: MedicationRepository;

  constructor(repository: MedicationRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<void> {
    if (!id || id.trim() === '') {
      throw new Error('El ID del medicamento es obligatorio para eliminar.');
    }
    try {
      return await this.repository.deleteMedication(id);
    } catch (error) {
      console.error('Error in DeleteMedicationUseCase:', error);
      throw new Error('No se pudo eliminar el medicamento.');
    }
  }
}
