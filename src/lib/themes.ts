import { type Theme } from '../types/theme';

export const themes: Record<string, Theme> = {
  light: {
    name: 'فاتح',
    colors: {
      background: {
        primary: 'bg-white',
        secondary: 'bg-gray-50',
        tertiary: 'bg-gray-100'
      },
      text: {
        primary: 'text-gray-900',
        secondary: 'text-gray-700',
        tertiary: 'text-gray-500'
      },
      accent: {
        primary: 'bg-primary-500 text-white',
        secondary: 'bg-primary-100 text-primary-900',
        hover: 'hover:bg-primary-600'
      },
      border: 'border-gray-200',
      shadow: 'shadow-lg shadow-gray-200/50'
    }
  },
  dark: {
    name: 'داكن',
    colors: {
      background: {
        primary: 'bg-gray-900',
        secondary: 'bg-gray-800',
        tertiary: 'bg-gray-700'
      },
      text: {
        primary: 'text-white',
        secondary: 'text-gray-300',
        tertiary: 'text-gray-400'
      },
      accent: {
        primary: 'bg-primary-400 text-gray-900',
        secondary: 'bg-gray-700 text-primary-400',
        hover: 'hover:bg-primary-300'
      },
      border: 'border-gray-700',
      shadow: 'shadow-lg shadow-black/50'
    }
  },
  sunset: {
    name: 'غروب',
    colors: {
      background: {
        primary: 'bg-sunset-200', // F29F58
        secondary: 'bg-sunset-300', // AB4459
        tertiary: 'bg-sunset-500' // 441752
      },
      text: {
        primary: 'text-sunset-700', // 1B1833
        secondary: 'text-sunset-500', // 441752
        tertiary: 'text-sunset-300' // AB4459
      },
      accent: {
        primary: 'bg-sunset-300 text-white', // AB4459
        secondary: 'bg-sunset-200 text-sunset-700', // F29F58 on 1B1833
        hover: 'hover:bg-sunset-400' // Darker version of AB4459
      },
      border: 'border-sunset-500', // 441752
      shadow: 'shadow-lg shadow-sunset-700/20' // 1B1833 with opacity
    }
  }
};