import { h, render } from 'preact'
import 'preact/devtools'

import App from './app'

import { setup, glob } from 'goober'
setup(h)

glob`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-size: calc(1rem + .1vw);
    font-family: 'Fira Code', monospace;
    margin: 0;
    height: 100vh;
  }
`

render(<App />, document.body)
