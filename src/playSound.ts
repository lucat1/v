import { useContext } from 'preact/hooks'
import { SoundContext } from './app'
// @ts-ignore
import backSound from '/back-sound.mp3'
// @ts-ignore
import buttonSound from '/button-sound.mp3'
// @ts-ignore
import toggleSound from '/toggle-sound.mp3'

const playSound = async (type?: string, currentlySwitching?: boolean) => {
  const [noisy] = useContext(SoundContext)

  if (!noisy && !currentlySwitching) return

  const src: string =
    type === 'back' ? backSound : type === 'toggle' ? toggleSound : buttonSound

  const audio = new Audio(src)
  audio.volume = 0.5
  audio.play()
}

export default playSound
