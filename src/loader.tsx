import { styled } from 'goober'
import { h } from 'preact'
import { useCallback, useRef, useState } from 'preact/hooks'
import { text } from 'promisify-file-reader'
import Lines from './lines'
import Main from './main'
import Panels from './panels'
import { Stats } from './stats'
import { HomeText } from './typography'
// @ts-ignore
import exampleFile from '/stats.json'

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

  const handleClick = useCallback(() => {
    ref.current.click()
  }, [ref])

  const handleSubmit = useCallback(() => {
    load(ref.current.files)
  }, [ref])

  const handleHover = (val: boolean) => (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    stop(e)
    setDragging(val)
  }

  const handleLatestUpload = e => {
    stop(e)

    setError('') // previous savings cannot have errors
    if (onLoad) onLoad(JSON.parse(localStorage.getItem('previous')))
  }

  const handleExampleUpload = () => {
    const blob = new Blob([JSON.stringify(exampleFile)], {
      type: 'application/json'
    })

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
      // TODO: notify the user of failure
      console.error('Could not save json in the localStorage', e)
    }
  }

  const handleThemeChange = () => {
    setSwitchedTheme(!switchedTheme)

    document.body.style.setProperty(
      '--primary',
      switchedTheme ? '#e7edd6' : 'magenta'
    )

    document.body.style.setProperty(
      '--secondary',
      switchedTheme ? '#b9a6d1' : 'teal'
    )

    document.body.style.color = switchedTheme ? 'black' : 'white'
  }

  return (
    <Main>
      {/* <Container
        onClick={handleClick}
        style={{
          borderStyle: dragging ? 'solid' : 'dashed',
          borderColor: error && !dragging ? 'red' : 'grey',
          color: error && !dragging ? 'red' : 'black'
        }}
      >
        <UploadContainer
          onDrop={handleDrop}
          onDragEnter={handleHover(true)}
          onDragOver={stop}
          onDragLeave={handleHover(false)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='48'
            height='48'
            viewBox='0 0 48 48'
            style={{ fill: error && !dragging ? 'red' : 'black' }}
          >
            <path d='M12 4C9.79 4 8.02 5.79 8.02 8L8 40c0 2.21 1.77 4 3.98 4H36c2.21 0 4-1.79 4-4V16L28 4H12zm14 14V7l11 11H26z' />
            <path d='M0 0h48v48H0z' fill='none' />
          </svg>
          <UploadText>
            {dragging ? 'Just drop it!' : error || 'Upload your JSON file here'}
          </UploadText>
        </UploadContainer>

        <Button
          disabled={!localStorage.getItem('previous')}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()

            setError('') // previous savings cannot have errors
            if (onLoad) onLoad(JSON.parse(localStorage.getItem('previous')))
          }}
        >
          Check your latest JSON file
        </Button>
      </Container>
		*/}
      <HomeText>Drop a JSON file to visualize it.</HomeText>

      <Lines />

      <Panels
        onUpload={handleClick}
        onLatestUpload={handleLatestUpload}
        onExampleUpload={handleExampleUpload}
      />

      <input
        style={{ display: 'none' }}
        ref={ref}
        onChange={handleSubmit}
        id='stats-file'
        type='file'
      />
    </Main>
  )
}

export default Loader
