import { h, FunctionComponent } from "preact";
import { useMemo } from "preact/hooks";

import { Stats, Asset } from "./stats";
import { format, size } from "./calc";

interface VisualizerProps {
  data: Stats;
}

const Visualizer: FunctionComponent<VisualizerProps> = ({ data }) => {
  const assets = useMemo(() => {
    return data.assets
      .filter(({ name }) => name.endsWith(".js"))
      .sort(
        ({ chunks: a }, { chunks: b }) =>
          size(data.chunks, b) - size(data.chunks, a)
      );
  }, [data]);

  return (
    <div>
      <ul>
        {assets.map((asset) => (
          <li>
            {asset.name} -> {format(size(data.chunks, asset.chunks))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Visualizer;
