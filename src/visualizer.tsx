import { h } from 'preact'
import { format, getModules, sumModules } from './calc'
import { List, Ul } from './list'
import Main from './main'
import { Asset, Chunk } from './stats'
import { Title } from './typography'

interface VisualizerProps {
  assets: Asset[]
  chunks: Chunk[]
  totalSize: number
  select: (i: number) => void
}

const Visualizer = ({ assets, chunks, totalSize, select }: VisualizerProps) => (
  <Main>
    <Title>Total file size: {format(totalSize)}</Title>
    <Ul>
      {assets.map((asset, i) => {
        const size = sumModules(getModules(chunks, asset.chunks))
        const percentage = ((size / totalSize) * 100).toFixed(1)

        return (
          <List
            key={i}
            percentage={percentage}
            interactive={true}
            onClick={() => select(i)}
          >
            {asset.name} ~ {format(size)}
          </List>
        )
      })}
    </Ul>
  </Main>
)

export default Visualizer
