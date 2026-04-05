export interface Service {
  id: string;
  name: string;
  description: string;
  cost: string; // formatted currency string e.g. "800.00"
  createdAt: Date;
  updatedAt: Date;
}
