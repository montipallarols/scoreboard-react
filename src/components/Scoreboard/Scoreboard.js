import React, { useState } from "react";
import Player from "../Player/Player";
import AddPlayerForm from "../AddPlayer";
import "./Scoreboard.scss";

function compare_score(player_a, player_b) {
  return player_b.score - player_a.score;
}

function compare_name(player_a, player_b) {
  return player_a.name.localeCompare(player_b.name);
}

export default function Scoreboard() {
  const [players, set_players] = useState([
    { id: 1, name: "Violeta", score: 11 },
    { id: 2, name: "Eszter", score: 14 },
    { id: 3, name: "Jeroen v2", score: 4 },
    { id: 4, name: "Lisa", score: 42 },
  ]);

  const [sort_by, set_sort_by] = useState("score");

  const players_sorted =
    sort_by === "score"
      ? [...players].sort(compare_score)
      : [...players].sort(compare_name);

  function change_sorting(event) {
    console.log("new sort order:", event.target.value);
    set_sort_by(event.target.value);
  }

  function incrementScore(id) {
    console.log(id);

    const new_players_array = players.map((player) => {
      // decide whether this player's score needs to be incremented
      if (player.id === id) {
        // and if so, create a new player object,
        return {
          // but first copying over the player object's data
          ...player,
          // and then overriding the score property to be incremented
          score: player.score + 1,
        };
      } else {
        // else, just keep them
        return player;
      }
    });

    set_players(new_players_array);
  }

  function resetScores() {
    const updatedPlayers = players.map((player) => {
      return { ...player, score: 0 };
    });
    set_players(updatedPlayers);
  }

  const resetOnePlayer = (id) => {
    console.log("guy to reset", id);
    const updatedPlayers = players.map((p) =>
      p.id === id ? { ...p, score: 0 } : p
    );
    set_players(updatedPlayers);
  };

  const addPlayerCallback = (name) => {
    const newGuy = {
      id: players.length + 1,
      name,
      score: 0, // == 0
    };

    const extraPlayerArray = [...players, newGuy];
    set_players(extraPlayerArray);
  };
  console.log(players);

  return (
    <div className="Scoreboard">
      <h2>Player's scores:</h2>
      <ul>
        {players_sorted.map(function (player) {
          return (
            <Player
              key={player.id}
              id={player.id}
              name={player.name}
              score={player.score}
              incrementScore={incrementScore}
              resetOnePlayer={resetOnePlayer}
            />
          );
        })}
      </ul>
      <p>
        Sort order:{" "}
        <select onChange={change_sorting} value={sort_by}>
          <option value="score">Sort by score</option>
          <option value="name">Sort by name</option>
        </select>
      </p>
      <AddPlayerForm addPlayerCallback={addPlayerCallback} />
      <button onClick={resetScores}>Reset scores</button>
    </div>
  );
}
