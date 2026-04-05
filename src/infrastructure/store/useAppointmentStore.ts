import { create } from 'zustand';
import type { Appointment } from '../../domain/models/Appointment';
import { LocalStorageAppointmentRepository } from '../repositories/LocalStorageAppointmentRepository';
import { GetAppointmentsUseCase } from '../../application/use-cases/GetAppointmentsUseCase';
import { CreateAppointmentUseCase } from '../../application/use-cases/CreateAppointmentUseCase';
import { DeleteAppointmentUseCase } from '../../application/use-cases/DeleteAppointmentUseCase';

const repository = new LocalStorageAppointmentRepository();
const getAppointmentsUseCase = new GetAppointmentsUseCase(repository);
const createAppointmentUseCase = new CreateAppointmentUseCase(repository);
const deleteAppointmentUseCase = new DeleteAppointmentUseCase(repository);

interface AppointmentState {
  appointments: Appointment[];
  selectedDate: string; // YYYY-MM-DD
  isLoading: boolean;
  error: string | null;

  setSelectedDate: (date: string) => void;
  fetchAppointments: () => Promise<void>;
  fetchAppointmentsByDate: (date: string) => Promise<void>;
  createAppointment: (data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Appointment>;
  deleteAppointment: (id: string) => Promise<void>;
}

const getTodayISO = (): string => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

export const useAppointmentStore = create<AppointmentState>((set) => ({
  appointments: [],
  selectedDate: getTodayISO(),
  isLoading: false,
  error: null,

  setSelectedDate: (date) => {
    set({ selectedDate: date });
  },

  fetchAppointments: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getAppointmentsUseCase.execute();
      set({ appointments: data, isLoading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al cargar citas';
      set({ error: message, isLoading: false });
    }
  },

  fetchAppointmentsByDate: async (date) => {
    set({ isLoading: true, error: null, selectedDate: date });
    try {
      const data = await getAppointmentsUseCase.executeByDate(date);
      set({ appointments: data, isLoading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al cargar citas';
      set({ error: message, isLoading: false });
    }
  },

  createAppointment: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newAppt = await createAppointmentUseCase.execute(data);
      set((state) => ({
        appointments: [...state.appointments, newAppt],
        isLoading: false,
      }));
      return newAppt;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al crear cita';
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  deleteAppointment: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteAppointmentUseCase.execute(id);
      set((state) => ({
        appointments: state.appointments.filter((a) => a.id !== id),
        isLoading: false,
      }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al eliminar cita';
      set({ error: message, isLoading: false });
    }
  },
}));
