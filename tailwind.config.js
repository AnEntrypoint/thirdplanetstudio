/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'crash-in': {
          '0%': {
            transform: 'translate(-200%, -100%) rotate(0deg)',
            opacity: 1,
          },
          '40%': {
            transform: 'translate(-50%, 0%) rotate(340deg)',
            opacity: 1,
          },
          '40.1%': {
            transform: 'translate(calc(-50% - 8px), -6px) rotate(342deg)',
            opacity: 1,
          },
          '40.3%': {
            transform: 'translate(calc(-50% + 8px), 6px) rotate(344deg)',
            opacity: 1,
          },
          '40.5%': {
            transform: 'translate(calc(-50% - 8px), -4px) rotate(346deg)',
            opacity: 1,
          },
          '40.7%': {
            transform: 'translate(calc(-50% + 8px), 4px) rotate(348deg)',
            opacity: 1,
          },
          '40.9%': {
            transform: 'translate(calc(-50% - 6px), -2px) rotate(350deg)',
            opacity: 1,
          },
          '41.1%': {
            transform: 'translate(calc(-50% + 6px), 2px) rotate(352deg)',
            opacity: 1,
          },
          '100%': {
            transform: 'translate(-50%, 0%) rotate(370deg)',
            opacity: 1,
          },
        },
        'ripple': {
          '0%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(4)',
            opacity: '0',
          },
        },
        'flash': {
          '0%': {
            opacity: '0',
          },
          '10%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        'shake': {
          '0%, 100%': {
            transform: 'translate(0, 0) rotate(0deg)',
          },
          '10%': {
            transform: 'translate(-12px, -12px) rotate(-1deg)',
          },
          '20%': {
            transform: 'translate(12px, 12px) rotate(2deg)',
          },
          '30%': {
            transform: 'translate(-12px, 8px) rotate(-2deg)',
          },
          '40%': {
            transform: 'translate(12px, -8px) rotate(1deg)',
          },
          '50%': {
            transform: 'translate(-8px, 12px) rotate(-1deg)',
          },
          '60%': {
            transform: 'translate(8px, -12px) rotate(2deg)',
          },
          '70%': {
            transform: 'translate(-12px, -8px) rotate(-2deg)',
          },
          '80%': {
            transform: 'translate(12px, 8px) rotate(1deg)',
          },
          '90%': {
            transform: 'translate(-8px, -12px) rotate(-1deg)',
          }
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'crash': 'crash-in 0.4s cubic-bezier(0.19, 1, 0.22, 1) both',
        'ripple': 'ripple 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'flash': 'flash 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'shake': 'shake 0.8s cubic-bezier(.36,.07,.19,.97) both',
      },
      utilities: {
        '.animation-delay-100': {
          'animation-delay': '100ms',
        },
        '.animation-delay-200': {
          'animation-delay': '200ms',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function({ addUtilities }) {
      addUtilities({
        '.animation-delay-100': {
          'animation-delay': '100ms',
        },
        '.animation-delay-200': {
          'animation-delay': '200ms',
        },
      });
    }),
  ],
};
