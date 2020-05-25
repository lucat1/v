import { h, FunctionComponent } from 'preact'
import { useMemo, useState } from 'preact/hooks'

import { Stats, Asset } from './stats'
import { format } from './calc'
import Modules from './modules'
import { Percentage, Li, Ul } from './list'

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
  const totalSize = assets.reduce((prev, curr) => prev + curr.size, 0)

  const [selected, setSelected] = useState(-1)

  return (
    <Ul>
      {assets.map((asset, i) => {
        const percentage = ((asset.size / totalSize) * 100).toFixed(1)

        return (
          <Li key={i}>
            <p>
              {asset.name} ~ {format(asset.size)}
            </p>
            <Percentage>
              <div style={{ width: `${percentage}%` }} />
              <span>{percentage}%</span>
            </Percentage>
          </Li>
        )
      })}
    </Ul>
  )
}

export default Visualizer
