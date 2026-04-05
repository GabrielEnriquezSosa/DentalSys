import type { Service } from '../../domain/models/Service';
import type { ServiceRepository } from '../../domain/repositories/ServiceRepository';

export class CreateServiceUseCase {
  private repository: ServiceRepository;

  constructor(repository: ServiceRepository) {
    this.repository = repository;
  }

  async execute(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
    // Domain validations
    if (!data.name || data.name.trim().length < 3) {
      throw new Error('El nombre del servicio es obligatorio (mínimo 3 caracteres).');
    }
    if (!data.cost || data.cost.trim() === '' || data.cost === '0' || data.cost === '0.00') {
      throw new Error('El costo del servicio es obligatorio y debe ser mayor a 0.');
    }

    return await this.repository.createService(data);
  }
}
