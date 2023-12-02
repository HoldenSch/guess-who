import React, { useState } from 'react';
import './Play.css';
import FlipCard from './ReactComponents/FlipCard';
import dogImage from './Images/dog.jpeg';
import redX from './Images/redX.jpeg';
import Dropdown from 'react-bootstrap/Dropdown';

let cards = JSON.parse(localStorage.getItem('cards'));
let code = JSON.parse(localStorage.getItem('code'));
let character = JSON.parse(localStorage.getItem('character'));


// window.onload = function() {
//   console.log(cards);
// };


function Board () {
  const [showPopup, setShowPopup] = useState(true); // State for popup visibility
  const [userInput, setUserInput] = useState(''); 
  const [dropdownItems, setDropdownItems] = useState([
    "Home"
  ]);

  // Function to handle the submit action
  const handlePopupSubmit = () => {
    console.log(userInput); // You can replace this with any action you want to perform with the input
    setShowPopup(false); 
    setDropdownItems([...dropdownItems, userInput]);// Hide the popup after submitting
  };

  

  const flipCards = cards.map(card => ({
    frontImage: card.image,
    frontTitle: card.name,
    backImage: redX,
    backTitle: ""
}));

  return (
    <div>
      {showPopup && (
        <div className="popup">
          <div class="headRandom">
            <h3 class="joinCode">Join Code</h3> 
            <p id="code">{code}</p>
          </div>
          <h5>Share this with your friends!</h5>
          <div class="headRandom">
            <h3 class="randomCharacter">Your Randomized Character</h3> 
            <p id="character">{character}</p>
          </div>
          <h5>Keep this a secret!</h5>
          <p>Don't worry if you forget the join code/character, click the settings button to view them at any time!</p>
          <button onClick={handlePopupSubmit}>Confirm</button>
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
