import { glob, setup } from 'goober'
import { h, render } from 'preact'
import 'preact/devtools'
import App from './app'

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
    font-size: 16px;
    font-family: 'Fira Code', monospace;
    margin: 0;
    height: 100vh;
		color: black;
		--primary: #e7edd6;
		--secondary: #b9a6d1;
  }

	@keyframes appear {
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
`

render(<App />, document.body)
