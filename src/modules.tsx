import { h, FunctionComponent } from 'preact'
import { useMemo } from 'preact/hooks'

import Body from './body'
import { Chunk, Asset, Module } from './stats'
import { format, getModules, sumModules } from './calc'
import { Title } from './typography'
import { Ul, Li, Percentage } from './list'

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

  return (
    <Body>
      <Title style={{ position: 'sticky', top: 0 }}>
        {asset.name} ~ {format(totalSize)}
      </Title>
      <Ul>
        {modules.map((module, i) => {
          const percentage = ((module.size / totalSize) * 100).toFixed(1)

          return (
            <Li key={i} title={module.name}>
              <p>
                {format(module.size)} => {module.name}
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
}

export default Modules
