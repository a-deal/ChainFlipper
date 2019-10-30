import { createGlobalStyle } from "styled-components"

import rubik from "./fonts/rubik-regular.ttf"
import karla from "./fonts/karla-regular.ttf"
import { reset } from "./utils/reset"

export const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-display: fallback;
    font-family: 'Rubik Regular';
    font-weight: 400;
    src: url('${rubik}');
  }

  @font-face {
    font-display: fallback;
    font-family: 'Karla Regular';
    font-weight: 400;
    src: url('${karla}');
  }

  html { font-size: 24px; }

  body {
    background-color: beige;
    box-sizing: border-box;
    color: black;
    font-family: 'Karla Regular', sans-serif;
    font-weight: 400;
    line-height: 2;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Rubik Regular';
    font-weight: 400;
    line-height: 1.15;
    margin: 0;
  }

  h1 { font-size: 4.209em; }
  h2 { font-size: 3.157em; }
  h3 { font-size: 2.369em; }
  h4 { font-size: 1.777em; }
  h5 { font-size: 1.333em; }

  small,
  .text_small { font-size: 0.75em; }

  button { 
    background-color: inherit;
    border: none;
    cursor: pointer;
  }
`
