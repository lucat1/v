import { styled } from 'goober'
import { h } from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { text } from 'promisify-file-reader'
import Lines from './lines'
import Main from './main'
import Overlay from './overlay'
import Panels from './panels'
import { Stats } from './stats'
import Toggle from './toggle'
import ToggleGroup from './toggleGroup'
import { HomeText } from './typography'

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
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const [switchedTheme, setSwitchedTheme] = useState(false)

  useEffect(() => {
    window.addEventListener('dragenter', handleDragEnter)

    return () => {
      window.removeEventListener('dragenter', handleDragEnter)
    }
  }, [])

  const handleClick = useCallback(() => {
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

    if (localStorage.getItem('previous') == null) {
      setError("You haven't uploaded a file yet")
      return
    }

    if (onLoad) onLoad(JSON.parse(localStorage.getItem('previous')))
  }

  const handleExampleUpload = async () => {
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
    setSwitchedTheme(!switchedTheme)

    document.body.style.color = switchedTheme ? 'black' : 'white'

    document.body.style.setProperty(
      '--primary',
      switchedTheme ? '#e7edd6' : 'magenta'
    )

    document.body.style.setProperty(
      '--secondary',
      switchedTheme ? '#b9a6d1' : 'teal'
    )
  }

  return (
    <Main>
      <HomeText>Drop a JSON file to visualize it.</HomeText>

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
          checked={false}
          onChange={() => console.log('sounds')}
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
