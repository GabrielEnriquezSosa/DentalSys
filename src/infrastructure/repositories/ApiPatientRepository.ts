import type { Patient } from '../../domain/models/Patient';
import type { PatientRepository } from '../../domain/repositories/PatientRepository';

export class ApiPatientRepository implements PatientRepository {
  private apiUrl: string;

  constructor(apiUrl: string = 'https://api.tudominio.com/v1') {
    this.apiUrl = apiUrl;
  }

  async getPatients(): Promise<Patient[]> {
    const response = await fetch(`${this.apiUrl}/patients`);
    if (!response.ok) throw new Error('API Error fetching patients');
    return response.json();
  }

  async getPatientById(id: string): Promise<Patient | null> {
    const response = await fetch(`${this.apiUrl}/patients/${id}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error('API Error fetching patient');
    return response.json();
  }

  async createPatient(patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> {
    const response = await fetch(`${this.apiUrl}/patients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData),
    });
    if (!response.ok) throw new Error('API Error creating patient');
    return response.json();
  }

  async updatePatient(id: string, updateData: Partial<Patient>): Promise<Patient> {
    const response = await fetch(`${this.apiUrl}/patients/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) throw new Error('API Error updating patient');
    return response.json();
  }

  async deletePatient(id: string): Promise<void> {
    const response = await fetch(`${this.apiUrl}/patients/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('API Error deleting patient');
  }
}
