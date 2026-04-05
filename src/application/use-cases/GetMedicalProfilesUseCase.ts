import type { MedicalProfile } from '../../domain/models/MedicalProfile';
import type { MedicalProfileRepository } from '../../domain/repositories/MedicalProfileRepository';

export class GetMedicalProfilesUseCase {
  private repository: MedicalProfileRepository;

  constructor(repository: MedicalProfileRepository) {
    this.repository = repository;
  }

  async execute(): Promise<MedicalProfile[]> {
    return await this.repository.getProfiles();
  }
}
