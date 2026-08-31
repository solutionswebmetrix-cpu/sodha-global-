/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Earthy brown ramp
        earth: {
          50: '#faf7f2',
          100: '#f3ece1',
          200: '#e6d7c1',
          300: '#d4ba97',
          400: '#bf976b',
          500: '#a87a4d',
          600: '#8a6240',
          700: '#6e4d34',
          800: '#553b29',
          900: '#3d2b1f',
          950: '#241712',
        },
        // Warm ivory / sand
        ivory: {
          50: '#fdfbf7',
          100: '#faf5ec',
          200: '#f4ebd9',
          300: '#ecdcc0',
          400: '#e0c9a3',
          500: '#d2b585',
        },
        // Muted saffron
        saffron: {
          50: '#fef9ed',
          100: '#fcedcb',
          200: '#f9d98e',
          300: '#f5c152',
          400: '#e9a526',
          500: '#d4880f',
          600: '#b56a06',
          700: '#904f08',
          800: '#763e0c',
          900: '#64340d',
        },
        // Copper / gold accent
        copper: {
          50: '#fdf6f0',
          100: '#faead9',
          200: '#f4d0ad',
          300: '#ecb078',
          400: '#e48f4c',
          500: '#d97330',
          600: '#c75a26',
          700: '#a64521',
          800: '#883921',
          900: '#703020',
        },
        // Dark charcoal
        charcoal: {
          50: '#f6f6f5',
          100: '#e7e7e4',
          200: '#d1d1cc',
          300: '#ababa3',
          400: '#84847a',
          500: '#6a6a60',
          600: '#555550',
          700: '#464641',
          800: '#3d3d3a',
          900: '#2a2a28',
          950: '#1c1c1a',
        },
        // Success / fresh green
        sage: {
          50: '#f5f7f0',
          100: '#e8eedd',
          200: '#cfdcb6',
          300: '#aac585',
          400: '#8aab5a',
          500: '#6e9138',
          600: '#56732b',
          700: '#445a25',
          800: '#384921',
          900: '#313f20',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-down': 'slideDown 0.3s ease forwards',
        'slide-up': 'slideUp 0.3s ease forwards',
        'shimmer': 'shimmer 1.8s infinite linear',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
