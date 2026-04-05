import type { Service } from '../models/Service';

export interface ServiceRepository {
  /**
   * Retrieves all services.
   */
  getServices(): Promise<Service[]>;

  /**
   * Retrieves a single service by ID.
   */
  getServiceById(id: string): Promise<Service | null>;

  /**
   * Creates a new service.
   */
  createService(
    data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Service>;

  /**
   * Updates an existing service.
   */
  updateService(id: string, data: Partial<Service>): Promise<Service>;

  /**
   * Deletes a service by ID.
   */
  deleteService(id: string): Promise<void>;
}
