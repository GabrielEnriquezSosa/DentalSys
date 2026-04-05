import { create } from 'zustand';
import type { Medication } from '../../domain/models/Medication';
import { LocalStorageMedicationRepository } from '../repositories/LocalStorageMedicationRepository';
import { GetMedicationsUseCase } from '../../application/use-cases/GetMedicationsUseCase';
import { CreateMedicationUseCase } from '../../application/use-cases/CreateMedicationUseCase';
import { DeleteMedicationUseCase } from '../../application/use-cases/DeleteMedicationUseCase';

const repository = new LocalStorageMedicationRepository();
const getMedicationsUseCase = new GetMedicationsUseCase(repository);
const createMedicationUseCase = new CreateMedicationUseCase(repository);
const deleteMedicationUseCase = new DeleteMedicationUseCase(repository);

interface MedicationState {
  medications: Medication[];
  isLoading: boolean;
  error: string | null;

  fetchMedications: () => Promise<void>;
  createMedication: (data: Omit<Medication, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Medication>;
  deleteMedication: (id: string) => Promise<void>;
}

export const useMedicationStore = create<MedicationState>((set) => ({
  medications: [],
  isLoading: false,
  error: null,

  fetchMedications: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getMedicationsUseCase.execute();
      set({ medications: data, isLoading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al cargar medicamentos';
      set({ error: message, isLoading: false });
    }
  },

  createMedication: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newMed = await createMedicationUseCase.execute(data);
      set((state) => ({
        medications: [...state.medications, newMed],
        isLoading: false,
      }));
      return newMed;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al crear medicamento';
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  deleteMedication: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteMedicationUseCase.execute(id);
      set((state) => ({
        medications: state.medications.filter((m) => m.id !== id),
        isLoading: false,
      }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al eliminar medicamento';
      set({ error: message, isLoading: false });
    }
  },
}));
