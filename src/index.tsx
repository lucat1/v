import 'preact/debug'
import { render, h } from 'preact'

import App from './app'

import { setup, glob } from 'goober'
setup(h)

glob`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  body {
    font-size: calc(1em + .1vw);
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    margin: 0;
  }
`

render(<App />, document.body)
