import React from 'react';
import { Phone } from 'lucide-react';
import { CountryCodeSelect } from './CountryCodeSelect';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function PhoneInput({ value, onChange, error }: PhoneInputProps) {
  const [countryCode, setCountryCode] = React.useState('+966');
  const [number, setNumber] = React.useState('');

  React.useEffect(() => {
    onChange(`${countryCode}${number}`);
  }, [countryCode, number]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, '');
    setNumber(onlyNumbers);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        رقم الجوال
      </label>
      <div className="grid grid-cols-3 gap-2">
        <CountryCodeSelect
          value={countryCode}
          onChange={setCountryCode}
        />
        <div className="col-span-2 relative">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="tel"
            value={number}
            onChange={handleNumberChange}
            className={`block w-full pr-10 py-2 text-gray-900 placeholder-gray-400
                       border rounded-lg focus:ring-2 focus:ring-primary-500
                       ${error ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="5XXXXXXXX"
            maxLength={9}
            dir="ltr"
          />
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}