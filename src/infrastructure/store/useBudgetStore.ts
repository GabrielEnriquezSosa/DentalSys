import { create } from 'zustand';
import type { Budget, BudgetItem } from '../../domain/models/Budget';
import { LocalStorageBudgetRepository } from '../repositories/LocalStorageBudgetRepository';
import { GetBudgetsUseCase } from '../../application/use-cases/GetBudgetsUseCase';
import { CreateBudgetUseCase } from '../../application/use-cases/CreateBudgetUseCase';

const repository = new LocalStorageBudgetRepository();
const getBudgetsUseCase = new GetBudgetsUseCase(repository);
const createBudgetUseCase = new CreateBudgetUseCase(repository);

interface BudgetState {
  // Global Budgets State
  budgets: Budget[];
  isLoading: boolean;
  error: string | null;

  // Draft Budget State (Building in progress)
  draftPatientName: string;
  draftItems: BudgetItem[];
  draftDiscountPercentage: number;
  draftValidityDays: number;
  draftNotes: string;

  // Actions
  fetchBudgets: () => Promise<void>;
  
  // Draft Actions
  setDraftPatientName: (name: string) => void;
  setDraftDiscount: (percentage: number) => void;
  setDraftValidityDays: (days: number) => void;
  setDraftNotes: (notes: string) => void;
  
  addDraftItem: (item: Omit<BudgetItem, 'id'>) => void;
  removeDraftItem: (id: string) => void;
  resetDraft: () => void;

  // Derived calculations
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getTotal: () => number;

  createBudget: () => Promise<Budget>;
}

export const useBudgetStore = create<BudgetState>((set, get) => ({
  budgets: [],
  isLoading: false,
  error: null,

  draftPatientName: '',
  draftItems: [],
  draftDiscountPercentage: 0,
  draftValidityDays: 15,
  draftNotes: '',

  fetchBudgets: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getBudgetsUseCase.execute();
      set({ budgets: data, isLoading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error fetching budgets';
      set({ error: message, isLoading: false });
    }
  },

  setDraftPatientName: (name) => set({ draftPatientName: name }),
  setDraftDiscount: (percentage) => set({ draftDiscountPercentage: percentage }),
  setDraftValidityDays: (days) => set({ draftValidityDays: days }),
  setDraftNotes: (notes) => set({ draftNotes: notes }),

  addDraftItem: (item) => {
    const newItem: BudgetItem = {
      ...item,
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15)
    };
    set((state) => ({ draftItems: [...state.draftItems, newItem] }));
  },

  removeDraftItem: (id) => {
    set((state) => ({ draftItems: state.draftItems.filter(item => item.id !== id) }));
  },

  resetDraft: () => {
    set({
      draftPatientName: '',
      draftItems: [],
      draftDiscountPercentage: 0,
      draftValidityDays: 15,
      draftNotes: '',
      error: null
    });
  },

  getSubtotal: () => {
    const { draftItems } = get();
    return draftItems.reduce((acc, item) => acc + item.monto, 0);
  },

  getDiscountAmount: () => {
    const { getSubtotal, draftDiscountPercentage } = get();
    return getSubtotal() * (draftDiscountPercentage / 100);
  },

  getTotal: () => {
    const { getSubtotal, getDiscountAmount } = get();
    return getSubtotal() - getDiscountAmount();
  },

  createBudget: async () => {
    set({ isLoading: true, error: null });
    const state = get();
    try {
      const newBudget = await createBudgetUseCase.execute({
        patientName: state.draftPatientName,
        items: state.draftItems,
        discountPercentage: state.draftDiscountPercentage,
        validityDays: state.draftValidityDays,
        notes: state.draftNotes,
        subtotal: state.getSubtotal(),
        discountAmount: state.getDiscountAmount(),
        total: state.getTotal()
      });
      
      set((s) => ({
        budgets: [...s.budgets, newBudget],
        isLoading: false
      }));
      
      get().resetDraft();
      return newBudget;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error creating budget';
      set({ error: message, isLoading: false });
      throw err;
    }
  }
}));
