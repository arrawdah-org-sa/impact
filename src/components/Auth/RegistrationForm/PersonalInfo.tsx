import React, { useState } from 'react';
import { User, AtSign } from 'lucide-react';
import { Input } from '../../common/Input';
import { PhoneInput } from './PhoneInput';
import { validateName, validatePhone, validateUsername } from '../../../utils/validation';
import type { RegistrationData } from '../../../types/auth';

interface PersonalInfoProps {
  onSubmit: (data: RegistrationData) => void;
}

export function PersonalInfo({ onSubmit }: PersonalInfoProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    phone: '',
    username: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationData, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      firstName: validateName(formData.firstName),
      lastName: validateName(formData.lastName),
      phone: validatePhone(formData.phone),
      username: validateUsername(formData.username)
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          icon={<User className="w-5 h-5" />}
          label="الاسم الأول"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          error={errors.firstName}
          placeholder="الاسم الأول"
          required
        />
        <Input
          icon={<User className="w-5 h-5" />}
          label="الاسم الأخير"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          error={errors.lastName}
          placeholder="الاسم الأخير"
          required
        />
      </div>

      <PhoneInput
        value={formData.phone}
        onChange={(value) => setFormData({ ...formData, phone: value })}
        error={errors.phone}
      />

      <Input
        icon={<AtSign className="w-5 h-5" />}
        label="معرف المستخدم"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        error={errors.username}
        placeholder="4-12 حرف أو رقم"
        required
      />

      <button
        type="submit"
        className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg font-medium
                 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                 transition-colors duration-200"
      >
        إنشاء الحساب
      </button>
    </form>
  );
}