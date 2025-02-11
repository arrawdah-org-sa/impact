import React from 'react';
import { ChevronDown } from 'lucide-react';

interface CountryCode {
  code: string;
  name: string;
  flag: string;
}

const countryCodes: CountryCode[] = [
  { code: '+966', name: 'السعودية', flag: '🇸🇦' },
  { code: '+971', name: 'الإمارات', flag: '🇦🇪' },
  { code: '+974', name: 'قطر', flag: '🇶🇦' },
  { code: '+973', name: 'البحرين', flag: '🇧🇭' },
  { code: '+965', name: 'الكويت', flag: '🇰🇼' },
  { code: '+968', name: 'عمان', flag: '🇴🇲' },
];

interface CountryCodeSelectProps {
  value: string;
  onChange: (code: string) => void;
}

export function CountryCodeSelect({ value, onChange }: CountryCodeSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg
                   focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                   bg-white text-gray-900"
        dir="ltr"
      >
        {countryCodes.map((country) => (
          <option key={country.code} value={country.code}>
            {country.flag} {country.code} {country.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        <ChevronDown className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}