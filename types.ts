export interface Player {
  playerId: number,
  playerName: string,
  picked: boolean,
  pickNum: number,
}

export interface Team {
  teamId: number,
  picks: Player[],
}

export interface DraftPosition {
  team: Team,
  pickOrder: number,
  playerPicked: Player | null
}

