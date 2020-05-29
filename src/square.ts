import { styled } from 'goober'

export const Square = styled('div')`
  width: calc(50vw + 0.625rem);
  height: 50vh;
  margin: -0.625rem 0 0 -0.625rem;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;

  & > * {
    margin: 0.625rem 0 0 0.625rem;
  }

  @media (max-width: 600px) {
    width: calc(95vw + 0.625rem);
  }
`

export const Box = styled('div')`
  width: ${props => props.size + '%'};
  height: ${props => props.size + '%'};
  background: #6a7de1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  transition: transform 150ms;

  &:hover {
    transform: scale(1.1);
  }
`
