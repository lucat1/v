import { TransitionGroup } from '@bmp/preact-transition-group'
import { styled } from 'goober'

const TransitionContainer = styled(TransitionGroup)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 5rem;
  overflow: hidden;

  .view-enter {
    transform: ${(props: { selected: number }) =>
      props.selected >= 0 ? 'translateX(-100%)' : 'translateX(100%)'};
  }

  .view-enter-active {
    transform: translateX(0%);
    transition: transform 300ms ease-in-out;
  }

  .view-exit {
    transform: translateX(0%);
  }

  .view-exit-active {
    transform: ${(props: { selected: number }) =>
      props.selected >= 0 ? 'translateX(100%)' : 'translateX(-100%)'};
    transition: transform 300ms ease-in-out;
  }

  .view-enter-done div[data-delay] {
    opacity: 1;
    transform: scale(1);
  }
`

export default TransitionContainer
