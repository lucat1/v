import { h, FunctionComponent } from 'preact'
import { useMemo } from 'preact/hooks'

import { Stats, Asset } from './stats'
import { format, size } from './calc'

interface VisualizerProps {
  data: Stats
}

const Visualizer: FunctionComponent<VisualizerProps> = ({ data }) => {
  const assets = useMemo<Asset[]>(() => {
    return data.assets
      .filter(({ name }) => name.endsWith('.js'))
      .sort(({ size: a }, { size: b }) => b - a)
  }, [data.assets])

  return (
    <div>
      <ul>
        {assets.map(asset => (
          <li>
            {asset.name} -> {format(asset.size)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Visualizer
