import { h, FunctionComponent } from 'preact'
import { useMemo, useState } from 'preact/hooks'

import Body from './body'
import { Chunk, Asset, Module } from './stats'
import { format, getModules, sumModules, pretty } from './calc'
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

  const [bigModules, smallModules] = useMemo<[Module[], Module[]]>(() => {
    const sorted = modules.sort((a, b) => b.size - a.size)

    return [
      sorted.filter(module => getPerc(module) > 10),
      sorted.filter(module => getPerc(module) <= 10)
    ]
  }, [modules])

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
        {bigModules.map((module, i) => (
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
        {smallModules.length > 0 && (
          <Box
            data-size={10}
            delay={bigModules.length}
            onClick={() => setBig(false)}
          >
            ...
          </Box>
        )}
      </Square>
      <Ul>
        {big === null ? null : big === true ? (
          <List
            percentage={getPerc(bigModules[id])}
            title={bigModules[id].name}
          >
            {format(bigModules[id].size)} => {pretty(bigModules[id].name)}
          </List>
        ) : (
          smallModules.map((module, i) => {
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
