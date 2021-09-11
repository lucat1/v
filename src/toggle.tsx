import { styled } from 'goober'
import { h } from 'preact'

const Wrapper = styled('div')`
  width: min-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 0;

  & > span {
    font-size: clamp(0.8125rem, 0.5781rem + 1.0417vw, 1.125rem);
  }
`

const Button = styled('button')`
  outline: none;
  border: none;
  background-color: var(--secondary);
  border-radius: 9999px;
  padding: 1rem;
  margin-top: 0.5rem;
  position: relative;
  cursor: pointer;
  color: inherit;

  span {
    margin: 0 1.5rem;
    z-index: 2;
    position: relative;
    font-size: clamp(0.8125rem, 0.6719rem + 0.625vw, 1rem);
  }

  &:before {
    content: '';
    position: absolute;
    z-index: 1;
    width: 57.5%;
    height: 100%;
    background-color: var(--primary);
    top: 0;
    left: 0;
    border-radius: 999px;
    box-shadow: 0px 4px 14px 2px rgba(0, 0, 0, 0.25);
    transition: transform 150ms, filter 150ms;
    transform: ${props =>
      props['data-checked'] ? 'translateX(75%)' : 'translateX(0)'};
  }

  &:hover {
    &:before {
      filter: brightness(92.5%);
    }
  }

  &:focus {
    &:before {
      filter: brightness(87.5%);
    }
  }
`

interface IProps {
  content: string[]
  checked: boolean
  onChange: any
}

const Toggle = ({ content, checked, onChange }: IProps) => (
  <Wrapper>
    <span>{content[0]}</span>
    <Button data-checked={checked} onClick={onChange}>
      <span>{content[1]}</span>
      <span>{content[2]}</span>
    </Button>
  </Wrapper>
)

export default Toggle
