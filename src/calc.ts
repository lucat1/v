import { Stats, Chunk, Module } from './stats'

export const size = (chunks: Chunk[], req: number[]): number => {
  return req.reduce((prev, curr) => {
    return prev + chunks[curr].size
  }, 0)
}

interface Denominator {
  label: string
  value: number
}

export const format = (size: number, precision = 1): string => {
  let kb: Denominator = {
    label: 'k',
    value: 1024
  }
  let mb: Denominator = {
    label: 'M',
    value: 1024 * 1024
  }
  let denominator: Denominator = mb

  if (size < mb.value) {
    denominator = kb
    if (size < kb.value * 0.92 && precision === 0) {
      precision = 1
    }
  }
  return (size / denominator.value).toFixed(precision) + denominator.label
}

export const getModules = (chunks: Chunk[], used: number[]): Module[] =>
  used.reduce((prev, id) => prev.concat(chunks[id].modules), [])

export const sumModules = (modules: Module[]) =>
  modules.reduce((prev, curr) => prev + curr.size, 0)

// properly round numbers to 1 fixed decimal
export const round = (n: number) =>
  Number((Math.round((n + 'e1') as any) + 'e-1') as any)

export const pretty = (name: string) => {
  if (/[\\/]node_modules[\\/]/.test(name)) {
    // node_module
    const str = name.split('node_modules')[1]
    return str.slice(1, str.length)
  }

  return name
}
