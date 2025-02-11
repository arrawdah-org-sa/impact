import React, { useState } from 'react';
import { Lock, AtSign } from 'lucide-react';
import { Input } from '../../common/Input';
import { registerUser } from '../../../services/auth';
import { validateUsername, validatePassword } from '../../../utils/validation';

interface EmailRegistrationFormProps {
  onSuccess: () => void;
}

export function EmailRegistrationForm({ onSuccess }: EmailRegistrationFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {
      username: validateUsername(formData.username),
      password: validatePassword(formData.password),
      confirmPassword: formData.password !== formData.confirmPassword ? 'كلمات المرور غير متطابقة' : ''
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setIsLoading(true);

    try {
      await registerUser({
        username: formData.username,
        firstName: '',
        lastName: '',
        phone: ''
      }, formData.password);
      onSuccess();
    } catch (error) {
      console.error('Registration error:', error);
      setErrors(prev => ({
        ...prev,
        username: 'حدث خطأ أثناء التسجيل. الرجاء المحاولة مرة أخرى.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        icon={<AtSign className="w-5 h-5" />}
        label="اسم المستخدم"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        error={errors.username}
        placeholder="4-12 حرف أو رقم"
        required
      />

      <Input
        icon={<Lock className="w-5 h-5" />}
        label="كلمة المرور"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        error={errors.password}
        placeholder="8 أحرف على الأقل"
        required
      />

      <Input
        icon={<Lock className="w-5 h-5" />}
        label="تأكيد كلمة المرور"
        type="password"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        error={errors.confirmPassword}
        placeholder="أعد كتابة كلمة المرور"
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 bg-primary-600 text-white rounded-full font-medium
                   hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                   transition-colors duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'جارٍ إنشاء الحساب...' : 'إنشاء حساب'}
      </button>
    </form>
  );
}