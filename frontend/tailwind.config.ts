import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          primary: '#C9A84C',
          light:   '#E8D5A3',
          shimmer: '#F5E6B8',
          dim:     '#8B6914',
        },
        black: {
          deep:    '#0A0800',
          surface: '#1A1508',
          card:    '#120F03',
        },
        beige: {
          warm:  '#F5EDD6',
          light: '#FAF5E9',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)', 'serif'],
        label:   ['var(--font-label)', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config