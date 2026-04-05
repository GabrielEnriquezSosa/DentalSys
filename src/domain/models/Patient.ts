export interface Patient {
  id: string; // Identifier
  fullName: string;
  phone: string;
  email?: string;
  gender: 'Masculino' | 'Femenino' | 'Otro';
  birthDate?: string;
  age?: number;
  knownAllergies?: string[];
  createdAt: Date;
  updatedAt: Date;
}
