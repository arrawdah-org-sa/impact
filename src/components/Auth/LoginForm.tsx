import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { Input } from '../common/Input';
import { loginUser } from '../../services/auth';

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginUser(formData);
      onSuccess();
    } catch (err) {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <Input
        icon={<User className="w-5 h-5" />}
        label="اسم المستخدم"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        placeholder="أدخل اسم المستخدم"
        required
      />

      <Input
        icon={<Lock className="w-5 h-5" />}
        label="كلمة المرور"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="أدخل كلمة المرور"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 bg-primary-600 text-white rounded-lg font-medium
                   hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                   transition-colors duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {loading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
      </button>
    </form>
  );
}