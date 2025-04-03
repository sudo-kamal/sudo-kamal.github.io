/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // If using App Router
  ],
  theme: {
    extend: {
      colors: {
        // Light Theme Palette
        'primary-bg': '#ffffff',       // White background
        'secondary-bg': '#f8f9fa',     // Very light gray for off-white sections/cards
        'accent-primary': '#007bff',    // Vibrant Blue (from logo)
        'accent-secondary': '#e9ecef', // Light gray for borders, subtle backgrounds
        'text-heading': '#212529',     // Near-black for headings
        'text-body': '#495057',        // Dark gray for body text
        'text-muted': '#6c757d',       // Lighter gray for muted text
        'text-on-accent': '#ffffff',   // White text for use on primary accent backgrounds
      },
      backgroundImage: {
        // Keep generic gradient utils, but we might not use them
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // Update glows or remove if not fitting the light theme
      boxShadow: {
        'glow-primary': '0 0 15px rgba(0, 123, 255, 0.3)', // More subtle glow
        'card-shadow': '0 4px 15px rgba(0, 0, 0, 0.07)', // Standard card shadow
      }
    },
  },
  plugins: [],
} 