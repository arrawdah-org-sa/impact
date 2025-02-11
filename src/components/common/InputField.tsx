import React from 'react';

interface InputFieldProps {
  icon: React.ReactNode;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}

export function InputField({
  icon,
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = 'text'
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`block w-full pr-10 py-2 text-gray-900 placeholder-gray-400
                     border rounded-lg focus:ring-2 focus:ring-primary-500
                     ${error ? 'border-red-300' : 'border-gray-300'}`}
          placeholder={placeholder}
          dir="rtl"
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}