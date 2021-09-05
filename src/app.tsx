import { CSSTransition, TransitionGroup } from '@bmp/preact-transition-group'
import { styled } from 'goober'
import { FunctionComponent, h } from 'preact'
import { useCallback, useMemo, useState } from 'preact/hooks'
import { getModules, sumModules } from './calc'
import Header from './header'
import Loader from './loader'
import Modules from './modules'
import { Asset } from './stats'
import Visualizer from './visualizer'

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

  .view-enter-done div[data-size] {
    transform: scale(1);

    &:hover {
      &::before {
        transform: translateY(0);
      }
    }
  }
`

const Wrapper = styled('div')`
  width: 100vw;
  height: 100vh;
  background-color: var(--primary);
`

const Container = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  overflow-y: auto;
`

const App: FunctionComponent = () => {
  const [data, setData] = useState(null)
  const handleLoad = useCallback((data: Object) => {
    setData(data)
    setSelected(-1)
  }, [])

  // KEEP
  if (data != null) {
    console.info('displaying data', data)
  }

  // assets derived from data
  const assets = useMemo<Asset[]>(
    () =>
      data == null
        ? []
        : data.assets
            .filter(({ name }) => name.endsWith('.js'))
            .sort(({ size: a }, { size: b }) => b - a),
    [data]
  )
  // total size of the assets
  const totalSize = assets.reduce(
    (prev, curr) => prev + sumModules(getModules(data.chunks, curr.chunks)),
    0
  )

  // currently selected asset view
  const [selected, setSelected] = useState(-2)

  const handleClick = () => {
    if (selected === -1) {
      setData(null)
      setSelected(-2)
    } else {
      setSelected(-1)
    }
  }

  return (
    <Wrapper>
      <Header onIconClick={handleClick} selected={selected} />
      <TransitionContainer selected={selected}>
        <CSSTransition
          key={data ? selected : -2}
          timeout={300}
          classNames='view'
        >
          <Container>
            {data ? (
              selected === -1 ? (
                <Visualizer
                  select={setSelected}
                  assets={assets}
                  chunks={data.chunks}
                  totalSize={totalSize}
                />
              ) : (
                <Modules asset={assets[selected]} chunks={data.chunks} />
              )
            ) : (
              <Loader onLoad={handleLoad} />
            )}
          </Container>
        </CSSTransition>
      </TransitionContainer>
    </Wrapper>
  )
}

export default App
