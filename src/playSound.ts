import { useContext } from 'preact/hooks'
import { SoundContext } from './app'

const playSound = async (url: string, currentlySwitching?: boolean) => {
  const [noisy] = useContext(SoundContext)

  if (!noisy && !currentlySwitching) return

  const soundBlob = await (await fetch(url)).blob()
  const audio = new Audio(URL.createObjectURL(soundBlob))
  audio.volume = 0.5
  audio.play()
}

export default playSound
