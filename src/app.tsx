import { h, Fragment, FunctionComponent } from 'preact'
import { useCallback, useState, useMemo } from 'preact/hooks'
import { styled, css } from 'goober'
import { TransitionGroup, CSSTransition } from '@bmp/preact-transition-group'

import Header from './header'
import Loader from './loader'
import Visualizer from './visualizer'
import { Asset } from './stats'
import Modules from './modules'

const absolute = css`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 4rem;
  overflow: hidden;

  .view-enter {
    transform: translateX(100%);
  }

  .view-enter-active {
    transform: translateX(0%);
    transition: transform 300ms ease-in-out;
  }

  .view-exit {
    transform: translateX(0%);
  }

  .view-exit-active {
    transform: translateX(-100%);
    transition: transform 300ms ease-in-out;
  }
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
  const totalSize = assets.reduce((prev, curr) => prev + curr.size, 0)

  // currently selected asset view
  const [selected, setSelected] = useState(-1)

  return (
    <Fragment>
      <Header />
      <TransitionGroup className={absolute}>
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
                  totalSize={totalSize}
                />
              ) : (
                <Modules asset={assets[selected]} data={data} />
              )
            ) : (
              <Loader onLoad={handleLoad} />
            )}
          </Container>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  )
}

export default App
