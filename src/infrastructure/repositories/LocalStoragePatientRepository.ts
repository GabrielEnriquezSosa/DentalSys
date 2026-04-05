import type { Patient } from "../../domain/models/Patient";
import type { PatientRepository } from "../../domain/repositories/PatientRepository";

const STORAGE_KEY = "dental_sys_patients";

export class LocalStoragePatientRepository implements PatientRepository {
  private getPatientsFromStorage(): Patient[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  }

  private savePatientsToStorage(patients: Patient[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
  }

  async getPatients(): Promise<Patient[]> {
    // Simula retardo de red
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getPatientsFromStorage());
      }, 500);
    });
  }

  async getPatientById(id: string): Promise<Patient | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const patients = this.getPatientsFromStorage();
        const patient = patients.find((p) => p.id === id);
        resolve(patient || null);
      }, 200);
    });
  }

  async createPatient(
    patientData: Omit<Patient, "id" | "createdAt" | "updatedAt">,
  ): Promise<Patient> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const patients = this.getPatientsFromStorage();
        const newPatient: Patient = {
          ...patientData,
          id: crypto.randomUUID
            ? crypto.randomUUID()
            : Math.random().toString(36).substring(2, 15),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        patients.push(newPatient);
        this.savePatientsToStorage(patients);
        resolve(newPatient);
      }, 500);
    });
  }

  async updatePatient(
    id: string,
    updateData: Partial<Patient>,
  ): Promise<Patient> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const patients = this.getPatientsFromStorage();
        const index = patients.findIndex((p) => p.id === id);

        if (index === -1) {
          reject(new Error("Patient not found"));
          return;
        }

        const updatedPatient = {
          ...patients[index],
          ...updateData,
          updatedAt: new Date(),
        };

        patients[index] = updatedPatient;
        this.savePatientsToStorage(patients);
        resolve(updatedPatient);
      }, 500);
    });
  }

  async deletePatient(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const patients = this.getPatientsFromStorage();
        const filtered = patients.filter((p) => p.id !== id);
        this.savePatientsToStorage(filtered);
        resolve();
      }, 500);
    });
  }
}
