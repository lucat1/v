import { h, FunctionComponent } from 'preact'
import { useCallback, useRef, useState } from 'preact/hooks'
import { styled } from 'goober'
import { text } from 'promisify-file-reader'

import Body from './body'
import Button from './button'
import { UploadText } from './typography'

import { Stats } from './stats'
import { UploadContainer } from './uploadContainer'

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

const Loader: FunctionComponent<LoaderProps> = ({ onLoad }) => {
  const ref = useRef<HTMLInputElement>()
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')

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

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    stop(e)
    setDragging(false)
    load(e.dataTransfer.files)
  }, [])

  const load = async (files: FileList) => {
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
      console.error(err)
      return
    }

    if (error != '') setError('')
    if (onLoad) onLoad(content)

    try {
      localStorage.setItem('previous', raw)
    } catch (e) {
      // TODO: notify the user of failure
      console.error('Could not save json in the localStorage', e)
    }
  }

  return (
    <Body>
      <Container
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
      <input
        style={{ display: 'none' }}
        ref={ref}
        onChange={handleSubmit}
        id='stats-file'
        type='file'
      />
    </Body>
  )
}

export default Loader
