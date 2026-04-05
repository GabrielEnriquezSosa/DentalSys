import type { Medication } from '../models/Medication';

export interface MedicationRepository {
  /**
   * Retrieves all medications.
   */
  getMedications(): Promise<Medication[]>;

  /**
   * Retrieves a single medication by ID.
   */
  getMedicationById(id: string): Promise<Medication | null>;

  /**
   * Creates a new medication.
   */
  createMedication(data: Omit<Medication, 'id' | 'createdAt' | 'updatedAt'>): Promise<Medication>;

  /**
   * Updates an existing medication.
   */
  updateMedication(id: string, data: Partial<Medication>): Promise<Medication>;

  /**
   * Deletes a medication by ID.
   */
  deleteMedication(id: string): Promise<void>;
}
