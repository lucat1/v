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
  transition: background-color 150ms;
  padding: 1rem;
  margin: 0.5rem 0;
  user-select: none;

  p {
    font-size: calc(1rem + 0.2vw);
    margin: 0 0 0.5rem 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 80%;
  }

  &:hover {
    background-color: #e3e3e3;
  }
`

export const Percentage = styled('div')`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-size: 0.85rem;

  div {
    height: 0.625rem;
    background: #6a7de1;
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
