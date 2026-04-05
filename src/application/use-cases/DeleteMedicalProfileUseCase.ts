import type { MedicalProfileRepository } from '../../domain/repositories/MedicalProfileRepository';

export class DeleteMedicalProfileUseCase {
  private repository: MedicalProfileRepository;

  constructor(repository: MedicalProfileRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<void> {
    if (!id || id.trim() === '') {
      throw new Error('El ID del perfil es obligatorio para eliminar.');
    }
    try {
      return await this.repository.deleteProfile(id);
    } catch (error) {
      console.error('Error in DeleteMedicalProfileUseCase:', error);
      throw new Error('No se pudo eliminar el perfil médico.');
    }
  }
}
