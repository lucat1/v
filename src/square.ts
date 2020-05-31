import { styled } from 'goober'

export const Square = styled('div')`
  width: 50vw;
  margin: -0.625rem 0 2rem -0.625rem;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;

  & > * {
    margin: 0.625rem 0 0 0.625rem;
  }

  @media (max-width: 600px) {
    width: 95vw;
  }
`

export const Box = styled('div')`
  width: ${props => props['data-size'] + '%'};
  padding: ${props => props['data-size'] / 4 + '%'};
  min-width: 3.125rem;
  max-height: 6.25rem;
  background: #6a7de1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  opacity: 0;
  transform: scale(0);
`
