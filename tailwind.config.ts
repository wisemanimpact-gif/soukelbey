import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        red: {
          brand: '#C41E1E',
          hover: '#A81818',
        },
        gold: {
          brand: '#C4931A',
          light: '#E8B84B',
        },
        ink: {
          DEFAULT: '#0F0A06',
          2: '#4A3828',
          3: '#9A8878',
        },
        sand: {
          DEFAULT: '#F4EDD8',
          2: '#EDE0C4',
        },
        bg: '#FAFAF8',
      },
    },
  },
  plugins: [],
}
export default config
