import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken, updateProfile } from '../services/auth';
import type { UserProfile } from '../types/auth';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateUser: (data: Partial<UserProfile>) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  updateUser: async () => {},
  logout: () => {},
  clearError: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        const userData = await verifyToken();
        setUser(userData);
        setError(null);
      } catch (err) {
        console.error('Error loading user:', err);
        localStorage.removeItem('token');
        setError('جلسة غير صالحة. الرجاء تسجيل الدخول مرة أخرى.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  const updateUser = async (data: Partial<UserProfile>) => {
    try {
      const updatedUser = await updateProfile(data);
      setUser(prev => prev ? { ...prev, ...updatedUser } : updatedUser);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'حدث خطأ أثناء تحديث الملف الشخصي';
      setError(message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
    navigate('/');
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error,
      updateUser, 
      logout,
      clearError 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);