import { styled } from 'goober'

export const Ul = styled('ul')`
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
    margin: 0;
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