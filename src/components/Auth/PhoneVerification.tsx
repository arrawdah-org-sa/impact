import React, { useState } from 'react';
import { Phone, Shield } from 'lucide-react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Input } from '../common/Input';

interface PhoneVerificationProps {
  onVerified: (phoneNumber: string) => void;
}

export function PhoneVerification({ onVerified }: PhoneVerificationProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const initializeRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        }
      });
    }
  };

  const handleSendCode = async () => {
    try {
      setError('');
      setLoading(true);

      // Validate phone number format
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+966${phoneNumber.replace(/^0/, '')}`;
      if (!/^\+966[0-9]{9}$/.test(formattedPhone)) {
        throw new Error('رقم الجوال غير صالح');
      }

      initializeRecaptcha();
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );

      setVerificationId(confirmation.verificationId);
      setStep('code');
    } catch (err) {
      console.error('Phone verification error:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء إرسال رمز التحقق');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      setError('');
      setLoading(true);

      if (verificationCode.length !== 6) {
        throw new Error('الرجاء إدخال الرمز المكون من 6 أرقام');
      }

      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+966${phoneNumber.replace(/^0/, '')}`;
      onVerified(formattedPhone);
    } catch (err) {
      console.error('Code verification error:', err);
      setError(err instanceof Error ? err.message : 'رمز التحقق غير صحيح');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      {step === 'phone' ? (
        <div className="space-y-4">
          <Input
            icon={<Phone className="w-5 h-5" />}
            label="رقم الجوال"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="05XXXXXXXX"
            disabled={loading}
          />

          <button
            onClick={handleSendCode}
            disabled={loading}
            className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg font-medium
                     hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'جارٍ الإرسال...' : 'إرسال رمز التحقق'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <Input
            icon={<Shield className="w-5 h-5" />}
            label="رمز التحقق"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="XXXXXX"
            maxLength={6}
            disabled={loading}
          />

          <button
            onClick={handleVerifyCode}
            disabled={loading}
            className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg font-medium
                     hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'جارٍ التحقق...' : 'تأكيد الرمز'}
          </button>

          <button
            onClick={() => setStep('phone')}
            disabled={loading}
            className="w-full py-2 text-primary-600 hover:text-primary-700 text-sm"
          >
            تغيير رقم الجوال
          </button>
        </div>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
}