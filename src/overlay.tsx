import { styled } from 'goober'
import { h } from 'preact'

const Outer = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: var(--secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props['data-dragging'] ? 0.85 : 0)};
  visibility: ${props => (props['data-dragging'] ? 'visible' : 'hidden')};
  transition: opacity 200ms ease-out
    ${props => (!props['data-dragging'] ? ', visibility 0s linear 200ms' : '')};
`

const Inner = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  height: 90%;
  border: 0.25rem dashed currentColor;
  font-size: clamp(1.5rem, 0.375rem + 5vw, 3rem);
  fill: currentColor;
  pointer-events: none;

  svg {
    margin-bottom: 1.5rem;
  }
`

const Overlay = props => (
  <Outer {...props}>
    <Inner>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='64'
        height='64'
        viewBox='0 0 48 48'
      >
        <path d='M12 4C9.79 4 8.02 5.79 8.02 8L8 40c0 2.21 1.77 4 3.98 4H36c2.21 0 4-1.79 4-4V16L28 4H12zm14 14V7l11 11H26z' />
        <path d='M0 0h48v48H0z' fill='none' />
      </svg>
      Drop it!
    </Inner>
  </Outer>
)

export default Overlay
