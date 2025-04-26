import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    font-family: 'Arial', sans-serif;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    background: none;
    border: solid gray 2px;
    padding: 8px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
