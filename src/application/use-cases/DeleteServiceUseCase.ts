import type { ServiceRepository } from '../../domain/repositories/ServiceRepository';

export class DeleteServiceUseCase {
  private repository: ServiceRepository;

  constructor(repository: ServiceRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error('El ID del servicio es obligatorio.');
    }
    await this.repository.deleteService(id);
  }
}
