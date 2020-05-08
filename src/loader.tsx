import { h, FunctionComponent, Fragment } from "preact";
import { useCallback, useRef, useState } from "preact/hooks";
import { styled } from "goober";
import { text } from "promisify-file-reader";

import { Stats } from "./stats";
import { H2 } from "./typography";

const Container = styled("div")`
  width: 100%;
  height: 20em;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid grey;
  border-radius: 2em;
  cursor: pointer;
`;

const stop = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

interface LoaderProps {
  onLoad(json: Stats): void;
}

const Loader: FunctionComponent<LoaderProps> = ({ onLoad }) => {
  const ref = useRef<HTMLInputElement>();
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const handleClick = useCallback(() => {
    ref.current.click();
  }, [ref]);
  const handleSubmit = useCallback(() => {
    load(ref.current.files);
  }, [ref]);

  const handleHover = (val: boolean) => (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    stop(e);
    setDragging(val);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    stop(e);
    setDragging(false);
    load(e.dataTransfer.files);
  }, []);

  const load = async (files: FileList) => {
    if (!files[0]) {
      setError("No file provided");
      return;
    }
    if (error != "") setError("");

    const raw = await text(files[0]);
    let content = {} as Stats;
    try {
      content = JSON.parse(raw);
    } catch (err) {
      setError("Invalid file contents");
      console.error(err);
      return;
    }

    if (error != "") setError("");
    if (onLoad) onLoad(content);
  };

  return (
    <Fragment>
      <Container
        onDrop={handleDrop}
        onDragEnter={handleHover(true)}
        onDragOver={stop}
        onDragLeave={handleHover(false)}
        onClick={handleClick}
        style={{
          borderStyle: dragging ? "solid" : "dashed",
          borderColor: error && !dragging ? "red" : "grey",
          color: error && !dragging ? "red" : "black",
        }}
      >
        <H2>{dragging ? "Just drop it!" : error || "Load a stats file"}</H2>
      </Container>
      <input
        style={{ display: "none" }}
        ref={ref}
        onChange={handleSubmit}
        id="stats-file"
        type="file"
      />
    </Fragment>
  );
};

export default Loader;