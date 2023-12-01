import React, { useState } from 'react';
import './Play.css';
import FlipCard from './ReactComponents/FlipCard';
import dogImage from './Images/dog.jpeg';
import redX from './Images/redX.jpeg';

const Board = () => {
  const [showPopup, setShowPopup] = useState(true); // State for popup visibility
  const [userInput, setUserInput] = useState(''); // State for storing user input

  // Function to handle changes in the text input
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Function to handle the submit action
  const handlePopupSubmit = () => {
    console.log(userInput); // You can replace this with any action you want to perform with the input
    setShowPopup(false); // Hide the popup after submitting
  };

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
    <div>
      {showPopup && (
        <div className="popup">
          <div class="headRandom">
          <p class="popupHeading">Choose Your Character</p> 
          <button class="randomButton">Random</button>
          </div>
          <input type="text" placeholder="Enter Text Here" onChange={handleInputChange} />
          <button onClick={handlePopupSubmit}>Enter</button>
        </div>
      )}
      <h1 style={{ display: "block", fontFamily: "Gilroy-Bold, sans-serif", fontSize: "5.8vw", marginTop: "45px", textAlign:"center" }}>Guess Who!</h1>
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
    </div>
  );
};

export default Board;
