import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import Navbar from './components/Navbar';

const cardImages = [
  { src: "helmet-1.png", matched: false },
  { src: "potion-1.png", matched: false },
  { src: "ring-1.png", matched: false },
  { src: "scroll-1.png", matched: false },
  { src: "shield-1.png", matched: false },
  { src: "sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerMoves, setPlayerMoves] = useState([0, 0]);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setTimer(0);
    setIsActive(true);
    setCurrentPlayer(1);
    setPlayerMoves([0, 0]);
  };

  const handleChoice = (card) => {
    if (disabled) return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setCurrentPlayer(prevPlayer => (prevPlayer === 1 ? 2 : 1));
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }

      // Update moves after the turn is complete
      setPlayerMoves(prevMoves => {
        const newMoves = [...prevMoves];
        newMoves[currentPlayer - 1] += 1;
        return newMoves;
      });
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <Navbar currentPlayer={currentPlayer} timer={timer} playerMoves={playerMoves} />
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
