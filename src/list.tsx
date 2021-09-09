import { styled } from 'goober'
import { h } from 'preact'

export const Ul = styled('ul')`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style-type: none;
`

const Li = styled('li')`
  cursor: ${props => (props['data-interactive'] ? 'pointer' : 'initial')};
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
    box-shadow: ${props =>
      props['data-interactive']
        ? 'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px'
        : 'none'};
  }
`

const Percentage = styled('div')`
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

interface ListProps {
  percentage: string | number
  interactive: boolean
  [x: string]: any
}

export const List = ({ percentage, interactive, ...props }: ListProps) => (
  <Li data-interactive={interactive} {...props}>
    <p>{props.children}</p>
    <Percentage>
      <div style={{ width: `${percentage}%` }} />
      <span>{percentage}%</span>
    </Percentage>
  </Li>
)
