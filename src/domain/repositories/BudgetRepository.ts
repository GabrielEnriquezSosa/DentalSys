import type { Budget } from '../models/Budget';

export interface BudgetRepository {
  getBudgets(): Promise<Budget[]>;
  getBudgetById(id: string): Promise<Budget | null>;
  createBudget(budgetData: Omit<Budget, 'id' | 'createdAt' | 'updatedAt' | 'folio'>): Promise<Budget>;
  deleteBudget(id: string): Promise<void>;
}
