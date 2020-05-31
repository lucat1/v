import { h, FunctionComponent } from 'preact'

import Body from './body'
import { Asset, Chunk } from './stats'
import { format, sumModules, getModules } from './calc'
import { Ul, List } from './list'
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
      Click on an item to display its file contents and relative sizes
    </Title>
    <Ul>
      {assets.map((asset, i) => {
        const size = sumModules(getModules(chunks, asset.chunks))
        const percentage = ((size / totalSize) * 100).toFixed(1)

        return (
          <List key={i} percentage={percentage} onClick={() => select(i)}>
            {asset.name} ~ {format(size)}
          </List>
        )
      })}
    </Ul>
  </Body>
)

export default Visualizer
