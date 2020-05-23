import { h, FunctionComponent } from 'preact'
import { useMemo } from 'preact/hooks'

import { Stats, Asset, Module } from './stats'
import { format } from './calc'

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
    <div>
      <h1>{asset.name}</h1>
      <hr />
      <h2>
        dependecies/dependents {sibilings.map(asset => asset.name).join(', ')}
      </h2>
      <ul>
        {modules.map(module => (
          <li>
            {module.name} -> {format(module.size)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Modules
