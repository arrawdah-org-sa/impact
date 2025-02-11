import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Phone, AtSign } from 'lucide-react';
import { validateUsername, validatePhone, validateIdentifier } from '../../utils/validation';
import { createUserProfile } from '../../services/auth';
import { SuccessModal } from './SuccessModal';
import { InputField } from '../common/InputField';

export function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    identifier: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    phone: '',
    identifier: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate all fields
    const newErrors = {
      username: validateUsername(formData.username),
      phone: validatePhone(formData.phone),
      identifier: validateIdentifier(formData.identifier)
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      setIsLoading(false);
      return;
    }

    try {
      await createUserProfile(formData);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/self-impact');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          ابدأ رحلة التأثير الإيجابي
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            icon={<UserPlus className="w-5 h-5 text-gray-400" />}
            label="اسم المستخدم"
            name="username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            error={errors.username}
            placeholder="أدخل اسمك (3-20 حرفاً)"
          />

          <InputField
            icon={<Phone className="w-5 h-5 text-gray-400" />}
            label="رقم الجوال"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={errors.phone}
            placeholder="05xxxxxxxx"
          />

          <InputField
            icon={<AtSign className="w-5 h-5 text-gray-400" />}
            label="المعرف الخاص"
            name="identifier"
            value={formData.identifier}
            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
            error={errors.identifier}
            placeholder="أدخل معرفك (8-15 حرفاً)"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 bg-primary-600 text-white rounded-lg
                       font-medium transition-all duration-200
                       ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-700'}
                       focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
          >
            {isLoading ? 'جارٍ التسجيل...' : 'تسجيل'}
          </button>
        </form>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="تم التسجيل بنجاح! جارٍ توجيهك إلى الصفحة الرئيسية..."
      />
    </div>
  );
}