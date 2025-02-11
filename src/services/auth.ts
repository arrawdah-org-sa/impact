import { api } from '../config/api';
import type { RegistrationData, LoginData } from '../types/auth';

const handleError = (error: any): never => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token');
    throw new Error('انتهت صلاحية الجلسة. الرجاء تسجيل الدخول مرة أخرى.');
  }
  
  const message = error.response?.data?.message || 'حدث خطأ غير متوقع';
  throw new Error(message);
};

export async function registerUser(data: RegistrationData) {
  try {
    const response = await api.post('/auth/register', {
      username: data.username,
      password: data.password,
      phone: data.phone,
      nickname: data.nickname
    });

    if (response.data.status === 'success') {
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      return user;
    }

    throw new Error(response.data.message);
  } catch (error) {
    throw handleError(error);
  }
}

export async function loginUser(data: LoginData) {
  try {
    const response = await api.post('/auth/login', {
      username: data.username,
      password: data.password
    });

    if (response.data.status === 'success') {
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      return user;
    }

    throw new Error(response.data.message);
  } catch (error) {
    throw handleError(error);
  }
}

export async function verifyToken() {
  try {
    const response = await api.get('/auth/verify');
    return response.data.data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function updateProfile(data: Partial<RegistrationData>) {
  try {
    const response = await api.put('/auth/profile', data);
    
    if (response.data.status === 'success') {
      return response.data.data;
    }

    throw new Error(response.data.message);
  } catch (error) {
    throw handleError(error);
  }
}