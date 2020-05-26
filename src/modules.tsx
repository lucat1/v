import { h, FunctionComponent } from 'preact'
import { useMemo } from 'preact/hooks'

import Body from './body'
import { Stats, Asset, Module } from './stats'
import { format } from './calc'
import { Title } from './typography'
import { Ul, Li, Percentage } from './list'

interface ModulesProps {
  data: Stats
  asset: Asset
}

const Modules: FunctionComponent<ModulesProps> = ({ data, asset }) => {
  const sibilings = useMemo<Asset[]>(
    () =>
      asset.chunks.reduce(
        (prev, id) =>
          prev.concat(data.chunks[id].siblings.map(id => data.assets[id])),
        []
      ),
    [data.assets, asset.chunks]
  )

  const modules = useMemo<Module[]>(
    () =>
      asset.chunks.reduce(
        (prev, id) => prev.concat(data.chunks[id].modules),
        []
      ),
    [data.modules, data.chunks, asset.chunks]
  )

  return (
    <Body>
      <Title style={{ position: 'sticky', top: 0 }}>
        {asset.name} ~ {format(asset.size)}
      </Title>
      <Ul>
        {modules.map((module, i) => {
          const percentage = ((module.size / asset.size) * 100).toFixed(1)

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
