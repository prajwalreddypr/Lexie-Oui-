import React, { useState, useEffect } from "react";
import "@fontsource/poppins";
import "./Game.css";

const Game = () => {
    const words = [
        { word: "été", letter: "é" },
        { word: "frère", letter: "è" },
        { word: "garçon", letter: "ç" },
        { word: "père", letter: "è" },
        { word: "hôtel", letter: "é" },
        { word: "liberté", letter: "é" },
        { word: "éléphant", letter: "é" },
        { word: "café", letter: "é" },
        { word: "crème", letter: "è" },
        { word: "forêt", letter: "ê" },
        { word: "à", letter: "à" },
        { word: "naître", letter: "î" },
        { word: "noël", letter: "ô" },
        { word: "très", letter: "è" },
        { word: "marché", letter: "é" },
        { word: "sœur", letter: "œ" },
        { word: "pêche", letter: "è" },
        { word: "école", letter: "é" },
        { word: "voilà", letter: "à" },
        { word: "là", letter: "à" }
    ];

    const allAccents = ["é", "è", "à", "ç", "î", "ô", "œ", "ê"];
    const totalQuestions = words.length;

    const [currentWord, setCurrentWord] = useState(null);
    const [correctLetter, setCorrectLetter] = useState(null);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [isCorrect, setIsCorrect] = useState(null);
    const [accentPair, setAccentPair] = useState([]);
    const [letterSpacing, setLetterSpacing] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [dyslexiaLevel, setDyslexiaLevel] = useState(null);

    const handleAnswerClick = (selectedLetter) => {
        if (selectedLetter === correctLetter) {
            setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
            setIsCorrect(true);
        } else {
            setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
            setIsCorrect(false);
        }

        if (currentQuestion + 1 >= totalQuestions) {
            calculateDyslexiaLevel();
            setCompleted(true);
        } else {
            setCurrentQuestion(prev => prev + 1);
            pickNewWord();
        }
    };

    const calculateDyslexiaLevel = () => {
        const percentage = (score.correct / totalQuestions) * 100;
        if (percentage >= 90) {
            setDyslexiaLevel("No significant signs of dyslexia");
        } else if (percentage >= 70) {
            setDyslexiaLevel("Mild dyslexia");
        } else if (percentage >= 50) {
            setDyslexiaLevel("Moderate dyslexia");
        } else {
            setDyslexiaLevel("Severe dyslexia");
        }
    };

    const pickNewWord = () => {
        const selectedWord = words[currentQuestion];
        setCurrentWord(selectedWord);
        setCorrectLetter(selectedWord.letter);

        const availableAccents = allAccents.filter(acc => acc !== selectedWord.letter);
        const randomAccentIndex = Math.floor(Math.random() * availableAccents.length);
        const secondAccent = availableAccents[randomAccentIndex];

        const shuffledAccentPair = Math.random() > 0.5
            ? [selectedWord.letter, secondAccent]
            : [secondAccent, selectedWord.letter];

        setAccentPair(shuffledAccentPair);
    };

    useEffect(() => {
        if (!completed) {
            pickNewWord();
        }
    }, [currentQuestion, completed]);

    if (completed) {
        return (
            <div className="results-container">
                <h2>Assessment Complete!</h2>
                <div className="results-card">
                    <h3>Your Results</h3>
                    <div className="score-summary">
                        <p>Correct Answers: <span className="correct-score">{score.correct}</span></p>
                        <p>Incorrect Answers: <span className="incorrect-score">{score.incorrect}</span></p>
                        <p>Total Questions: {totalQuestions}</p>
                    </div>
                    <div className="dyslexia-level">
                        <h4>Dyslexia Assessment:</h4>
                        <p className={`level ${dyslexiaLevel.toLowerCase().includes('no') ? 'no-dyslexia' : 'has-dyslexia'}`}>
                            {dyslexiaLevel}
                        </p>
                    </div>
                    <p className="disclaimer">
                        Note: This is a preliminary assessment and not a definitive diagnosis.
                        Please consult a professional for a comprehensive evaluation.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="game-container">
            <h2 className="game-title">French Accent Master</h2>
            <p className="game-subtitle">Identify the correct accented character in the word</p>
            <div className="progress-bar">
                <div
                    className="progress"
                    style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
                ></div>
            </div>
            <p className="question-count">Question {currentQuestion + 1} of {totalQuestions}</p>

            {currentWord && (
                <div className="word-display">
                    <div className="word-container">
                        <span className="word-label">Word: </span>
                        <p
                            className="target-word"
                            style={{ letterSpacing: `${letterSpacing}px` }}
                        >
                            {currentWord.word}
                        </p>
                        <div className="letter-spacing">
                            <label>Letter Spacing: {letterSpacing}px</label>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                value={letterSpacing}
                                onChange={(e) => setLetterSpacing(parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                    <p className="prompt-text">Do you see <strong>{accentPair[0]}</strong> or <strong>{accentPair[1]}</strong>?</p>
                </div>
            )}

            <div className="options">
                <button onClick={() => handleAnswerClick(accentPair[0])}>{accentPair[0]}</button>
                <button onClick={() => handleAnswerClick(accentPair[1])}>{accentPair[1]}</button>
            </div>

            {isCorrect !== null && (
                <div className={`result ${isCorrect ? "correct" : "incorrect"}`}>
                    {isCorrect ? "Correct! 🎉" : "Try Again! 💪"}
                </div>
            )}

            <div className="score">
                <p>
                    Correct: <span className="correct-score">{score.correct}</span> |
                    Incorrect: <span className="incorrect-score">{score.incorrect}</span>
                </p>
            </div>
        </div>
    );
};

export default Game;
