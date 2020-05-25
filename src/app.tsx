import { h, Fragment, FunctionComponent } from 'preact'
import { useCallback, useState, useMemo } from 'preact/hooks'

import Header from './header'
import Body from './body'
import Loader from './loader'
import Visualizer from './visualizer'
import { Asset } from './stats'
import Modules from './modules'

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
      <Body>
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
      </Body>
    </Fragment>
  )
}

export default App
