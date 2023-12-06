import React, { useState } from "react";
import "./Play.css";
import FlipCard from "./ReactComponents/FlipCard";
import redX from "./Images/redX.jpeg";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

let cards = JSON.parse(localStorage.getItem("cards"));
let code = JSON.parse(localStorage.getItem("code"));
let character = JSON.parse(localStorage.getItem("character"));

function Board() {
  const [showPopup, setShowPopup] = useState(true); // state for popup visibility
  const [userInput] = useState("");
  const [dropdownItems, setDropdownItems] = useState(["Home"]);

  // handles user clicking 'confirm'
  const handlePopupSubmit = () => {
    console.log(userInput);
    setShowPopup(false);
    setDropdownItems([...dropdownItems, userInput]); // hide the popup after submitting
  };

  // handles user clicking the info popup
  const handlePopupAsk = () => {
    console.log(userInput);
    setShowPopup(true);
  };

  // handles user clicking log out
  const handleLogout = () => {
    axios
      .post("http://localhost:8081/logout")
      .then((res) => {
        if (res.data === "Success") {
          // redirects user
          window.location.href = "/";
        } else {
          alert("error logging out");
        }
      })
      // catches any error
      .catch((err) => console.log(err));
  };

  const flipCards = cards.map((card) => ({
    frontImage: card.image,
    frontTitle: card.name,
    backImage: redX,
    backTitle: "",
  }));

  return (
    <div>
      {/* Popup for displaying join code and character */}
      {showPopup && (
        <div className="popup">
          <div class="headRandom">
            {/* Title for join code */}
            <h3 class="joinCode">Join Code:</h3>
            {/* Display the actual join code */}
            <p id="code">{code}</p>
          </div>
          {/* Message for sharing */}
          <h5 class="shareMessage">Share this with your friends!</h5>
          <div class="headRandom">
            {/* Title for randomized character */}
            <h3 class="randomCharacter">Your Randomized Character:</h3>
            {/* Display the player's randomized character */}
            <p id="character">{character}</p>
          </div>
          {/* Message for keeping the character a secret */}
          <h5 class="shareMessage">Keep this a secret!</h5>
          {/* Disclaimer message */}
          <p class="disclaimer">
            Don't worry if you forget the join code/character, click the
            settings button and then click "Game Info" to view this at any time!
          </p>
          {/* Confirm button for the popup */}
          <button onClick={handlePopupSubmit}>Confirm</button>
        </div>
      )}
      {/* Header section */}
      <div class="boardHead">
        {/* Game title */}
        <h1>Guess Who!</h1>
        {/* Dropdown menu for settings */}
        <Dropdown class="dropdown">
          <Dropdown.Toggle
            variant="warning"
            id="dropdown-basic"
            className="custom-dropdown-toggle"
          >
            Settings
          </Dropdown.Toggle>
  
          <Dropdown.Menu>
            {/* Shows information popup again */}
            <Dropdown.Item onClick={handlePopupAsk}>Game Info</Dropdown.Item>
            {/* Link to the home page */}
            <Dropdown.Item href="/home">Home</Dropdown.Item>
            {/* Logout option */}
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
  
      {/* Main game board */}
      <div className="fullPage">
        <div className="fullBoard">
          {/* Mapping over FlipCard components */}
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
  }  

export default Board;
