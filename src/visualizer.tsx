import { h } from 'preact'
import { useCallback, useContext } from 'preact/hooks'
import { SoundContext } from './app'
import { format, getModules, sumModules } from './calc'
import { List, Ul } from './list'
import Main from './main'
import { Asset, Chunk } from './stats'
import { Title } from './typography'
import useSound from './useSound'

interface VisualizerProps {
  assets: Asset[]
  chunks: Chunk[]
  totalSize: number
  select: (i: number) => void
}

const Visualizer = ({ assets, chunks, totalSize, select }: VisualizerProps) => {
  const [noisy] = useContext(SoundContext)

  const handleClick = useCallback(
    (i: number) => {
      useSound(noisy)
      select(i)
    },
    [noisy]
  )

  return (
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
              name={asset.name}
              size={format(size)}
              onClick={() => handleClick(i)}
            />
          )
        })}
      </Ul>
    </Main>
  )
}

export default Visualizer
