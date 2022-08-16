import { UserLink, State, PlayerStateWithID, Moves } from "./types";

export function getOtherState(myId: UserLink, state: State) {
  const playerState: PlayerStateWithID[] = Object.entries(state).map(
    ([id, playerState]) => ({ id, ...playerState })
  );

  const otherState = playerState.filter(({ id }) => id !== myId);
  return otherState;
}

export function randomTurn() {
  return Math.random() < 0.5 ? Moves.L : Moves.R;
}