import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

interface VerificationStepProps {
  phone: string;
  onVerified: (code: string) => void;
}

export function VerificationStep({ phone, onVerified }: VerificationStepProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !canResend) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown, canResend]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError('الرجاء إدخال الرمز المكون من 6 أرقام');
      return;
    }
    onVerified(code);
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    // Implement resend logic here
  };

  return (
    <div className="text-center">
      <Shield className="mx-auto h-12 w-12 text-primary-600 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">تأكيد رقم الجوال</h3>
      <p className="text-sm text-gray-600 mb-6">
        تم إرسال رمز التحقق إلى {phone}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center gap-2">
          {Array(6).fill(0).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={code[index] || ''}
              onChange={(e) => {
                const newCode = code.split('');
                newCode[index] = e.target.value.replace(/\D/g, '');
                setCode(newCode.join(''));
                
                // Auto-focus next input
                if (e.target.value && index < 5) {
                  const nextInput = e.target.parentElement?.nextElementSibling?.querySelector('input');
                  if (nextInput) nextInput.focus();
                }
              }}
              className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          ))}
        </div>
        
        {error && <p className="text-red-600 text-sm">{error}</p>}
        
        <button
          type="submit"
          className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg font-medium
                   hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                   transition-colors duration-200"
        >
          تأكيد
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-600">
        {canResend ? (
          <button
            onClick={handleResend}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            إعادة إرسال الرمز
          </button>
        ) : (
          <p>
            يمكنك إعادة إرسال الرمز بعد {countdown} ثانية
          </p>
        )}
      </div>
    </div>
  );
}