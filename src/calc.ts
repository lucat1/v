import { Chunk } from './stats'

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
