import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import './FlipCard.css';

const FlipCard = ({ frontImage, frontTitle, backImage, backTitle }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <Card>
            <Card.Img variant="top" src={frontImage} className="card-img-custom" />
            <Card.Body>
              <Card.Title className="card-title-custom">{frontTitle}</Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div className="flip-card-back">
          <Card>
            <Card.Img variant="top" src={backImage} className="card-img-custom" />
            <Card.Body>
              <Card.Title className="card-title-custom">{backTitle}</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
