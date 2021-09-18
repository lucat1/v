import { styled } from 'goober'
import { h } from 'preact'

const Nav = styled('header')`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 75%;
  height: 5rem;
  margin: 0 auto;
  user-select: none;
  transition: width 150ms;

  span {
    font-size: clamp(1.5rem, 0.75rem + 3.3333vw, 2.5rem);
    margin-left: 1rem;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0 0.5rem;
  }
`

const BackIcon = styled('svg')`
  cursor: pointer;
  transition: filter 150ms;
  margin-right: 1rem;
  border-radius: 50%;
  padding: 0.5rem;
  color: inherit;
  fill: currentColor;
  background-color: var(--primary);

  &:hover {
    filter: brightness(90%);
  }
`

const Header = ({ onIconClick, selected }) => (
  <Nav>
    {selected !== -2 && (
      <BackIcon
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        viewBox='0 0 36 36'
        onClick={onIconClick}
      >
        <path d='M0 0h36v36H0z' fill='none' />
        <path d='M30 16.5H11.74l8.38-8.38L18 6 6 18l12 12 2.12-2.12-8.38-8.38H30v-3z' />
      </BackIcon>
    )}

    <img style={{ height: '3rem' }} src='/webpack.svg' />
    <span>webpack stats</span>
  </Nav>
)

export default Header
