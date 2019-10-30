import { css } from "styled-components"

export const reset = css`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  /**
   * A very simple reset that sits on top of Normalize.css.
   */

  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  blockquote,
  p,
  pre,
  dl,
  dd,
  ol,
  ul,
  figure,
  hr,
  fieldset,
  legend {
    margin: 0;
    padding: 0;
  }

  /**
   * Remove trailing margins from nested lists.
   */

  li > {
    ol,
    ul {
      margin-bottom: 0;
    }
  }

  /*
   * Remove the gap between audio, canvas, iframes,
   * images, videos and the bottom of their containers:
   * https://github.com/h5bp/html5-boilerplate/issues/440
   */

  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
  }
`
