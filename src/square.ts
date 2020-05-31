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
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  transform: scale(0);
  transition: transform 250ms;
  transition-delay: ${(props: { delay: number }) => props.delay * 150 + 'ms'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #8ed6fb;
    z-index: -1;
    transform: translateY(-100%);
    transition: transform 250ms;
  }
`
