import type { HabitData } from '../types/habits';

export interface HabitRepository {
  getHabits(): Promise<Record<string, HabitData>>;
  saveHabits(habits: Record<string, HabitData>): Promise<void>;
  updateHabit(habitName: string, data: HabitData): Promise<void>;
}

export class LocalStorageHabitRepository implements HabitRepository {
  private readonly storageKey = 'habits_data';

  async getHabits(): Promise<Record<string, HabitData>> {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return {};
    }
  }

  async saveHabits(habits: Record<string, HabitData>): Promise<void> {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(habits));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      throw error;
    }
  }

  async updateHabit(habitName: string, data: HabitData): Promise<void> {
    try {
      const habits = await this.getHabits();
      habits[habitName] = data;
      await this.saveHabits(habits);
    } catch (error) {
      console.error('Error updating habit:', error);
      throw error;
    }
  }
}