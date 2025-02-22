import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    overflow-x: hidden;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.colors.background};
    background-attachment: fixed;
    background-size: cover;
    color: ${props => props.theme.colors.text};
    font-family: 'Roboto';

    a {
      text-decoration: none;
    }
  }

  #root {
    overflow-x: hidden;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`