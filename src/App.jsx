import { useState, useEffect } from 'react';
import './App.css';
import CardsMemory from './components/cards/index';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [matchedCards, setMatchedCards] = useState(Array(32).fill(true)); 
  const [flippedCards, setFlippedCards] = useState(Array(32).fill(false)); 
  const [allMatched, setAllMatched] = useState(false);
  const [firstCard, setFirstCard] = useState(null); 

  useEffect(() => {
    const isAllMatched = matchedCards.every((isMatched) => !isMatched);
    setAllMatched(isAllMatched);
  }, [matchedCards]);
  useEffect(() => {
    const generatePairs = () => {
      const numbers = [];
      while (numbers.length < 32) {
        const randomNumber = Math.floor(Math.random() * 33);
        if (!numbers.includes(randomNumber)) {
          numbers.push(randomNumber, randomNumber); // Adiciona o par diretamente
        }
      }
      return numbers.sort(() => Math.random() - 0.5); // Embaralha
    };
    setNumbers(generatePairs());
  }, []);

  const handleClick = (index) => {
  
    if (!matchedCards[index] || flippedCards[index] || flippedCards.filter(v => v).length >= 2) return;

    const newFlipped = [...flippedCards];
    newFlipped[index] = true;
    setFlippedCards(newFlipped);

    if (firstCard === null) {
      setFirstCard({ index, number: numbers[index] });
    } else {
      
      if (numbers[index] === firstCard.number) {
        const newMatched = [...matchedCards];
        newMatched[index] = false;
        newMatched[firstCard.index] = false;
        setMatchedCards(newMatched);
      }
      
      
      setTimeout(() => {
        setFlippedCards(Array(32).fill(false));
        setFirstCard(null);
      }, 1000);
    }
  };

  return  (
    <>
     <h1>Memory Game</h1>
    <div className="container">
     
      {allMatched ? (
        <div className="victory-screen">
          <h2>Parabéns! Você completou o jogo! 🎉</h2>
          <button 
            className="play-again-btn"
            onClick={() => window.location.reload()}
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="cards-container">
          {numbers.map((number, index) => (
            <CardsMemory
              key={index}
              onClick={() => handleClick(index)}
              isFlipped={flippedCards[index]}
              isMatched={!matchedCards[index]}
            >
              {number}
            </CardsMemory>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default App;