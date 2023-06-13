/* eslint-disable react/prop-types */
import "./index.css";

export default function SingleCard({ number, card, handleChoice, flipped, disabled }) {
  
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <div className="back" onClick={handleClick}>
          <div className="logo-container top-right">
            <img src="/img/logo.png" alt="Logo Unicamp" />
          </div>
          <div className="logo-container top-left">
            <img
              src="/img/logo_ftlimeira.jpg"
              alt="Logo Faculdade de Tecnologia de Limeira"
            />
          </div>
          <div className="logo-container bottom-right">
            <p>{number+1}</p>
          </div>
          <div className="text">EPIs</div>
        </div>
      </div>
    </div>
  );
}


