import {
  Direction as Dir,
  Moves,
  PlayerStateWithID,
  RequestBody
} from "./types";

import {
  checkPlayerAhead,
  getOtherState,
  getPlayerAround,
  randomTurn
} from "./utils";

function moveFromWall(
  x: number,
  y: number,
  maxX: number,
  maxY: number,
  dir: Dir
) {
  if (x === 0 && dir === Dir.W) {
    return y === 0 ? Moves.L : Moves.R;
  }

  if (x === maxX && dir === Dir.E) {
    return y === 0 ? Moves.R : Moves.L;
  }

  if (y === 0 && dir === Dir.N) {
    return x === 0 ? Moves.R : Moves.L;
  }

  if (y === maxY && dir === Dir.S) {
    return x === 0 ? Moves.L : Moves.R;
  }

  return undefined;
}

function moveFromPlayer(
  x: number,
  y: number,
  dir: Dir,
  playerAround: PlayerStateWithID[]
) {
  console.log("player around count", playerAround.length);
  console.log("player around", playerAround);

  let toX = x;
  let toY = y;

  switch (dir) {
    case Dir.N:
      toY--;
      break;

    case Dir.S:
      toY++;
      break;

    case Dir.W:
      toX--;
      break;

    case Dir.E:
      toX++;
      break;
  }

  console.log("to x y", toX, toY);

  const checkAround = playerAround.some(
    other => other.x === toX && other.y === toY
  );

  if (checkAround) {
    return randomTurn();
  }

  return Moves.F;
}

export default function move({ _links, arena }: RequestBody): Moves {
  const state = arena.state;
  const [width, height] = arena.dims;

  const maxX = width - 1;
  const maxY = height - 1;

  const myId = _links.self.href;
  const myState = state[myId];

  console.log("my state", myState);
  // console.log("arena", arena);

  const { x, y, direction: dir, wasHit } = myState;

  const wallMove = moveFromWall(x, y, maxX, maxY, dir);

  if (wallMove !== undefined) {
    return wallMove;
  }

  const otherState = getOtherState(myId, state);
  const playerAround = getPlayerAround(x, y, otherState);

  const isPlayerAhead = checkPlayerAhead(x, y, dir, playerAround);

  if (isPlayerAhead) {
    if (wasHit) {
      return moveFromPlayer(x, y, dir, playerAround);
    }

    return Moves.T;
  }

  if (playerAround.length > 0 && !wasHit) {
    return Moves.L;
  }

  // Some random move
  if (Math.random() < 0.14045) {
    return randomTurn();
  }

  return Moves.F;
}
