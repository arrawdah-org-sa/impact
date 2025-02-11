import { api } from '../config/api';
import type { HabitData, HabitStats } from '../types/habits';

// Helper function to handle API responses
const handleResponse = <T>(response: any): T => {
  if (response.data.status === 'success') {
    return response.data.data;
  }
  throw new Error(response.data.message);
};

// Helper function to handle errors
const handleError = (error: any, defaultMessage: string): never => {
  console.error('API Error:', error);
  if (error.response?.data?.message) {
    throw new Error(error.response.data.message);
  }
  throw new Error(defaultMessage);
};

export async function getHabits(): Promise<HabitData[]> {
  try {
    const response = await api.get('/habits');
    return handleResponse<HabitData[]>(response);
  } catch (error) {
    throw handleError(error, 'حدث خطأ أثناء جلب العادات');
  }
}

export async function createHabit(
  data: Pick<HabitData, 'name' | 'description' | 'category'>
): Promise<HabitData> {
  try {
    const response = await api.post('/habits', data);
    return handleResponse<HabitData>(response);
  } catch (error) {
    throw handleError(error, 'حدث خطأ أثناء إنشاء العادة');
  }
}

export async function updateHabit(
  id: string, 
  data: Partial<HabitData>
): Promise<HabitData> {
  try {
    // Ensure we only send serializable data
    const safeData = {
      name: data.name,
      description: data.description,
      category: data.category,
      weeks: data.weeks,
      progress: data.progress,
      streak: data.streak,
      isActive: data.isActive
    };

    const response = await api.put(`/habits/${id}`, safeData);
    return handleResponse<HabitData>(response);
  } catch (error) {
    throw handleError(error, 'حدث خطأ أثناء تحديث العادة');
  }
}

export async function deleteHabit(id: string): Promise<boolean> {
  try {
    const response = await api.delete(`/habits/${id}`);
    return handleResponse<boolean>(response);
  } catch (error) {
    throw handleError(error, 'حدث خطأ أثناء حذف العادة');
  }
}

export async function addNote(
  habitId: string, 
  content: string
): Promise<HabitData> {
  try {
    const response = await api.post(`/habits/${habitId}/notes`, { content });
    return handleResponse<HabitData>(response);
  } catch (error) {
    throw handleError(error, 'حدث خطأ أثناء إضافة الملاحظة');
  }
}

export async function getHabitStats(habitId: string): Promise<HabitStats> {
  try {
    const response = await api.get(`/habits/${habitId}/stats`);
    return handleResponse<HabitStats>(response);
  } catch (error) {
    throw handleError(error, 'حدث خطأ أثناء جلب إحصائيات العادة');
  }
}