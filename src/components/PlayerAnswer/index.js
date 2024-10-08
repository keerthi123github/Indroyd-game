import React, { useState } from "react";
import "./index.css";

function PlayerAnswer({ playerName, question, onAnswerSubmit }) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setSelectedAnswer(e.target.value);
    setErrorMessage(""); // Clear the error message when an option is selected
  };

  const submitAnswer = () => {
    if (selectedAnswer) {
      onAnswerSubmit(selectedAnswer, playerName);
      setErrorMessage(""); // Clear the error message on successful submission
    } else {
      setErrorMessage("Select any option above"); // Show error if no option is selected
    }
  };

  return (
    <div className="answer-container">
      <h3 className="choose-answer">{playerName}, choose your answer:</h3>
      <div className="options-container">
        {question.options.map((opt, index) => (
          <div className="option-container" key={index}>
            <input
              type="radio"
              id={`option-${index}`}
              className="option-element"
              name={`answer-${playerName}`}
              value={opt.charAt(0)}
              onChange={handleChange}
            />
            <label htmlFor={`option-${index}`} className="option">
              {opt}
            </label>
          </div>
        ))}
      </div>
      {errorMessage && <p className="error-message">* {errorMessage}</p>}
      <button type="button" className="submit-button" onClick={submitAnswer}>
        Submit Answer
      </button>
    </div>
  );
}

export default PlayerAnswer;
