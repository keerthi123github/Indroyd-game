import React, { useState } from "react";
import "./index.css";

function Player({ onJoin }) {
  const [name, setName] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  const joinGame = () => {
    if (name) {
      onJoin(name);
      setIsJoined(true); // Disable the button and change text once the player joins
    }
  };

  return (
    <div className="player-container">
      <h2 className="enter-name">Enter Your Name to Join:</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          className="input-element"
          onChange={(e) => setName(e.target.value)}
          disabled={isJoined} // Disable input after joining
        />
        <button
          type="button"
          className="join-button"
          onClick={joinGame}
          disabled={isJoined} // Disable button after joining
        >
          {isJoined ? "Joined" : "Join Game"} {/* Change button text */}
        </button>
      </div>
    </div>
  );
}

export default Player;
