import { Direction as Dir, Moves, PlayerState, PlayerStateWithID, RequestBody, State, UserLink } from "./types";
import { getOtherState } from "./utils";

function moveFromWall(x: number, y: number, maxX: number, maxY: number, dir: Dir) {
  if (x === 0 && dir === Dir.W)
    return y === 0 ? Moves.L : Moves.R;

  if (x === maxX && dir === Dir.E)
    return y === 0 ? Moves.R : Moves.L;

  if (y === 0 && dir === Dir.N)
    return x === 0 ? Moves.R : Moves.L;

  if (y === maxY && dir === Dir.S)
    return x === 0 ? Moves.L : Moves.R;

  return undefined;
}

export default function move({ _links, arena }: RequestBody): Moves {
  const state = arena.state;
  const [width, height] = arena.dims;

  const maxX = width - 1;
  const maxY = height - 1;

  const myId = _links.self.href;
  const { x, y, direction: dir } = state[myId];

  const otherState = getOtherState(myId, state);

  const wallMove = moveFromWall(x, y, maxX, maxY, dir);

  if (wallMove !== undefined)
    return wallMove;

  return Moves.F;
}