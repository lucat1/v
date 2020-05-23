import { h, Fragment, FunctionComponent } from 'preact'
import { useCallback, useState } from 'preact/hooks'

import Header from './header'
import Body from './body'
import Loader from './loader'
import Visualizer from './visualizer'

const App: FunctionComponent = () => {
  const [data, setData] = useState(null)
  const handleLoad = useCallback((data: Object) => {
    setData(data)
  }, [])

  return (
    <Fragment>
      <Header />
      <Body>
        {data ? <Visualizer data={data} /> : <Loader onLoad={handleLoad} />}
      </Body>
    </Fragment>
  )
}

export default App
