import { styled } from 'goober'
import { h } from 'preact'

export const Ul = styled('ul')`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style-type: none;
`

export const Li = styled('li')`
  cursor: pointer;
  padding: 1rem;
  margin: 1rem 0;
  user-select: none;
  background-color: var(--primary);
  transition: box-shadow 150ms;
  filter: brightness(95%);

  p {
    font-size: clamp(1rem, 0.8125rem + 0.8333vw, 1.25rem);
    margin: 0 0 0.5rem 0;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
      rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  }
`

export const Percentage = styled('div')`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-size: clamp(0.8rem, 0.725rem + 0.3333vw, 0.9rem);

  div {
    height: 0.625rem;
    background-color: var(--secondary);
  }

  span {
    margin-left: 0.25rem;
  }
`

export const List = ({ percentage, ...props }) => (
  <Li {...props}>
    <p>{props.children}</p>
    <Percentage>
      <div style={{ width: `${percentage}%` }} />
      <span>{percentage}%</span>
    </Percentage>
  </Li>
)
