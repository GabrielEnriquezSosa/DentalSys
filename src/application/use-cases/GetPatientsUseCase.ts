import type { Patient } from '../../domain/models/Patient';
import type { PatientRepository } from '../../domain/repositories/PatientRepository';

export class GetPatientsUseCase {
  private patientRepository: PatientRepository;

  constructor(patientRepository: PatientRepository) {
    this.patientRepository = patientRepository;
  }

  async execute(): Promise<Patient[]> {
    try {
      return await this.patientRepository.getPatients();
    } catch (error) {
      console.error('Error in GetPatientsUseCase:', error);
      throw new Error('Failed to retrieve patients.');
    }
  }
}
