import type { Patient } from '../../domain/models/Patient';
import type { PatientRepository } from '../../domain/repositories/PatientRepository';

export class CreatePatientUseCase {
  private patientRepository: PatientRepository;

  constructor(patientRepository: PatientRepository) {
    this.patientRepository = patientRepository;
  }

  async execute(patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> {
    // 1. Validaciones clínicas o de dominio
    if (!patientData.fullName || patientData.fullName.trim() === '') {
      throw new Error('El nombre del paciente es obligatorio.');
    }
    if (!patientData.phone || patientData.phone.length < 10) {
      throw new Error('El teléfono proporcionado no es válido.');
    }

    try {
      // 2. Persistir datos
      return await this.patientRepository.createPatient(patientData);
    } catch (error) {
      console.error('Error in CreatePatientUseCase:', error);
      throw new Error('No se pudo registrar al paciente.');
    }
  }
}
