import type { Service } from '../../domain/models/Service';
import type { ServiceRepository } from '../../domain/repositories/ServiceRepository';

const STORAGE_KEY = 'dental_sys_services';

export class LocalStorageServiceRepository implements ServiceRepository {
  private getFromStorage(): Service[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  }

  private saveToStorage(services: Service[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
  }

  async getServices(): Promise<Service[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getFromStorage());
      }, 200);
    });
  }

  async getServiceById(id: string): Promise<Service | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const all = this.getFromStorage();
        resolve(all.find((s) => s.id === id) || null);
      }, 200);
    });
  }

  async createService(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const all = this.getFromStorage();
        const newService: Service = {
          ...data,
          id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        all.push(newService);
        this.saveToStorage(all);
        resolve(newService);
      }, 300);
    });
  }

  async updateService(id: string, data: Partial<Service>): Promise<Service> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const all = this.getFromStorage();
        const index = all.findIndex((s) => s.id === id);
        if (index === -1) {
          reject(new Error('Servicio no encontrado.'));
          return;
        }
        const updated: Service = {
          ...all[index],
          ...data,
          id: all[index].id,
          createdAt: all[index].createdAt,
          updatedAt: new Date(),
        };
        all[index] = updated;
        this.saveToStorage(all);
        resolve(updated);
      }, 300);
    });
  }

  async deleteService(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const all = this.getFromStorage();
        const filtered = all.filter((s) => s.id !== id);
        this.saveToStorage(filtered);
        resolve();
      }, 200);
    });
  }
}
