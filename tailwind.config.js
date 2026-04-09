/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Mandatory Dark Mode handling [cite: 85]
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark-first palette (deep navies/slates instead of pure black) [cite: 66]
        brand: {
          dark: '#0f172a',    // Background
          surface: '#1e293b', // Cards/Modals [cite: 71, 75]
          border: '#334155',  // Subtle borders
          accent: '#6366f1',  // Primary Indigo for buttons [cite: 70]
        },
        // Creative status colors [cite: 29]
        status: {
          pending: '#f59e0b',   // Amber [cite: 13]
          progress: '#3b82f6',  // Blue [cite: 14]
          completed: '#10b981', // Emerald [cite: 15]
          cancelled: '#ef4444', // Rose [cite: 16]
        }
      },
      backgroundImage: {
        // Gradient-based UI elements [cite: 65]
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
        'brand-gradient': 'linear-gradient(to right, #6366f1, #a855f7)',
      },
      fontSize: {
        // Consistent Typography Scale [cite: 76]
        'display': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        'heading': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'tiny': ['0.75rem', { lineHeight: '1rem', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
}