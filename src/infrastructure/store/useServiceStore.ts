import { create } from 'zustand';
import type { Service } from '../../domain/models/Service';
import { LocalStorageServiceRepository } from '../repositories/LocalStorageServiceRepository';
import { GetServicesUseCase } from '../../application/use-cases/GetServicesUseCase';
import { CreateServiceUseCase } from '../../application/use-cases/CreateServiceUseCase';
import { DeleteServiceUseCase } from '../../application/use-cases/DeleteServiceUseCase';

const repository = new LocalStorageServiceRepository();
const getServicesUseCase = new GetServicesUseCase(repository);
const createServiceUseCase = new CreateServiceUseCase(repository);
const deleteServiceUseCase = new DeleteServiceUseCase(repository);

interface ServiceState {
  services: Service[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;

  setSearchTerm: (term: string) => void;
  fetchServices: () => Promise<void>;
  createService: (data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Service>;
  deleteService: (id: string) => Promise<void>;
}

export const useServiceStore = create<ServiceState>((set) => ({
  services: [],
  isLoading: false,
  error: null,
  searchTerm: '',

  setSearchTerm: (term) => {
    set({ searchTerm: term });
  },

  fetchServices: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getServicesUseCase.execute();
      set({ services: data, isLoading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al cargar servicios';
      set({ error: message, isLoading: false });
    }
  },

  createService: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newService = await createServiceUseCase.execute(data);
      set((state) => ({
        services: [...state.services, newService],
        isLoading: false,
      }));
      return newService;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al crear servicio';
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  deleteService: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteServiceUseCase.execute(id);
      set((state) => ({
        services: state.services.filter((s) => s.id !== id),
        isLoading: false,
      }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al eliminar servicio';
      set({ error: message, isLoading: false });
    }
  },
}));
