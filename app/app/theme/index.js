import React from 'react'

export const theme = {
  colors: {
    background: '#eeeeee',
    foreground: '#000000',
    highlight: '#FEE837',
  },
  fonts: {

  },
  sizes: {
    base: 6
  }
}

export const themes = {
  light: {
    background: '#eeeeee',
    foreground: '#000000',
    highlight: '#FEE837',
  },
}

export const ThemeContext = React.createContext(
  themes.dark // default value
)
