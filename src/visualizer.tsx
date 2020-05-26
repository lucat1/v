import { h, FunctionComponent } from 'preact'

import Body from './body'
import { Asset } from './stats'
import { format } from './calc'
import { Percentage, Li, Ul } from './list'
import { Title } from './typography'

interface VisualizerProps {
  assets: Asset[]
  totalSize: number
  select: (i: number) => void
}

const Visualizer: FunctionComponent<VisualizerProps> = ({
  assets,
  totalSize,
  select
}) => (
  <Body>
    <Title>
      Click on a graph to display its file contents and relative sizes
    </Title>
    <Ul>
      {assets.map((asset, i) => {
        const percentage = ((asset.size / totalSize) * 100).toFixed(1)

        return (
          <Li key={i} onClick={() => select(i)}>
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
  </Body>
)

export default Visualizer
