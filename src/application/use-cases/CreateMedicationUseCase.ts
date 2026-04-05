import type { Medication } from '../../domain/models/Medication';
import type { MedicationRepository } from '../../domain/repositories/MedicationRepository';

export class CreateMedicationUseCase {
  private repository: MedicationRepository;

  constructor(repository: MedicationRepository) {
    this.repository = repository;
  }

  async execute(data: Omit<Medication, 'id' | 'createdAt' | 'updatedAt'>): Promise<Medication> {
    // Domain validations
    if (!data.name || data.name.trim().length < 3) {
      throw new Error('El nombre del medicamento es obligatorio (mínimo 3 caracteres).');
    }
    if (!data.category || data.category.trim() === '') {
      throw new Error('La categoría terapéutica es obligatoria.');
    }
    if (!data.usage || data.usage.trim() === '') {
      throw new Error('El uso principal / indicación es obligatorio.');
    }

    try {
      return await this.repository.createMedication(data);
    } catch (error) {
      console.error('Error in CreateMedicationUseCase:', error);
      throw new Error('No se pudo registrar el medicamento.');
    }
  }
}
