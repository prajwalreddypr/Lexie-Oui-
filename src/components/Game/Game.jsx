import React, { useState, useEffect } from "react";
import "./Game.css";

const Game = () => {
    // Word list with French words that include accented letters
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

    // List of all possible accents for random selection
    const allAccents = ["é", "è", "à", "ç", "î", "ô", "œ", "ê"];

    const [currentWord, setCurrentWord] = useState(null); // Track the current word
    const [correctLetter, setCorrectLetter] = useState(null); // Track the correct letter to look for
    const [score, setScore] = useState({ correct: 0, incorrect: 0 }); // Track correct and incorrect answers
    const [isCorrect, setIsCorrect] = useState(null); // Check if the answer is correct
    const [accentPair, setAccentPair] = useState([]); // Store the pair of accents for this round

    // State for letter spacing
    const [letterSpacing, setLetterSpacing] = useState(0);

    // Handle when the user selects an answer
    const handleAnswerClick = (selectedLetter) => {
        if (selectedLetter === correctLetter) {
            setScore({ ...score, correct: score.correct + 1 }); // Increment correct score
            setIsCorrect(true); // Show "Correct!"
        } else {
            setScore({ ...score, incorrect: score.incorrect + 1 }); // Increment incorrect score
            setIsCorrect(false); // Show "Try Again!"
        }
        // Pick a new word after an answer is selected
        pickNewWord();
    };

    // Pick a new word randomly from the list and set the correct letter
    const pickNewWord = () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        const selectedWord = words[randomIndex];
        setCurrentWord(selectedWord);
        setCorrectLetter(selectedWord.letter);

        // Filter out the correct accent from the available accents
        const availableAccents = allAccents.filter(acc => acc !== selectedWord.letter);

        // Randomly select another accent for the second option that is not in the word
        const randomAccentIndex = Math.floor(Math.random() * availableAccents.length);
        const secondAccent = availableAccents[randomAccentIndex];

        // Set the accent pair to be the correct one and a different random accent
        // Shuffle the accent pair to randomize order
        const shuffledAccentPair = Math.random() > 0.5
            ? [selectedWord.letter, secondAccent]
            : [secondAccent, selectedWord.letter];

        setAccentPair(shuffledAccentPair);
    };

    // Start the game by picking the first word
    useEffect(() => {
        pickNewWord();
    }, []);

    return (
        <div className="game-container">
            <h2>French Letter Recognition Game</h2>
            <p>Look at the word and choose the correct letter (either one of the two options).</p>

            {currentWord && (
                <div className="word-display">
                    {/* Only apply letter spacing to the word */}
                    <div className="word-container">
                        <span>Word: </span>
                        <p
                            style={{
                                letterSpacing: `${letterSpacing}px`,
                                display: "inline-block",
                                fontWeight: "bold"
                            }}
                        >
                            {currentWord.word}
                        </p>
                        {/* Slider next to the word */}
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
                    <p>Do you see <strong>{accentPair[0]}</strong> or <strong>{accentPair[1]}</strong>?</p>
                </div>
            )}

            <div className="options">
                <button onClick={() => handleAnswerClick(accentPair[0])}>{accentPair[0]}</button>
                <button onClick={() => handleAnswerClick(accentPair[1])}>{accentPair[1]}</button>
            </div>

            {isCorrect !== null && (
                <div className={`result ${isCorrect ? "correct" : "incorrect"}`}>
                    {isCorrect ? "Correct!" : "Try Again!"}
                </div>
            )}

            <div className="score">
                <p>
                    Correct: <span className="correct-score">{score.correct}</span> | Incorrect: <span className="incorrect-score">{score.incorrect}</span>
                </p>
            </div>
        </div>
    );
};

export default Game;
