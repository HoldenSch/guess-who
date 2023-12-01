import React from "react";
import "./Play.css";
import FlipCard from "./ReactComponents/FlipCard";
import dogImage from "./Images/dog.jpeg";
import redX from "./Images/redX.jpeg";

const Board = () => {
  // Array of objects representing flip cards
  const flipCards = [
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    { frontImage: dogImage, frontTitle: "Front Title 1", backImage: redX, backTitle: "" },
    
   
    // Add more objects as needed
  ];

  return (
    <div className="fullPage">
      <div className="fullBoard"> 
      {flipCards.map((card, index) => (
        <FlipCard 
          key={index}
          frontImage={card.frontImage}
          frontTitle={card.frontTitle}
          backImage={card.backImage}
          backTitle={card.backTitle}
        />
      ))}
      </div>
    </div>
  );
};

export default Board;
