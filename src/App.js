import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Game from "./components/Game";
import Player from "./components/Player";

import "./App.css";

function App() {
  const [players, setPlayers] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [message, setMessage] = useState("");

  const handlePlayerJoin = (name) => {
    setPlayers([...players, name]);
    setMessage("");
  };

  const handleStartGame = () => {
    if (players.length === 0) {
      setMessage("Join the Game Now");
    } else {
      setStartGame(true);
    }
  };

  const handleResetGame = () => {
    // Reset the game state
    setPlayers([]);
    setStartGame(false);
    setMessage("");
  };

  return (
    <>
      {!startGame ? (
        <div className="app-container">
          <div className="card-container">
            <h1 className="heading">Join the Game by Scanning QR Code:</h1>
            <QRCodeCanvas value="http://localhost:3000/join" />
          </div>
          <Player onJoin={handlePlayerJoin} />
          <button
            type="button"
            className="start-button"
            onClick={handleStartGame}
          >
            Start Game
          </button>
          {message && <p className="notify-msg">{message}</p>}
        </div>
      ) : (
        <Game players={players} onGameReset={handleResetGame} />
      )}
    </>
  );
}

export default App;
