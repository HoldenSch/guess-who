import React, { useState } from 'react';
import './Play.css';
import FlipCard from './ReactComponents/FlipCard';
import redX from './Images/redX.jpeg';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

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

  const handleLogout = () => {
    axios.post('http://localhost:8081/logout')
    .then(res => {
      if (res.data === "Success"){
        window.location.href = '/';
      }
      else {
        alert('error logging out');
      }
      })
      // catches any error
      .catch(err => console.log(err));
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
            <h3 class="joinCode">Join Code:</h3> 
            <p id="code">{code}</p>
          </div>
          <h5 class="shareMessage">Share this with your friends!</h5>
          <div class="headRandom">
            <h3 class="randomCharacter">Your Randomized Character:</h3> 
            <p id="character">{character}</p>
          </div>
          <h5 class="shareMessage">Keep this a secret!</h5>
          <p class="disclaimer">Don't worry if you forget the join code/character, click the settings button to view them at any time!</p>
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
        <Dropdown.Item href="/home">Home</Dropdown.Item>
        <Dropdown.Item>Game Code: {code}</Dropdown.Item>
        <Dropdown.Item>Answer: {character}</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
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
