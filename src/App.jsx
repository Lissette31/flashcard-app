import { useState } from "react";
import Flashcard from "./components/Flashcard";
import "./App.css"; 

export default function App() {
  const initialFacts = [
    { question: "Which country has the most people?", answer: "China", image: "https://flagcdn.com/w320/cn.png" },
    { question: "Which country has the largest land area?", answer: "Russia", image: "https://flagcdn.com/w320/ru.png" },
    { question: "Which country has the most official languages?", answer: "Zimbabwe", image: "https://flagcdn.com/w320/zw.png" },
    { question: "What is the smallest country in the world?", answer: "Vatican City", image: "https://flagcdn.com/w320/va.png" },
    { question: "Which country is known as the Land of the Rising Sun?", answer: "Japan", image: "https://flagcdn.com/w320/jp.png" },
  ];

  const [flashcards, setFlashcards] = useState([...initialFacts]); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuess, setUserGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]); 

  // Check if answer is correct
  function checkAnswer() {
    if (userGuess.toLowerCase().trim() === flashcards[currentIndex].answer.toLowerCase().trim()) {
      setIsCorrect(true);
      setStreak(streak + 1);
      setBestStreak(Math.max(streak + 1, bestStreak));
    } else {
      setIsCorrect(false);
      setStreak(0);
    }
    setUserGuess(""); 
  }

  // Move to next card
  function nextCard() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setIsCorrect(null);
    setUserGuess("");
  }

  // Move to previous card
  function prevCard() {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
    setIsCorrect(null);
    setUserGuess("");
  }

  // Shuffle flashcards
  function shuffleCards() {
    let shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIndex(0);
  }

  // Mark card as "Mastered" and remove it
  function masterCard() {
    const newFlashcards = flashcards.filter((_, index) => index !== currentIndex);
    const masteredCard = flashcards[currentIndex];

    if (!masteredCards.includes(masteredCard)) {
      setMasteredCards([...masteredCards, masteredCard]); 
    }

    setFlashcards(newFlashcards);
    setCurrentIndex(0);
  }

  return (
    <div className="App">
      <h1>🌎 Country Flashcards 🌎</h1>
      <h2>How well do you know countries? Test your knowledge of world facts!</h2>
  
      {/* 🔥 Streak Counter & Buttons at the Top */}
      <div className="top-container">
        <h4>🔥 Streak: {streak} | 🏆 Best Streak: {bestStreak}</h4>
        <div className="top-buttons">
          <button onClick={shuffleCards}>🔀 Shuffle</button>
          <button onClick={masterCard}>🎓 Master</button>
        </div>
      </div>
  
      <h3>Total Cards: {flashcards.length}</h3>
  
      {flashcards.length > 0 ? (
        <>
          <Flashcard card={flashcards[currentIndex]} />
  
          {/* User Input */}
          <div className="input-container">
            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="Enter your guess..."
            />
            <button className="submit-button" onClick={checkAnswer}>Submit</button>
          </div>
  
          {/* Answer Feedback */}
          {isCorrect !== null && (
            <p className={isCorrect ? "correct" : "incorrect"}>
              {isCorrect ? "✅ Correct!" : "❌ Incorrect, try again!"}
            </p>
          )}
  
          {/* Buttons */}
          <div className="button-container">
            <button onClick={prevCard}>⬅ Back</button>
            <button onClick={nextCard}>Next ➡</button>
          </div>
        </>
      ) : (
        <h3>🎉 You've mastered all the cards! 🎉</h3>
      )}
    </div>
  );
}
