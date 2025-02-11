/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#F7EFD6',  // Lighter shade of #EFB036
          100: '#F3E5B8', // Light shade of #EFB036
          200: '#F1D88A',
          300: '#EFC55C',
          400: '#EFB036', // Main brand color
          500: '#3B6790', // Secondary color
          600: '#23486A', // Darker blue
          700: '#4C7B8B', // Accent color
          800: '#1B3850', // Darker shade of #23486A
          900: '#132A3D', // Darkest shade
          950: '#0C1B28',
        },
        sunset: {
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#F29F58',
          300: '#AB4459',
          400: '#8B3656',
          500: '#441752',
          600: '#331145',
          700: '#1B1833',
          800: '#13111F',
          900: '#0C0A14',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'marquee': 'marquee 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};