import { styled } from 'goober'

export const Title = styled('h1')`
  font-size: clamp(1.5rem, 0.375rem + 5vw, 3rem);
  text-align: center;
  margin: 2rem 0;
  font-weight: 500;
`

export const Subtitle = styled('h4')`
  font-size: clamp(0.875rem, 0.6875rem + 0.8333vw, 1.125rem);
  text-align: center;
  margin: 0 0 2rem 0;
  font-weight: 400;
`

export const HomeTitle = styled('h1')`
  font-size: clamp(1rem, 0.625rem + 1.6667vw, 1.5rem);
  text-align: center;
  margin: 0;
  padding: 1.5rem 0;
`

export const ErrorText = styled('span')`
  font-size: clamp(0.8rem, 0.725rem + 0.3333vw, 0.9rem);
  color: #f81d1d;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`
