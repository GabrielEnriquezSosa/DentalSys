import type { MedicalProfile } from '../../domain/models/MedicalProfile';
import type { MedicalProfileRepository } from '../../domain/repositories/MedicalProfileRepository';

export class CreateMedicalProfileUseCase {
  private repository: MedicalProfileRepository;

  constructor(repository: MedicalProfileRepository) {
    this.repository = repository;
  }

  async execute(data: Omit<MedicalProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<MedicalProfile> {
    // Domain validations
    if (!data.fullName || data.fullName.trim().length < 3) {
      throw new Error('El nombre del médico es obligatorio (mínimo 3 caracteres).');
    }
    if (!data.specialty || data.specialty.trim() === '') {
      throw new Error('La especialidad es obligatoria.');
    }
    if (!data.licenseNumber || data.licenseNumber.length < 6) {
      throw new Error('La cédula profesional debe tener al menos 6 dígitos.');
    }
    if (!data.phone || data.phone.replace(/\D/g, '').length < 10) {
      throw new Error('El teléfono debe tener al menos 10 dígitos.');
    }

    try {
      return await this.repository.createProfile(data);
    } catch (error) {
      console.error('Error in CreateMedicalProfileUseCase:', error);
      throw new Error('No se pudo registrar el perfil médico.');
    }
  }
}
