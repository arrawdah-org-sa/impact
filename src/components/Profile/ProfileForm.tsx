import React, { useState } from 'react';
import { AtSign, Phone } from 'lucide-react';
import { Input } from '../common/Input';
import { useAuth } from '../../contexts/AuthContext';
import { validatePhone } from '../../utils/validation';

export function ProfileForm() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    nickname: user?.nickname || '',
    phone: user?.phone || ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate phone number
    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      setError(phoneError);
      setLoading(false);
      return;
    }

    try {
      await updateUser({
        nickname: formData.nickname,
        phone: formData.phone
      });
      setSuccess('تم تحديث الملف الشخصي بنجاح');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء تحديث الملف الشخصي');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
        <Input
          icon={<AtSign className="w-5 h-5" />}
          label="الاسم التعريفي"
          value={formData.nickname}
          onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
          placeholder="الاسم الذي سيظهر للآخرين"
          disabled={loading}
          required
        />

        <Input
          icon={<Phone className="w-5 h-5" />}
          label="رقم الجوال"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+966XXXXXXXXX"
          disabled={loading}
          required
        />

        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        )}

        {success && (
          <p className="text-green-600 dark:text-green-400 text-sm">{success}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 bg-primary-600 text-white rounded-lg font-medium
                   hover:bg-primary-700 transition-colors duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
        </button>
      </form>
    </div>
  );
}