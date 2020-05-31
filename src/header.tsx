import { h, FunctionComponent } from 'preact'
import { styled } from 'goober'

const H = styled('header')`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 75%;
  height: 4rem;
  margin: 0 auto;
  user-select: none;
  transition: width 150ms;

  span {
    font-size: 2rem;
    margin-left: 1rem;
  }

  @media (max-width: 600px) {
    width: 95%;
  }
`

const BackIcon = styled('svg')`
  cursor: pointer;
  transition: background-color 150ms;
  margin-right: 1rem;

  &:hover {
    background-color: #e3e3e3;
  }
`

const Image = styled('img')`
  height: 3rem;
`

const Header = ({ onIconClick, selected }) => (
  <H>
    {selected !== -2 && (
      <BackIcon
        xmlns='http://www.w3.org/2000/svg'
        width='36'
        height='36'
        viewBox='0 0 36 36'
        onClick={onIconClick}
      >
        <path d='M0 0h36v36H0z' fill='none' />
        <path d='M30 16.5H11.74l8.38-8.38L18 6 6 18l12 12 2.12-2.12-8.38-8.38H30v-3z' />
      </BackIcon>
    )}

    <Image src='/webpack.svg' />
    <span>stats</span>
  </H>
)

export default Header
