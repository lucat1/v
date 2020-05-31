import { h, FunctionComponent } from 'preact'
import { useMemo, useState } from 'preact/hooks'

import Body from './body'
import { Chunk, Asset, Module } from './stats'
import { format, getModules, sumModules } from './calc'
import { Title, Subtitle } from './typography'
import { Square, Box } from './square'
import { Ul, List } from './list'

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

  const [big, setBig] = useState(null)
  const [id, setId] = useState(0)

  const getPerc = (m: Module) => ((m.size / totalSize) * 100).toFixed(1)

  const getBigModules = (big = true) => {
    return modules
      .sort((a, b) => b.size - a.size)
      .filter(module => {
        const percentage = getPerc(module)
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
        {/* Render big modules (more than 10%) */}
        {getBigModules().map((module, i) => (
          <Box
            key={i}
            data-size={getPerc(module)}
            title={module.name}
            delay={i}
            onClick={() => {
              setBig(true)
              setId(i)
            }}
          >
            {format(module.size)}
          </Box>
        ))}

        {/* Render small modules (less than 10%) */}
        {getBigModules(false).length !== 0 && (
          <Box
            data-size={10}
            delay={getBigModules().length}
            onClick={() => setBig(false)}
          >
            ...
          </Box>
        )}
      </Square>
      <Ul>
        {big === null ? null : big === true ? (
          <List
            percentage={getPerc(getBigModules()[id])}
            title={getBigModules()[id].name}
          >
            {format(getBigModules()[id].size)} => {getBigModules()[id].name}
          </List>
        ) : (
          getBigModules(false).map((module, i) => {
            return (
              <List key={i} percentage={getPerc(module)} title={module.name}>
                {format(module.size)} => {module.name}
              </List>
            )
          })
        )}
      </Ul>
    </Body>
  )
}

export default Modules
