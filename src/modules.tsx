import { h } from 'preact'
import { useMemo, useState } from 'preact/hooks'
import { format, getModules, round, sumModules } from './calc'
import { Layout, Square } from './layout'
import Main from './main'
import { Asset, Chunk, Module } from './stats'
import { Subtitle, Title } from './typography'

const shuffle = (arr: Module[]): Module[] => {
  const newArr = arr

  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }

  return newArr
}

interface ModulesProps {
  chunks: Chunk[]
  asset: Asset
}

const Modules = ({ chunks, asset }: ModulesProps) => {
  const modules = useMemo<Module[]>(() => getModules(chunks, asset.chunks), [
    chunks,
    asset.chunks
  ])

  const totalSize = useMemo<number>(() => sumModules(modules), [modules])

  const [big, setBig] = useState(null)
  const [id, setId] = useState(0)

  const getPerc = (m: Module): number => round((m.size / totalSize) * 100)

  const getSpan = (m: Module): number => {
    const percentage = getPerc(m).toString()

    return Number(percentage[0])
  }

  const [bigModules, smallModules] = useMemo<[Module[], Module[]]>(() => {
    const shuffledArr = shuffle(modules)

    return [
      shuffledArr.filter(module => getPerc(module) > 10),
      shuffledArr.filter(module => getPerc(module) <= 10)
    ]
  }, [modules])

  return (
    <Main>
      <Title style={{ wordBreak: 'break-word' }}>
        {asset.name} ~ {format(totalSize)}
      </Title>
      <Subtitle>Click on the rectangles to see each dependency</Subtitle>
      {/* <Square>
        // Render big modules (more than 10%)
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

				// Render small modules (less than 10%)
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
      </Ul> */}
      <Layout>
        {bigModules.map((module, i) => (
          <Square
            key={i}
            title={module.name}
            data-delay={i}
            style={{
              gridColumn: `span ${getSpan(module)}`,
              gridRow: `span ${getSpan(module)}`
            }}
          >
            {format(module.size)}
          </Square>
        ))}

        {smallModules.length > 0 && (
          <Square data-delay={bigModules.length}>...</Square>
        )}
      </Layout>
      <h1>Lorem</h1>
    </Main>
  )
}

export default Modules
