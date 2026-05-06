// Tailwind v4 uses CSS-based configuration via @theme in globals.css
// This file is kept for IDE type-checking compatibility only.
// All actual theme tokens are defined in app/globals.css under @theme {}
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
}

export default config
