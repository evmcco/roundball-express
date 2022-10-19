import { useState } from 'react'
import { Player, Team, DraftPosition } from '../types'

interface PlayerCardProps {
  player: Player,
  draftPlayer: (player: Player) => void,
}

const PlayerCard = ({ player, draftPlayer }: PlayerCardProps) => {
  return (
    player.picked ?
      <div className="p-4 my-2 text-base border-solid border-2 border-black rounded bg-black text-white" key={player.playerId}>
        <div>{`Player ${player.playerId}`}</div>
      </div >
      : <div className="p-4 my-2 text-base border-solid border-2 border-black rounded hover:bg-orange-500" key={player.playerId} onClick={() => draftPlayer(player)}>
        <div>{`Player ${player.playerId}`}</div>
      </div >
  )
}


export default PlayerCard
