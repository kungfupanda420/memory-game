import'./SingleCard.css'
function SingleCard({ card, handleChoice, flipped,disabled }) {
    const handleClick = () => {
      if(!disabled){
        handleChoice(card);
      }
      
    };
  
    return (
      <div className="card" >
        <div className={`card ${flipped ? "flipped" : ""}`}>
            
        <img className="front" src={`${card.src}`} alt="card front" />
        <img className="back" src="cover.png" onClick={handleClick} alt="card back" />
      
        </div>
      </div>
    );
  }
  
  export default SingleCard;
  