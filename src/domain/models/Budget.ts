export interface BudgetItem {
  id: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
  monto: number;
}

export interface Budget {
  id: string;
  folio: string;
  patientName: string;
  items: BudgetItem[];
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  total: number;
  validityDays: number;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}
