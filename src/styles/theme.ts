export const theme = {
  colors: {
    primary: '#FF6347',
    secondary: '#4682B4',
    background: '#F5FAFF',
    backgroundDark: '#E5E5E5',
    text: '#333333',
    disabled: '#D3D3D3',
  },
} as const

export type Theme = typeof theme