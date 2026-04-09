/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Mandatory Dark Mode handling [cite: 85]
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
       
        brand: {
          dark: 'rgb(var(--brand-dark) / <alpha-value>)',
          surface: 'rgb(var(--brand-surface) / <alpha-value>)',
          border: 'rgb(var(--brand-border) / <alpha-value>)',
          accent: '#6366f1',
          primary: 'rgb(var(--text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
        },
       
        status: {
          pending: '#f59e0b',
          progress: '#3b82f6',
          completed: '#10b981',
          cancelled: '#ef4444',
        }
      },
      backgroundImage: {
       
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
        'brand-gradient': 'linear-gradient(to right, #6366f1, #a855f7)',
      },
      fontSize: {
    
        'display': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        'heading': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'tiny': ['0.75rem', { lineHeight: '1rem', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
}