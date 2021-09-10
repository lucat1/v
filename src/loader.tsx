import { styled } from 'goober'
import { h } from 'preact'
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'preact/hooks'
import { text } from 'promisify-file-reader'
import { SoundContext } from './app'
import Lines from './lines'
import Main from './main'
import Overlay from './overlay'
import Panels from './panels'
import playSound from './playSound'
import { Stats } from './stats'
import Toggle from './toggle'
import ToggleGroup from './toggleGroup'
import { HomeTitle } from './typography'

const Container = styled('div')`
  width: 100%;
  height: 50vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  border: 2px solid grey;
  border-radius: 2rem;
  cursor: pointer;
`

const stop = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault()
  e.stopPropagation()
}

interface LoaderProps {
  onLoad(json: Stats): void
}

const Loader = ({ onLoad }: LoaderProps) => {
  const ref = useRef<HTMLInputElement>()
  const [noisy, setNoisy] = useContext(SoundContext)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const [switchedTheme, setSwitchedTheme] = useState(
    document.body.style.color === 'white'
  )

  useEffect(() => {
    window.addEventListener('dragenter', handleDragEnter)

    return () => {
      window.removeEventListener('dragenter', handleDragEnter)
    }
  }, [])

  const handleClick = useCallback(() => {
    playSound('/button-sound.mp3')
    ref.current.click()
  }, [ref])

  const handleSubmit = useCallback(() => {
    load(ref.current.files)
  }, [ref])

  const handleDragEnter = e => {
    stop(e)
    setDragging(true)
  }

  const handleDragLeave = e => {
    stop(e)
    setDragging(false)
  }

  const handleLatestUpload = e => {
    stop(e)
    playSound('/button-sound.mp3')

    if (localStorage.getItem('previous') == null) {
      setError("You haven't uploaded a file yet")
      return
    }

    if (onLoad) onLoad(JSON.parse(localStorage.getItem('previous')))
  }

  const handleExampleUpload = async () => {
    playSound('/button-sound.mp3')

    const blob = await (await fetch('/stats.json')).blob()
    const file = new File([blob], 'stats.json')

    load([file] as any, true)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    stop(e)
    setDragging(false)
    load(e.dataTransfer.files)
  }

  const load = async (files: FileList, isExample?: boolean) => {
    if (!files[0]) {
      setError('No file provided')
      return
    }

    if (error != '') setError('')

    const raw = await text(files[0])
    let content = {} as Stats

    try {
      content = JSON.parse(raw)
    } catch (err) {
      setError('Invalid file contents')
      return
    }

    if (error != '') setError('')
    if (onLoad) onLoad(content)

    try {
      if (!isExample) localStorage.setItem('previous', raw)
    } catch (e) {
      setError('Could not save the file in local storage')
    }
  }

  const handleThemeChange = () => {
    playSound('/toggle-sound.mp3')
    setSwitchedTheme(!switchedTheme)

    document.body.style.color = switchedTheme ? 'black' : 'white'

    document.body.style.setProperty(
      '--primary',
      switchedTheme ? '#e7edd6' : '#2b4c59'
    )

    document.body.style.setProperty(
      '--secondary',
      switchedTheme ? '#b9a6d1' : '#578a68'
    )
  }

  const handleSoundChange = () => {
    if (!noisy) playSound('/toggle-sound.mp3', true)
    setNoisy(!noisy)
  }

  return (
    <Main>
      <HomeTitle>Drop a JSON file to visualize it.</HomeTitle>

      <Lines />

      <Panels
        onUpload={handleClick}
        onLatestUpload={handleLatestUpload}
        onExampleUpload={handleExampleUpload}
        errorText={error}
      />

      <input
        style={{ display: 'none' }}
        ref={ref}
        onChange={handleSubmit}
        id='stats-file'
        type='file'
      />

      <ToggleGroup>
        <Toggle
          content={['Theme', 'Light', 'Dark']}
          checked={switchedTheme}
          onChange={handleThemeChange}
        />

        <Toggle
          content={['Sounds', 'On', 'Off']}
          checked={!noisy}
          onChange={handleSoundChange}
        />
      </ToggleGroup>

      <Overlay
        data-dragging={dragging}
        onDrop={handleDrop}
        onDragOver={stop}
        onDragLeave={handleDragLeave}
      />
    </Main>
  )
}

export default Loader
