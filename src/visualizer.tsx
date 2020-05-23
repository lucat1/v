import { h, FunctionComponent } from 'preact'
import { useMemo, useState } from 'preact/hooks'

import { Stats, Asset } from './stats'
import { format } from './calc'
import Modules from './modules'

interface VisualizerProps {
  data: Stats
}

const Visualizer: FunctionComponent<VisualizerProps> = ({ data }) => {
  // KEEP
  console.info('displaying data', data)

  const assets = useMemo<Asset[]>(
    () =>
      data.assets
        .filter(({ name }) => name.endsWith('.js'))
        .sort(({ size: a }, { size: b }) => b - a),
    [data.assets]
  )

  const [selected, setSelected] = useState(-1)

  return (
    <div>
      <ul>
        {assets.map((asset, i) => {
          console.log(asset.chunks.length)
          return (
            <li onClick={() => setSelected(i)}>
              {asset.name} -> {format(asset.size)}
            </li>
          )
        })}
      </ul>

      {selected !== -1 && <Modules data={data} asset={assets[selected]} />}
    </div>
  )
}

export default Visualizer
