import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import './FlipCard.css';

// This functional component represents a flip card with front and back content.
const FlipCard = ({ frontImage, frontTitle, backImage, backTitle }) => {
  // State to track whether the card is flipped or not.
  const [isFlipped, setIsFlipped] = useState(false);

  // Function to handle click events and toggle the flip state.
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    // The outer div represents the flip card container.
    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="flip-card-inner">
        {/* Front side of the card */}
        <div className="flip-card-front">
          <Card>
            {/* Display front image */}
            <Card.Img variant="top" src={frontImage} className="card-img-custom" />
            <Card.Body>
              {/* Display front title */}
              <Card.Title className="card-title-custom">{frontTitle}</Card.Title>
            </Card.Body>
          </Card>
        </div>
        {/* Back side of the card */}
        <div className="flip-card-back">
          <Card>
            {/* Display back image */}
            <Card.Img variant="top" src={backImage} className="card-img-custom" />
            <Card.Body>
              {/* Display back title */}
              <Card.Title className="card-title-custom">{backTitle}</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;