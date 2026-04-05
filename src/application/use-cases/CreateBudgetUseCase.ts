import type { Budget } from '../../domain/models/Budget';
import type { BudgetRepository } from '../../domain/repositories/BudgetRepository';

export class CreateBudgetUseCase {
  private budgetRepository: BudgetRepository;

  constructor(budgetRepository: BudgetRepository) {
    this.budgetRepository = budgetRepository;
  }

  async execute(budgetData: Omit<Budget, 'id' | 'createdAt' | 'updatedAt' | 'folio'>): Promise<Budget> {
    if (!budgetData.patientName.trim()) {
      throw new Error('El nombre del paciente es requerido.');
    }

    if (budgetData.items.length === 0) {
      throw new Error('Debe agregar al menos un servicio al presupuesto.');
    }

    if (budgetData.validityDays <= 0 || budgetData.validityDays > 365) {
      throw new Error('La vigencia debe estar entre 1 y 365 días.');
    }
    
    if (budgetData.discountPercentage < 0 || budgetData.discountPercentage > 100) {
      throw new Error('El descuento debe ser un porcentaje válido entre 0 y 100.');
    }

    return await this.budgetRepository.createBudget(budgetData);
  }
}
