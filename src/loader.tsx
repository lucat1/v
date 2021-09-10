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
import useSound from './useSound'
import { Stats } from './stats'
import Toggle from './toggle'
import ToggleGroup from './toggleGroup'
import { HomeTitle } from './typography'

let jsonExample: File = null

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
    console.log('yo')
    useSound()
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
    useSound()

    if (localStorage.getItem('previous') == null) {
      setError("You haven't uploaded a file yet")
      return
    }

    if (onLoad) onLoad(JSON.parse(localStorage.getItem('previous')))
  }

  const handleExampleUpload = async () => {
    useSound()

    setError('Loading example...')
    if (jsonExample == null) {
      const blob = await (await fetch('/stats.json')).blob()
      jsonExample = new File([blob], 'stats.json')
    }

    load([jsonExample] as any, true)
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
    useSound('toggle')
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

  const handleSoundChange = useCallback(() => {
    // noisy = false => toggled to true and sound played
    // nosiy = true => toggled to false
    console.log("noisy:", noisy)
    // setNoisy(!noisy)
    // if(!noisy)
    //   useSound()
  }, [])

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
