import React, { useState } from 'react';
import { AtSign, Lock, Phone, Shield } from 'lucide-react';
import { Input } from '../common/Input';
import { updateUserProfile } from '../../services/profile';
import { useAuth } from '../../hooks/useAuth';
import { PhoneVerification } from '../Auth/PhoneVerification';

export function ProfileForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nickname: user?.profile?.nickname || user?.displayName || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    try {
      await updateUserProfile({
        nickname: formData.nickname,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      setSuccess('تم تحديث المعلومات بنجاح');
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء تحديث المعلومات');
    }
  };

  if (showPhoneVerification) {
    return (
      <div className="max-w-md mx-auto">
        <PhoneVerification
          onVerified={(phoneNumber) => {
            setShowPhoneVerification(false);
            setSuccess('تم تأكيد رقم الجوال بنجاح');
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
        <Input
          icon={<AtSign className="w-5 h-5" />}
          label="الاسم التعريفي"
          value={formData.nickname}
          onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
          placeholder="الاسم الذي سيظهر للآخرين"
        />

        <div className="border-t dark:border-gray-700 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">رقم الجوال</h3>
            {user?.profile?.phoneVerified ? (
              <div className="flex items-center gap-2 text-green-500">
                <Shield className="w-5 h-5" />
                <span>تم التحقق</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowPhoneVerification(true)}
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                تأكيد رقم الجوال
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Phone className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">
              {user?.profile?.phone || 'لم يتم إضافة رقم جوال'}
            </span>
          </div>
        </div>

        <div className="border-t dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">تغيير كلمة المرور</h3>
          
          <div className="space-y-4">
            <Input
              icon={<Lock className="w-5 h-5" />}
              label="كلمة المرور الحالية"
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              placeholder="أدخل كلمة المرور الحالية"
            />

            <Input
              icon={<Lock className="w-5 h-5" />}
              label="كلمة المرور الجديدة"
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              placeholder="أدخل كلمة المرور الجديدة"
            />

            <Input
              icon={<Lock className="w-5 h-5" />}
              label="تأكيد كلمة المرور الجديدة"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="أعد كتابة كلمة المرور الجديدة"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        )}

        {success && (
          <p className="text-green-600 dark:text-green-400 text-sm">{success}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg font-medium
                   hover:bg-primary-700 transition-colors duration-200"
        >
          حفظ التغييرات
        </button>
      </form>
    </div>
  );
}