import React, { useState } from 'react';
import './Play.css';
import FlipCard from './ReactComponents/FlipCard';
import dogImage from './Images/dog.jpeg';
import redX from './Images/redX.jpeg';
import Dropdown from 'react-bootstrap/Dropdown';


const Board = () => {
  const [showPopup, setShowPopup] = useState(true); // State for popup visibility
  const [userInput, setUserInput] = useState(''); 
  const [dropdownItems, setDropdownItems] = useState([
    "Home"
  ]);


  // Function to handle changes in the text input
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Function to handle the submit action
  const handlePopupSubmit = () => {
    console.log(userInput); // You can replace this with any action you want to perform with the input
    setShowPopup(false); 
    setDropdownItems([...dropdownItems, userInput]);// Hide the popup after submitting
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
        <div class="boardHead">
        <h1>Guess Who!</h1>
        <Dropdown class="dropdown">
    <Dropdown.Toggle variant="warning" id="dropdown-basic" className="custom-dropdown-toggle">
        Settings
    </Dropdown.Toggle>

    <Dropdown.Menu>
        {dropdownItems.map((item, index) => (
            index === 1 ? 
            <Dropdown.Item key={index}>{item}</Dropdown.Item> : // Second item without href
            <Dropdown.Item href={`/${item}`} key={index}>{item}</Dropdown.Item> // Other items with href
        ))}
    </Dropdown.Menu>
</Dropdown>

      </div>


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
