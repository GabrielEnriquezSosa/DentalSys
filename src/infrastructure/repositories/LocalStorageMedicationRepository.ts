import type { Medication } from '../../domain/models/Medication';
import type { MedicationRepository } from '../../domain/repositories/MedicationRepository';

const STORAGE_KEY = 'dental_sys_medications';

export class LocalStorageMedicationRepository implements MedicationRepository {
  private getFromStorage(): Medication[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  }

  private saveToStorage(medications: Medication[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medications));
  }

  async getMedications(): Promise<Medication[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getFromStorage());
      }, 300);
    });
  }

  async getMedicationById(id: string): Promise<Medication | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const meds = this.getFromStorage();
        resolve(meds.find((m) => m.id === id) || null);
      }, 200);
    });
  }

  async createMedication(data: Omit<Medication, 'id' | 'createdAt' | 'updatedAt'>): Promise<Medication> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const meds = this.getFromStorage();
        const newMed: Medication = {
          ...data,
          id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        meds.push(newMed);
        this.saveToStorage(meds);
        resolve(newMed);
      }, 400);
    });
  }

  async updateMedication(id: string, data: Partial<Medication>): Promise<Medication> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const meds = this.getFromStorage();
        const index = meds.findIndex((m) => m.id === id);
        if (index === -1) {
          reject(new Error('Medicamento no encontrado.'));
          return;
        }
        const updated: Medication = {
          ...meds[index],
          ...data,
          id: meds[index].id,
          createdAt: meds[index].createdAt,
          updatedAt: new Date(),
        };
        meds[index] = updated;
        this.saveToStorage(meds);
        resolve(updated);
      }, 300);
    });
  }

  async deleteMedication(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const meds = this.getFromStorage();
        const filtered = meds.filter((m) => m.id !== id);
        this.saveToStorage(filtered);
        resolve();
      }, 300);
    });
  }
}
