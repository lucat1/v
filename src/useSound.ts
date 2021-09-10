import { useContext } from 'preact/hooks'
import { SoundContext } from './app'

const cache: { [key: string]: HTMLAudioElement } = {}

const useSound = (typ: string = 'button', forceNoisy: boolean = true) => {
  console.log(cache)
  // const [noisy] = useContext(SoundContext)
  // if (!noisy) return

  console.log(cache[typ], typ)
  cache[typ] = cache[typ] || new Audio(typ + '-sound.mp3')
  cache[typ].volume = 0.5
  cache[typ].play()
}

export default useSound
