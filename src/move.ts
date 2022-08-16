import { Moves, RequestBody } from "./types";

export default function move({ _links, arena }: RequestBody): Moves {
  const playerState = arena.state;
  const [width, height] = arena.dims;

  const maxX = width - 1;
  const maxY = height - 1;

  const myLink = _links.self.href;
  const { x, y, direction: dir } = playerState[myLink];

  return Moves.F;
}