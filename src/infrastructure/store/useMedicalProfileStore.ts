import { create } from 'zustand';
import type { MedicalProfile } from '../../domain/models/MedicalProfile';
import { LocalStorageMedicalProfileRepository } from '../repositories/LocalStorageMedicalProfileRepository';
import { GetMedicalProfilesUseCase } from '../../application/use-cases/GetMedicalProfilesUseCase';
import { CreateMedicalProfileUseCase } from '../../application/use-cases/CreateMedicalProfileUseCase';
import { DeleteMedicalProfileUseCase } from '../../application/use-cases/DeleteMedicalProfileUseCase';

const repository = new LocalStorageMedicalProfileRepository();
const getProfilesUseCase = new GetMedicalProfilesUseCase(repository);
const createProfileUseCase = new CreateMedicalProfileUseCase(repository);
const deleteProfileUseCase = new DeleteMedicalProfileUseCase(repository);

interface MedicalProfileState {
  profiles: MedicalProfile[];
  isLoading: boolean;
  error: string | null;

  fetchProfiles: () => Promise<void>;
  createProfile: (data: Omit<MedicalProfile, 'id' | 'createdAt' | 'updatedAt'>) => Promise<MedicalProfile>;
  deleteProfile: (id: string) => Promise<void>;
}

export const useMedicalProfileStore = create<MedicalProfileState>((set) => ({
  profiles: [],
  isLoading: false,
  error: null,

  fetchProfiles: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getProfilesUseCase.execute();
      set({ profiles: data, isLoading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al cargar perfiles médicos';
      set({ error: message, isLoading: false });
    }
  },

  createProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newProfile = await createProfileUseCase.execute(data);
      set((state) => ({
        profiles: [...state.profiles, newProfile],
        isLoading: false,
      }));
      return newProfile;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al crear perfil';
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  deleteProfile: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteProfileUseCase.execute(id);
      set((state) => ({
        profiles: state.profiles.filter(p => p.id !== id),
        isLoading: false,
      }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al eliminar perfil';
      set({ error: message, isLoading: false });
    }
  },
}));
