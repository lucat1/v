const playSound = async (url: string) => {
  const soundBlob = await (await fetch(url)).blob()
  const audio = new Audio(URL.createObjectURL(soundBlob))
  audio.volume = 0.5
  audio.play()
}

export default playSound
