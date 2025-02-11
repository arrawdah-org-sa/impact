import React from 'react';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, initialMode = 'register' }: AuthModalProps) {
  const [mode, setMode] = React.useState(initialMode);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            {mode === 'login' ? 'تسجيل الدخول' : 'انضمّ اليوم'}
          </h2>

          {mode === 'login' ? (
            <LoginForm onSuccess={onClose} />
          ) : (
            <RegistrationForm onSuccess={onClose} />
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              {mode === 'login' 
                ? 'ليس لديك حساب؟ سجل الآن'
                : 'لديك حساب؟ سجل دخولك'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}