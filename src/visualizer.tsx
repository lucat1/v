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

  const [selected, setSelected] = useState(-1)

  return (
    <Ul>
      <Li>
        <p>vendor.js ~ 24kb</p>
        <Percentage>
          <div></div>
          <span>85%</span>
        </Percentage>
      </Li>
    </Ul>
  )
}

export default Visualizer
