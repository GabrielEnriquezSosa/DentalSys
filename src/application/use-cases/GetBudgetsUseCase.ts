import type { Budget } from '../../domain/models/Budget';
import type { BudgetRepository } from '../../domain/repositories/BudgetRepository';

export class GetBudgetsUseCase {
  private budgetRepository: BudgetRepository;

  constructor(budgetRepository: BudgetRepository) {
    this.budgetRepository = budgetRepository;
  }

  async execute(): Promise<Budget[]> {
    try {
      return await this.budgetRepository.getBudgets();
    } catch (error) {
      console.error('Error in GetBudgetsUseCase:', error);
      throw new Error('Failed to retrieve budgets.');
    }
  }
}
