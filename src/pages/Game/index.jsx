import { useState, useEffect, useRef } from "react";
import "./index.css";
import SingleCard from "../../components/SingleCard";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const cardImages = [
  { src: "/public/img/epi1.jpg", matched: false },
  { src: "/public/img/epi2.jpg", matched: false },
  { src: "/public/img/epi3.jpg", matched: false },
  { src: "/public/img/epi4.jpg", matched: false },
  { src: "/public/img/epi5.jpg", matched: false },
  { src: "/public/img/epi6.jpg", matched: false },
];
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
}
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export function Game() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [counter, setCounter] = useState(0);
  const {auth} = useAuth();
  const navigate = useNavigate();
  
  if(!auth) {
    window.location.href = "/"
  }
    
    useInterval(() => {
      setCounter(counter + 1);
    }, 1000);
  

  // shuffle cards for new game
  const shuffleCards = () => {
    
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const handleChangeName = () => {
    navigate("/");
  }
  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
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
    }
  }, [choiceOne, choiceTwo]);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // start new game automagically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Jogo da memória dos EPIs</h1>
      <div className="container">
        <button onClick={shuffleCards}>Novo Jogo</button>
        <p>Tempo : {formatTime(counter)}</p>
        <p>Tentativas : {turns}</p>
        <button onClick={handleChangeName}>Mudar nome</button>
      </div>
      <div className="card-grid">
        {cards.map((card, index) => (
          <SingleCard
            key={index}
            number={index}
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

export default Game;
