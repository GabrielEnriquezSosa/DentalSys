import type { MedicalProfile } from "../models/MedicalProfile";

export interface MedicalProfileRepository {
  /**
   * Retrieves all medical profiles.
   */
  getProfiles(): Promise<MedicalProfile[]>;

  /**
   * Retrieves a single profile by ID.
   */
  getProfileById(id: string): Promise<MedicalProfile | null>;

  /**
   * Creates a new medical profile.
   */
  createProfile(
    data: Omit<MedicalProfile, "id" | "createdAt" | "updatedAt">,
  ): Promise<MedicalProfile>;

  /**
   * Updates an existing medical profile.
   */
  updateProfile(
    id: string,
    data: Partial<MedicalProfile>,
  ): Promise<MedicalProfile>;

  /**
   * Deletes a medical profile by ID.
   */
  deleteProfile(id: string): Promise<void>;
}
