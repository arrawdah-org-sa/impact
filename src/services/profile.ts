import { api } from '../config/api';
import type { UserProfile } from '../types/auth';

interface ProfileUpdateData {
  nickname?: string;
  phone?: string;
}

export async function updateUserProfile(data: ProfileUpdateData): Promise<UserProfile> {
  try {
    const response = await api.put('/auth/profile', data);
    
    if (response.data.status === 'success') {
      return response.data.data;
    }
    
    throw new Error(response.data.message);
  } catch (error: any) {
    console.error('Profile update error:', error);
    throw new Error(error.response?.data?.message || 'حدث خطأ أثناء تحديث الملف الشخصي');
  }
}