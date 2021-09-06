import { styled } from 'goober'

export const UploadText = styled('h2')`
  font-size: calc(1rem + 1vw);
  pointer-events: none;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  text-align: center;
  transition: color 200ms;
`

export const Title = styled('h1')`
  font-size: calc(1rem + 1vw);
  font-weight: 500;
  padding: 1rem;
  background-color: white;
`

export const Subtitle = styled('h4')`
  margin: 0 0 2rem 0;
  font-weight: 400;
`

export const HomeText = styled('h1')`
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
