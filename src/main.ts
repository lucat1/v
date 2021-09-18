import { styled } from 'goober'

export default styled('main')`
  width: 75%;
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  transition: width 150ms;

  @media (max-width: 600px) {
    width: 100%;
    padding: 0 8px;
  }
`
