import { useState } from "react";

export default function Flashcard({ card }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flashcard-container">
      <div
        className={`flashcard ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front Side (Question) */}
        <div className="flashcard-face front">
          <p>{card.question}</p>
        </div>

        {/* Back Side (Answer & Flag) */}
        <div className="flashcard-face back">
          <p>{card.answer}</p>
          <img src={card.image} alt="Country Flag" className="flag" />
        </div>
      </div>
    </div>
  );
}
