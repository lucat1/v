import { styled } from 'goober'
import { h } from 'preact'

const Wrapper = styled('div')`
  width: 35%;

  div {
    height: 1.125rem;
    background-color: var(--secondary);
    margin: 0.5rem 0;
    opacity: 0;
    transform: scale(0);
    transform-origin: left;
    animation: appear 250ms ease-out forwards;
  }

  @media (min-width: 960px) {
    display: none;
  }
`

const Container = props => (
  <Wrapper {...props}>
    <div></div>
    <div style={{ width: '75%' }}></div>
    <div style={{ width: '50%' }}></div>
  </Wrapper>
)

const Lines = () => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Container />
    <Container style={{ transform: 'rotate(180deg)' }} />
  </div>
)

export default Lines
