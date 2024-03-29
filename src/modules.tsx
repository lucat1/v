import { h } from 'preact'
import { useMemo, useState, useCallback, useContext } from 'preact/hooks'
import { format, getModules, pretty, round, sumModules } from './calc'
import { Layout, Square } from './layout'
import { List, Ul } from './list'
import Main from './main'
import useSound from './useSound'
import { SoundContext } from './app'
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
  const [noisy] = useContext(SoundContext)
  const modules = useMemo<Module[]>(() => getModules(chunks, asset.chunks), [
    chunks,
    asset.chunks
  ])

  const totalSize = useMemo<number>(() => sumModules(modules), [modules])

  const [showBig, setShowBig] = useState(null)
  const [bigModulesIndex, setBigModulesIndex] = useState(0)

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

  const handleClick = useCallback((isBig: boolean, index: number) => {
    useSound(noisy)
    setShowBig(isBig)
    setBigModulesIndex(index)
  }, [noisy])

  return (
    <Main>
      <Title style={{ wordBreak: 'break-word' }}>
        {asset.name} ~ {format(totalSize)}
      </Title>
      <Subtitle>Click on the rectangles to see each dependency</Subtitle>
      <Layout>
        {bigModules.map((module, i) => (
          <Square
            key={i}
            title={module.name}
            data-delay={i}
            onClick={() => handleClick(true, i)}
            style={{
              gridColumn: `span ${getSpan(module)}`,
              gridRow: `span ${getSpan(module)}`
            }}
          >
            {format(module.size)}
          </Square>
        ))}

        {smallModules.length > 0 && (
          <Square
            data-delay={bigModules.length}
            onClick={() => handleClick(false, -1)}
          >
            ...
          </Square>
        )}
      </Layout>

      <Ul style={{ marginTop: '1rem' }}>
        {showBig === null ? null : showBig === true ? (
          <List
            percentage={getPerc(bigModules[bigModulesIndex])}
            interactive={false}
            name={pretty(bigModules[bigModulesIndex].name)}
            size={format(bigModules[bigModulesIndex].size)}
            title={pretty(bigModules[bigModulesIndex].name)}
          />
        ) : (
          smallModules.map((module, i) => {
            return (
              <List
                key={i}
                percentage={getPerc(module)}
                interactive={false}
                name={module.name}
                size={format(module.size)}
                title={module.name}
              />
            )
          })
        )}
      </Ul>
    </Main>
  )
}

export default Modules
