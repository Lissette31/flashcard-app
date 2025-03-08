import { useState } from "react";
import Flashcard from "./components/Flashcard";
import "./App.css"; 


export default function App() {
  const countryFacts = [
    { 
      question: "Which country has the most people?", 
      answer: "China (1.4 billion)", 
      image: "https://flagcdn.com/w320/cn.png" 
    },
    { 
      question: "Which country has the largest land area?", 
      answer: "Russia", 
      image: "https://flagcdn.com/w320/ru.png" 
    },
    { 
      question: "Which country has the most official languages?", 
      answer: "Zimbabwe (16 languages)", 
      image: "https://flagcdn.com/w320/zw.png" 
    },
    { 
      question: "What is the smallest country in the world?", 
      answer: "Vatican City", 
      image: "https://flagcdn.com/w320/va.png" 
    },
    { 
      question: "Which country is known as the Land of the Rising Sun?", 
      answer: "Japan", 
      image: "https://flagcdn.com/w320/jp.png" 
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  function nextCard() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % countryFacts.length);
  }

  function prevCard() {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? countryFacts.length - 1 : prevIndex - 1
    );
  }

  return (
    <div className="App">
      <h1>🌎 Country Flashcards 🌎</h1>
      <h2> How well do you know countries? Test your knowledge of world facts in this fun and fast-paced card game!</h2>
      <h3 id="card-count">Total Cards: 5</h3>
      <Flashcard card={countryFacts[currentIndex]} />
      <div className="button-container">
        <button onClick={prevCard}>⬅ Back</button>
        <button onClick={nextCard}>Next ➡</button>
      </div>
    </div>
  );
}