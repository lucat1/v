import { styled } from 'goober'
import { h } from 'preact'
import { MouseEventHandler } from 'react'
import { ErrorText } from './typography'

const Holder = styled('div')`
  display: flex;
  justify-content: space-between;
  padding-top: 2.5rem;

  @media (max-width: 960px) {
    justify-content: center;
    padding-top: 1rem;

    div:last-child {
      width: 100%;
      animation-delay: 200ms;
    }
  }
`

const Square = styled('div')`
  width: 40%;
  display: grid;
  grid-gap: 1.5rem;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);

  div {
    opacity: 0;
    transform: scale(0);
    background: var(--secondary);
    box-shadow: 0px 4px 12px 1px rgba(0, 0, 0, 0.25);
    animation: appear 400ms ease-out forwards;
  }

  div:nth-child(1) {
    grid-area: 1 / 1;
    animation-delay: 750ms;
  }

  div:nth-child(2) {
    grid-column: 3 / span 2;
    animation-delay: 100ms;
  }

  div:nth-child(3) {
    grid-row: 2 / span 4;
    grid-column: span 2;
    animation-delay: 300ms;
  }

  div:nth-child(4) {
    grid-area: 2 / 3;
    animation-delay: 600ms;
  }

  div:nth-child(5) {
    grid-row: 3 / span 3;
    grid-column: 4;
    animation-delay: 450ms;
  }

  @media (max-width: 960px) {
    display: none;
  }
`

const Buttons = styled('div')`
  width: 40%;
  height: 45vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  opacity: 0;
  animation: appear 250ms ease-out 1000ms forwards;

  button:first-child {
    border: 0.25rem dashed var(--secondary);
    border-bottom: 0;
    border-top-left-radius: 1.875rem;
    border-top-right-radius: 1.875rem;
  }

  button:nth-child(2) {
    border: 0.25rem dashed var(--secondary);
  }

  button:last-child {
    border: 0.25rem dashed var(--secondary);
    border-top: 0;
    border-bottom-left-radius: 1.875rem;
    border-bottom-right-radius: 1.875rem;
  }
`

const Button = styled('button')`
  font-size: clamp(1rem, 0.625rem + 1.6667vw, 1.5rem);
  outline: none;
  cursor: pointer;
  padding: 2rem 0.5rem;
  background-color: var(--primary);
  transition: background-color 150ms;
  color: inherit;
  position: relative;

  &:hover {
    background-color: rgba(185, 166, 209, 0.4);
  }

  &:focus {
    background-color: rgba(185, 166, 209, 0.65);
  }
`

interface IProps {
  onUpload: MouseEventHandler<HTMLButtonElement>
  onLatestUpload: MouseEventHandler<HTMLButtonElement>
  onExampleUpload: MouseEventHandler<HTMLButtonElement>
  errorText: string
}

const Panels = ({
  onUpload,
  onLatestUpload,
  onExampleUpload,
  errorText
}: IProps) => (
  <Holder>
    <Square>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Square>
    <Buttons>
      <Button onClick={onUpload}>Upload a JSON file</Button>
      <Button onClick={onLatestUpload}>Check your latest upload</Button>
      <ErrorText>{errorText}</ErrorText>
      <Button onClick={onExampleUpload}>Show an example visualization</Button>
    </Buttons>
  </Holder>
)

export default Panels
