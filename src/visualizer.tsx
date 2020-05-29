import { h, FunctionComponent } from 'preact'

import Body from './body'
import { Asset, Chunk } from './stats'
import { format, sumModules, getModules } from './calc'
import { Percentage, Li, Ul } from './list'
import { Title } from './typography'

interface VisualizerProps {
  assets: Asset[]
  chunks: Chunk[]
  totalSize: number
  select: (i: number) => void
}

const Visualizer: FunctionComponent<VisualizerProps> = ({
  assets,
  chunks,
  totalSize,
  select
}) => (
  <Body>
    <Title>
      Click on a graph to display its file contents and relative sizes
    </Title>
    <Ul>
      {assets.map((asset, i) => {
        const size = sumModules(getModules(chunks, asset.chunks))
        const percentage = ((size / totalSize) * 100).toFixed(1)

        return (
          <Li key={i} onClick={() => select(i)}>
            <p>
              {asset.name} ~ {format(size)}
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
