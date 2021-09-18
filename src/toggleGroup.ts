import { styled } from 'goober'

const ToggleGroup = styled('div')`
  margin-top: 1rem;
  display: flex;
  justify-content: space-evenly;
  flex: 1;
  align-items: center;
  opacity: 0;
  animation: appear 150ms ease-out 1200ms forwards;

  @media (max-width: 960px) {
    margin-top: 0;
    flex-direction: column;
    animation-delay: 300ms;
  }
`

export default ToggleGroup
