import { styled } from 'goober'

const Button = styled('button')`
  height: 3.5rem;
  align-self: stretch;
  font-size: calc(0.6rem + 1vw);
  cursor: pointer;
  border: none;
  outline: none;
  padding: 0;
  background-color: #f2f1f1;
  border-top: 2px dashed gray;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;

  &[disabled] {
    cursor: default;
  }
`

export default Button
