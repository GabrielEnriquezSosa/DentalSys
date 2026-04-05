import type { Appointment } from '../../domain/models/Appointment';
import type { AppointmentRepository } from '../../domain/repositories/AppointmentRepository';

const STORAGE_KEY = 'dental_sys_appointments';

export class LocalStorageAppointmentRepository implements AppointmentRepository {
  private getFromStorage(): Appointment[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  }

  private saveToStorage(appointments: Appointment[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }

  async getAppointments(): Promise<Appointment[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getFromStorage());
      }, 300);
    });
  }

  async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const all = this.getFromStorage();
        resolve(all.filter((a) => a.date === date));
      }, 200);
    });
  }

  async getAppointmentById(id: string): Promise<Appointment | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const all = this.getFromStorage();
        resolve(all.find((a) => a.id === id) || null);
      }, 200);
    });
  }

  async createAppointment(data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const all = this.getFromStorage();
        const newAppt: Appointment = {
          ...data,
          id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        all.push(newAppt);
        this.saveToStorage(all);
        resolve(newAppt);
      }, 400);
    });
  }

  async updateAppointment(id: string, data: Partial<Appointment>): Promise<Appointment> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const all = this.getFromStorage();
        const index = all.findIndex((a) => a.id === id);
        if (index === -1) {
          reject(new Error('Cita no encontrada.'));
          return;
        }
        const updated: Appointment = {
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

  async deleteAppointment(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const all = this.getFromStorage();
        const filtered = all.filter((a) => a.id !== id);
        this.saveToStorage(filtered);
        resolve();
      }, 300);
    });
  }
}
