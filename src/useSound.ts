import { useContext } from 'preact/hooks'
import { SoundContext } from './app'

const cache: { [key: string]: HTMLAudioElement } = {}

const useSound = (play: boolean = false, typ: string = 'button') => {
  if(!play) return

  cache[typ] = cache[typ] || new Audio(typ + '-sound.mp3')
  cache[typ].volume = 0.5
  cache[typ].play()
}

export default useSound
