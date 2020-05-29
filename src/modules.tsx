import { h, FunctionComponent } from 'preact'
import { useMemo } from 'preact/hooks'

import Body from './body'
import { Chunk, Asset, Module } from './stats'
import { format, getModules, sumModules } from './calc'
import { Title, Subtitle } from './typography'
import { Square, Box } from './square'

interface ModulesProps {
  chunks: Chunk[]
  asset: Asset
}

const Modules: FunctionComponent<ModulesProps> = ({ chunks, asset }) => {
  const modules = useMemo<Module[]>(() => getModules(chunks, asset.chunks), [
    chunks,
    asset.chunks
  ])
  const totalSize = useMemo<number>(() => sumModules(modules), [modules])

  const getBigModules = (big = true) => {
    return modules
      .sort((a, b) => b.size - a.size)
      .filter(m => {
        const percentage = ((m.size / totalSize) * 100).toFixed(1)
        return big ? Number(percentage) > 10 : Number(percentage) < 10
      })
  }

  return (
    <Body
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Title>
        {asset.name} ~ {format(totalSize)}
      </Title>
      <Subtitle>Click on the rectangles to see each dependency</Subtitle>
      <Square>
        {getBigModules().map((module, i) => {
          const percentage = ((module.size / totalSize) * 100).toFixed(1)

          return (
            <Box key={i} size={percentage} title={module.name}>
              {format(module.size)}
            </Box>
          )
        })}
        {getBigModules(false).length !== 0 && <Box size={10}>...</Box>}
      </Square>
    </Body>
  )
}

export default Modules
