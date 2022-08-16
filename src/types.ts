export type UserLink = string;
export type Width = number;
export type Height = number;

export enum Direction {
  N = "N",
  E = "E",
  W = "W",
  S = "S",
}

export enum Moves {
  F = "F",
  R = "R",
  L = "L",
  T = "T",
}

export interface PlayerState {
  UserLink: {
    "x": number,
    "y": number,
    "direction": Direction,
    "wasHit": boolean,
    "score": number,
  }
}

export interface Links {
  self: {
    href: UserLink,
  }
}

export interface Arena {
  dims: [Width, Height],
  state: {
    UserLink: PlayerState,
  }
}

export interface RequestBody {
  _links: Links,
  arena: Arena
}