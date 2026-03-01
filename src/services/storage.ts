import { Investigator } from '@/types';

const STORAGE_KEY = 'investigators_data';

export const storage = {
  getInvestigators: (): Investigator[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  getInvestigator: (id: number): Investigator | undefined => {
    const investigators = storage.getInvestigators();
    return investigators.find((inv) => inv.id === id);
  },

  createInvestigator: (investigator: Omit<Investigator, 'id'>): Investigator => {
    const investigators = storage.getInvestigators();
    const newId = Date.now(); // Simple ID generation
    const newInvestigator = { ...investigator, id: newId };
    investigators.push(newInvestigator);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(investigators));
    return newInvestigator;
  },

  updateInvestigator: (id: number, updates: Partial<Investigator>): Investigator | undefined => {
    const investigators = storage.getInvestigators();
    const index = investigators.findIndex((inv) => inv.id === id);
    if (index === -1) return undefined;

    const updatedInvestigator = { ...investigators[index], ...updates };
    investigators[index] = updatedInvestigator;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(investigators));
    return updatedInvestigator;
  },

  deleteInvestigator: (id: number): void => {
    const investigators = storage.getInvestigators();
    const filtered = investigators.filter((inv) => inv.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
