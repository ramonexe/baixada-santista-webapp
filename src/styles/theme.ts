export const theme = {
  colors: {
    primary: '#FF6347', // Tomate
    secondary: '#4682B4', // Azul aço
    background: '#F5F5F5', // Branco fumaça
    backgroundDark: '#E5E5E5', // Cinza claro
    text: '#333333', // Cinza escuro
  },
} as const

export type Theme = typeof theme