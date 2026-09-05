/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: '#FFFFFF',        // Crisp Pure White: Foundational page background
        'canvas-subtle': '#FAF9F6', // Subtle Warm Backdrop: Quiet surfaces
        rose: {
          DEFAULT: '#F43F5E',     // Radiant Petal Rose: Primary actions, vibrant milestones
          dark: '#BE123C',        // Deep Rose: High-contrast headings and active states
          light: '#FFE4E6',       // Dewy Rose Blush: Soft, luminous card washes
        },
        sage: {
          DEFAULT: '#10B981',     // Fresh Spring Sage / Mint: Vitals, growth, health
          dark: '#047857',        // Deep Botanical Green: Safe-state text & borders
          light: '#D1FAE5',       // Crisp Dewy Mint: Fresh clinical washes
        },
        peach: {
          DEFAULT: '#F59E0B',     // Sunlit Amber Peach: Affirmations & warmth
          dark: '#B45309',        // Rich Warm Honey: Star ratings & badges
          light: '#FEF3C7',       // Luminous Sunlit Wash: Daily tip backgrounds
        },
        periwinkle: {
          DEFAULT: '#6366F1',     // Radiant Periwinkle / Iris: Waves, telemetry, audio
          dark: '#4338CA',        // Deep Indigo
          light: '#EEF2FF',       // Crisp Periwinkle Wash
        },
        ink: {
          DEFAULT: '#18181B',     // Deep Crisp Espresso Charcoal: High contrast readability
          muted: '#52525B',       // Clear readable captions & body
          faint: '#D4D4D8',       // Subtle structural borders
        }
      },
      fontFamily: {
        heading: ['Nunito', 'sans-serif'],
        body: ['Quicksand', 'sans-serif'],
      },
      borderRadius: {
        'card': '24px',
        'sheet': '32px',
      },
      boxShadow: {
        'warm': '0 10px 30px -4px rgba(244, 63, 94, 0.22)',
        'soft': '0 4px 20px -2px rgba(24, 24, 27, 0.06)',
        'card': '0 2px 12px -2px rgba(24, 24, 27, 0.04), 0 8px 24px -4px rgba(24, 24, 27, 0.04)',
      }
    },
  },
  plugins: [],
};
