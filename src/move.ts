import { Moves, RequestBody } from "./types";

export default function move({ _links, arena }: RequestBody): Moves {
  return Moves.R;
}