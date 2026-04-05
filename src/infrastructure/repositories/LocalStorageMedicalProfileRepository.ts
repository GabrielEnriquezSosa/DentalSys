import type { MedicalProfile } from '../../domain/models/MedicalProfile';
import type { MedicalProfileRepository } from '../../domain/repositories/MedicalProfileRepository';

const STORAGE_KEY = 'dental_sys_medical_profiles';

export class LocalStorageMedicalProfileRepository implements MedicalProfileRepository {
  private getFromStorage(): MedicalProfile[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  }

  private saveToStorage(profiles: MedicalProfile[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  }

  async getProfiles(): Promise<MedicalProfile[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getFromStorage());
      }, 300);
    });
  }

  async getProfileById(id: string): Promise<MedicalProfile | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const profiles = this.getFromStorage();
        resolve(profiles.find(p => p.id === id) || null);
      }, 200);
    });
  }

  async createProfile(data: Omit<MedicalProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<MedicalProfile> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const profiles = this.getFromStorage();
        const newProfile: MedicalProfile = {
          ...data,
          id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        profiles.push(newProfile);
        this.saveToStorage(profiles);
        resolve(newProfile);
      }, 400);
    });
  }

  async updateProfile(id: string, data: Partial<MedicalProfile>): Promise<MedicalProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const profiles = this.getFromStorage();
        const index = profiles.findIndex(p => p.id === id);
        if (index === -1) {
          reject(new Error('Perfil médico no encontrado.'));
          return;
        }
        const updated: MedicalProfile = {
          ...profiles[index],
          ...data,
          id: profiles[index].id,
          createdAt: profiles[index].createdAt,
          updatedAt: new Date(),
        };
        profiles[index] = updated;
        this.saveToStorage(profiles);
        resolve(updated);
      }, 300);
    });
  }

  async deleteProfile(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const profiles = this.getFromStorage();
        const filtered = profiles.filter(p => p.id !== id);
        this.saveToStorage(filtered);
        resolve();
      }, 300);
    });
  }
}
