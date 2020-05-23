import { h, FunctionComponent } from 'preact'
import { styled } from 'goober'

const H = styled('header')`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 75%;
  height: 4rem;
  margin: 0 auto;

  span {
    font-size: 2rem;
    margin-left: 1rem;
  }
`

const Image = styled('img')`
  height: 3rem;
`

const Header: FunctionComponent = () => {
  return (
    <H>
      <Image src='/webpack.svg' />
      <span>stats</span>
    </H>
  )
}

export default Header
