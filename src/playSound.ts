import { useContext } from 'preact/hooks'
import { SoundContext } from './app'

const cache: { [key: string]: Audio } = {}

const useSound = (typ?: string, currentlySwitching?: boolean) => {
  const [noisy] = useContext(SoundContext)
  if (!noisy && !currentlySwitching) return

  if (!typ) typ = 'button'
  if (cache[typ] == null) cache[typ] = new Audio(typ + '-sound.mp3')

  cache[typ].volume = 0.5
  cache[typ].play()
}

export default useSound
