import type { Service } from '../../domain/models/Service';
import type { ServiceRepository } from '../../domain/repositories/ServiceRepository';

export class GetServicesUseCase {
  private repository: ServiceRepository;

  constructor(repository: ServiceRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Service[]> {
    return await this.repository.getServices();
  }
}
