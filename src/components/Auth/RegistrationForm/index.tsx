import React, { useState } from 'react';
import { User, AtSign, Phone, Lock } from 'lucide-react';
import { Input } from '../../common/Input';
import { registerUser } from '../../../services/auth';
import { SuccessModal } from '../SuccessModal';

interface RegistrationFormProps {
  onSuccess: () => void;
}

export function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.nickname || !formData.phone || !formData.password) {
      setError('جميع الحقول مطلوبة');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    // Validate phone number format
    const phoneRegex = /^(05)\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('رقم الجوال غير صحيح. يجب أن يبدأ بـ 05 ويتكون من 10 أرقام');
      return;
    }

    try {
      // Format phone number to international format
      const formattedPhone = `+966${formData.phone.substring(1)}`;
      
      await registerUser({
        username: formData.username,
        nickname: formData.nickname,
        phone: formattedPhone,
        password: formData.password
      });
      
      setWelcomeMessage(`مرحباً ${formData.nickname}! تم تسجيل حسابك بنجاح`);
      setShowSuccess(true);
      setTimeout(onSuccess, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء التسجيل');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        icon={<User className="w-5 h-5" />}
        label="اسم المستخدم"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        placeholder="أدخل اسم المستخدم"
        required
      />

      <Input
        icon={<AtSign className="w-5 h-5" />}
        label="الاسم التعريفي"
        value={formData.nickname}
        onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
        placeholder="الاسم الذي سيظهر للآخرين"
        required
      />

      <Input
        icon={<Phone className="w-5 h-5" />}
        label="رقم الجوال"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        placeholder="05XXXXXXXX"
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

      <Input
        icon={<Lock className="w-5 h-5" />}
        label="تأكيد كلمة المرور"
        type="password"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        placeholder="أعد كتابة كلمة المرور"
        required
      />

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      <button
        type="submit"
        className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg font-medium
                 hover:bg-primary-700 transition-colors duration-200"
      >
        إنشاء حساب
      </button>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message={welcomeMessage}
      />
    </form>
  );
}