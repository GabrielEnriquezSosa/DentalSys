import type { Budget } from '../../domain/models/Budget';
import type { BudgetRepository } from '../../domain/repositories/BudgetRepository';

const STORAGE_KEY = 'dental_sys_budgets';

export class LocalStorageBudgetRepository implements BudgetRepository {
  private getBudgetsFromStorage(): Budget[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  }

  private saveBudgetsToStorage(budgets: Budget[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
  }

  async getBudgets(): Promise<Budget[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getBudgetsFromStorage());
      }, 300);
    });
  }

  async getBudgetById(id: string): Promise<Budget | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const budgets = this.getBudgetsFromStorage();
        const budget = budgets.find(b => b.id === id);
        resolve(budget || null);
      }, 200);
    });
  }

  async createBudget(budgetData: Omit<Budget, 'id' | 'createdAt' | 'updatedAt' | 'folio'>): Promise<Budget> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const budgets = this.getBudgetsFromStorage();
        const year = new Date().getFullYear();
        // Generate simple folio logic
        const count = budgets.length + 1;
        const folioNumber = count.toString().padStart(4, '0');
        const folio = `PR-${year}-${folioNumber}`;

        const newBudget: Budget = {
          ...budgetData,
          id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
          folio,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        budgets.push(newBudget);
        this.saveBudgetsToStorage(budgets);
        resolve(newBudget);
      }, 400);
    });
  }

  async deleteBudget(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const budgets = this.getBudgetsFromStorage();
        const filtered = budgets.filter(b => b.id !== id);
        this.saveBudgetsToStorage(filtered);
        resolve();
      }, 300);
    });
  }
}
