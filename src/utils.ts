import {
  Direction as Dir,
  UserLink,
  State,
  PlayerStateWithID,
  Moves
} from "./types";

export function getOtherState(myId: UserLink, state: State) {
  const playerState: PlayerStateWithID[] = Object.entries(state).map(
    ([id, playerState]) => ({ id, ...playerState })
  );

  const otherState = playerState.filter(({ id }) => id !== myId);
  return otherState;
}

export function getPlayerAround(
  x: number,
  y: number,
  otherState: PlayerStateWithID[]
) {
  const HIT_DIST = 3;

  const playerAround = otherState.filter(
    other =>
      (Math.abs(x - other.x) <= HIT_DIST && other.y === y) ||
      (Math.abs(y - other.y) <= HIT_DIST && other.x === x)
  );

  return playerAround;
}

export function checkPlayerAhead(
  x: number,
  y: number,
  dir: Dir,
  playerAround: PlayerStateWithID[]
) {
  const isPlayerAhead = playerAround.some(other => {
    switch (dir) {
      case Dir.N:
        return other.x === x && other.y < y;
      case Dir.S:
        return other.x === x && other.y > y;
      case Dir.W:
        return other.y === y && other.x < x;
      case Dir.E:
        return other.y === y && other.x > x;
      default:
        return false;
    }
  });

  return isPlayerAhead;
}

export function randomTurn() {
  return Math.random() < 0.5 ? Moves.L : Moves.R;
}
