import { create } from 'zustand';
import type { Patient } from '../../domain/models/Patient';
import { LocalStoragePatientRepository } from '../repositories/LocalStoragePatientRepository';
import { GetPatientsUseCase } from '../../application/use-cases/GetPatientsUseCase';
import { CreatePatientUseCase } from '../../application/use-cases/CreatePatientUseCase';

// Change this line when you want to switch to a real API:
// const repository = new ApiPatientRepository('https://tu-api.com');
const repository = new LocalStoragePatientRepository();

const getPatientsUseCase = new GetPatientsUseCase(repository);
const createPatientUseCase = new CreatePatientUseCase(repository);

interface PatientState {
  patients: Patient[];
  activePatient: Patient | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchPatients: () => Promise<void>;
  createPatient: (data: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Patient>;
  setActivePatient: (patient: Patient | null) => void;
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  activePatient: null,
  isLoading: false,
  error: null,

  fetchPatients: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getPatientsUseCase.execute();
      set({ patients: data, isLoading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error fetching patients';
      set({ error: message, isLoading: false });
    }
  },

  createPatient: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newPatient = await createPatientUseCase.execute(data);
      set((state) => ({ 
        patients: [...state.patients, newPatient],
        isLoading: false 
      }));
      return newPatient;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error creating patient';
      set({ error: message, isLoading: false });
      throw err; // Re-throw to handle it in the UI (e.g. show toast)
    }
  },

  setActivePatient: (patient) => {
    set({ activePatient: patient });
  }
}));
