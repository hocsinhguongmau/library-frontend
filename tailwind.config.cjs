/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createThemes } = require('tw-colors')

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    createThemes({
      light: {
        primary: '#254476',
        secondary: '#74BE3E',
        accent: '#F0F0F0',
        background: '#fff',
        text: '#333',
        success: '#28a745',
        error: '#FF5733',
        warning: '#FFA500'
      },
      dark: {
        primary: '#5E97D1',
        secondary: '#8ED96A',
        accent: '#292929',
        background: '#1E1E1E',
        text: '#F0F0F0',
        success: '#28a745',
        error: '#ffc107',
        warning: '#dc3545'
      }
    })
  ]
}
