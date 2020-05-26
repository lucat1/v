import { styled } from 'goober'

export default styled('main')`
  min-height: calc(100% - 4rem);
  width: 75%;
  max-width: 60rem;
  position: relative;
  margin: 0 auto;
  transition: width 150ms;

  @media (max-width: 600px) {
    width: 95%;
  }
`
