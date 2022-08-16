import { UserLink, State, PlayerStateWithID } from "./types";

export function getOtherState(myId: UserLink, state: State) {
  const playerState: PlayerStateWithID[] = Object.entries(state).map(
    ([id, playerState]) => ({ id, ...playerState })
  );

  const otherState = playerState.filter(({ id }) => id !== myId);
  return otherState;
}