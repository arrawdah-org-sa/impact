import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ConfirmPopupProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmPopup({
  isOpen,
  title,
  message,
  confirmText = 'نعم',
  cancelText = 'إلغاء',
  onConfirm,
  onCancel
}: ConfirmPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to ensure the element is in the DOM before starting the animation
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
      // Wait for animation to complete before removing from DOM
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  const handleConfirm = () => {
    setIsVisible(false);
    setTimeout(onConfirm, 300);
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(onCancel, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300
                   ${isVisible ? 'opacity-100 animate-[fadeIn_0.3s]' : 'opacity-0 animate-[fadeOut_0.3s]'}`}
        onClick={handleCancel}
      />
      
      {/* Popup */}
      <div className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md
                      transform transition-all duration-300 ease-out
                      ${isVisible 
                        ? 'opacity-100 scale-100 translate-y-0 animate-[popIn_0.3s]' 
                        : 'opacity-0 scale-95 translate-y-4 animate-[popOut_0.3s]'}`}>
        {/* Close button */}
        <button
          onClick={handleCancel}
          className="absolute top-4 left-4 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400
                   transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {message}
          </p>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700
                       rounded-lg transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700
                       transform transition-all duration-200 hover:scale-105
                       focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}