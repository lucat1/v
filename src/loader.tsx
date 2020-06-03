import { h, FunctionComponent } from 'preact'
import { useCallback, useRef, useState } from 'preact/hooks'
import { styled } from 'goober'
import { text } from 'promisify-file-reader'

import Body from './body'
import Button from './button'
import { UploadText } from './typography'

import { Stats } from './stats'

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
        onDrop={handleDrop}
        onDragEnter={handleHover(true)}
        onDragOver={stop}
        onDragLeave={handleHover(false)}
        onClick={handleClick}
        style={{
          borderStyle: dragging ? 'solid' : 'dashed',
          borderColor: error && !dragging ? 'red' : 'grey',
          color: error && !dragging ? 'red' : 'black'
        }}
      >
        <UploadText>
          {dragging ? 'Just drop it!' : error || 'Upload your JSON file here'}
        </UploadText>

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
