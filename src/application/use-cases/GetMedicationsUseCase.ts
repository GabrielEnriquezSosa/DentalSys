import type { Medication } from '../../domain/models/Medication';
import type { MedicationRepository } from '../../domain/repositories/MedicationRepository';

export class GetMedicationsUseCase {
  private repository: MedicationRepository;

  constructor(repository: MedicationRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Medication[]> {
    return await this.repository.getMedications();
  }
}
