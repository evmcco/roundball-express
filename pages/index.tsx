import type { NextPage } from 'next'
import { useState } from 'react'
import { Player, Team, DraftPosition } from '../types'
import PlayerCard from '../components'

var _players: Array<Player> = []
for (var i = 1; i <= 50; i++) {
  let _player: Player = { playerId: i, playerName: `Player ${i}`, picked: false, pickNum: -1 }
  _players.push(_player);
}

var _teams: Array<Team> = []
for (var i = 1; i <= 4; i++) {
  _teams.push({
    teamId: i,
    picks: []
  });
}

var _draftOrder: Array<DraftPosition> = []
for (var i = 1; i <= 8; i++) {
  if (i % 2 === 1) {
    //odd numbered draft round, picks go in normal order
    for (var j = 1; j <= _teams.length; j++) {
      _draftOrder.push({
        team: _teams[j - 1],
        pickOrder: 4 * (i - 1) + j,
        playerPicked: null
      })
    }
  }
  else if (i % 2 === 0) {
    //even numbered draft round, picks go in oppopsite order
    for (var j = _teams.length; j >= 1; j--) {
      _draftOrder.push({
        team: _teams[j - 1],
        pickOrder: 4 * (i - 1) - (j - 5),
        playerPicked: null
      })
    }
  }
}

const Draft: NextPage = () => {
  const [currentPick, setCurrentPick] = useState(1)
  const [players, setPlayers] = useState(_players)
  const [teams, setTeams] = useState(_teams)
  const [draftOrder, setDraftOrder] = useState(_draftOrder)

  const draftPlayer = (player: Player) => {
    //when clicking a player, add it to the correct Team and disable picking that player again
    if (players[player.playerId - 1].picked) {
      return
    }
    //set player object as picked
    players[player.playerId - 1].picked = true
    //update the draft order to reflect the pick
    let _draftOrder = draftOrder
    _draftOrder[currentPick - 1].playerPicked = players[player.playerId - 1]
    setDraftOrder(_draftOrder)
    //proceed to the next pick
    const nextPick = currentPick + 1
    setCurrentPick(nextPick)
  }

  return (
    <div className="font-mono">
      <h1 className="p-6 text-2xl font-semibold  bg-black text-white">
        Roundball Express
      </h1>
      <div className="flex flex-row">
        <div className="flex-1 w-1/4 p-6 mb-2 text-2xl font-semibold">
          Draft Order
          {draftOrder.map((d) => {
            if (d.playerPicked) {
              return
            }
            return (currentPick === d.pickOrder ?
              <div className="p-4 my-2 text-base border-solid border-2 border-black rounded bg-orange-500" key={d.pickOrder}>
                <div className="text-white">Current Pick!</div>
                <div>{`Team ${d.team.teamId}`}</div>
                <div>{`Pick ${d.pickOrder}`}</div>
                <div>{d.playerPicked ? `${d.playerPicked.playerName}` : null}</div>
              </div> : <div className="p-4 my-2 text-base border-solid border-2 border-black rounded" key={d.pickOrder}>
                <div>{`Team ${d.team.teamId}`}</div>
                <div>{`Pick ${d.pickOrder}`}</div>
                <div>{d.playerPicked ? `${d.playerPicked.playerName}` : null}</div>
              </div>
            )
          })
          }
        </div>
        <div className="flex-1 w-1/4 p-6 mb-2 text-2xl font-semibold">
          Players
          {players.map((p) => {
            return (
              <PlayerCard player={p} draftPlayer={draftPlayer} />
            )
          })
          }
        </div >
      </div>
    </div>
  )
}

export default Draft
