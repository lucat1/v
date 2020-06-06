import { styled } from 'goober'

export const UploadContainer = styled('div')`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  svg {
    z-index: -1;
    transition: fill 200ms;
  }
`
