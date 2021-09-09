import { styled } from 'goober'

export const Layout = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(8rem, 1fr));
  grid-gap: 1rem;
  grid-auto-flow: dense;
`

export const Square = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  background-color: var(--secondary);
  padding: 3rem 1rem;
  font-weight: 500;
  cursor: pointer;
  opacity: 0;
  transform: scale(0);
  transition: transform 250ms ${props => props['data-delay'] * 150}ms,
    opacity 450ms ${props => props['data-delay'] * 150}ms, box-shadow 150ms;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
      rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  }
`
