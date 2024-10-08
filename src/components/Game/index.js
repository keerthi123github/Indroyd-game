import React, { useState, useEffect } from "react";
import PlayerAnswer from "../PlayerAnswer";
import Modal from "react-modal";
import "./index.css";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Paris", "C) Rome", "D) Madrid"],
    correct: "B",
  },
  {
    question: "What is 5 + 7?",
    options: ["A) 10", "B) 11", "C) 12", "D) 13"],
    correct: "C",
  },
  {
    question: "What is the capital of Japan?",
    options: ["A) Seoul", "B) Tokyo", "C) Beijing", "D) Bangkok"],
    correct: "B",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["A) Mars", "B) Earth", "C) Saturn", "D) Jupiter"],
    correct: "D",
  },
  {
    question: "What element does O represent on the periodic table?",
    options: ["A) Oxygen", "B) Osmium", "C) Oganesson", "D) Oxide"],
    correct: "A",
  },
  {
    question: "What is the boiling point of water?",
    options: ["A) 50°C", "B) 75°C", "C) 100°C", "D) 150°C"],
    correct: "C",
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    options: [
      "A) Charles Dickens",
      "B) William Shakespeare",
      "C) J.K. Rowling",
      "D) Mark Twain",
    ],
    correct: "B",
  },
  {
    question: "Which continent is the Sahara Desert located?",
    options: ["A) Asia", "B) South America", "C) Africa", "D) Australia"],
    correct: "C",
  },
  {
    question: "Which gas is most abundant in the Earth’s atmosphere?",
    options: ["A) Oxygen", "B) Hydrogen", "C) Nitrogen", "D) Carbon Dioxide"],
    correct: "C",
  },
  {
    question: "What is the largest mammal?",
    options: ["A) Elephant", "B) Whale Shark", "C) Blue Whale", "D) Giraffe"],
    correct: "C",
  },
];

Modal.setAppElement("#root");

function Game({ players, onGameReset }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [scores, setScores] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [topPlayer, setTopPlayer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const submitAnswer = (answer, playerName) => {
    if (answer === questions[currentQuestion].correct) {
      setFeedback(`Correct, ${playerName}!`);
      setScores((prevScores) => ({
        ...prevScores,
        [playerName]: (prevScores[playerName] || 0) + 1,
      }));
    } else {
      setFeedback(`Incorrect, ${playerName}.`);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setFeedback("");
      } else {
        setGameOver(true);
        setIsModalOpen(true); // Open modal on game over
      }
    }, 2000);
  };

  useEffect(() => {
    if (gameOver) {
      const highestScore = Math.max(...Object.values(scores));
      const topScorer = Object.keys(scores).find(
        (player) => scores[player] === highestScore
      );
      setTopPlayer(topScorer || "No players");
    }
  }, [gameOver, scores]);

  const closeModal = () => {
    setIsModalOpen(false);
    onGameReset(); // Reset the game when modal is closed
  };

  return (
    <div className="game-container">
      {gameOver ? (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Game Over"
          className="modal-container"
        >
          <div className="score-container">
            <h2 className="game-over">Game Over! Final Scores:</h2>
            <ul>
              {Object.entries(scores).map(([player, score]) => (
                <li className="player-score" key={player}>
                  {`${player}, score is ${score}`}
                </li>
              ))}
            </ul>
          </div>
          <h3 className="top-player">
            {topPlayer} answered the most questions correctly!
          </h3>
          <button type="button" className="close-button" onClick={closeModal}>
            Close
          </button>
        </Modal>
      ) : (
        <>
          <h1 className="question">{questions[currentQuestion].question}</h1>
          <p className="feed-back">{feedback}</p>
          {players.map((player) => (
            <PlayerAnswer
              key={player}
              playerName={player}
              question={questions[currentQuestion]}
              onAnswerSubmit={submitAnswer}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Game;
