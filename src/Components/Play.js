import React, { useState } from "react";
import "./Play.css";
import Dropdown from "react-bootstrap/Dropdown";
import axios from 'axios';



function Play () {
  const [values, setValues] = useState({
    gameCode: ''});
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // posts server.js '/host_join' function
    axios.post('http://localhost:8081/host_join', {code1: values.gameCode.toString()})
    .then(res => {
      // if invalid delete, prompt the user to retype
      if (res.data === "Not Logged In") {
        alert('please log in')
      }
      else if (res.data === "Code not found" || res.data === 'Error') {
        alert('code not found, please retry')
      }
      else {
        // sets up the board
        let cards = res.data[0]
        let code = res.data[1]
        let character = res.data[2]
        localStorage.setItem('cards', JSON.stringify(cards));
        localStorage.setItem('code', JSON.stringify(code));
        localStorage.setItem('character', JSON.stringify(character));
          window.location.href = '/Board';
      }
    })
    // catches any error
    .catch(err => console.log(err));
  }
// handles user logout
  const handleLogout = () => {
    axios.post('http://localhost:8081/logout')
    .then(res => {
      if (res.data === "Success"){
        // redirects to login page
        window.location.href = '/';
      }
      else {
        alert('error logging out');
      }
    })
      // catches any error
    .catch(err => console.log(err));
  };
  return (
    <div>
      {/* Start of the page body */}
      <body>
        {/* Game name and header */}
        <div class="gameName">
          <div class="headerContainer">
            {/* Game title */}
            <p>Guess Who!</p>
            {/* Dropdown menu for settings */}
            <div class="dropdown1">
              <Dropdown>
                <Dropdown.Toggle variant="warning" id="dropdown-basic" class="playdropdown">
                  Settings
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* Link to the home page */}
                  <Dropdown.Item href="/home">Home</Dropdown.Item>
                  {/* Logout option */}
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        {/* Start menu */}
        <div class="startMenu">
          <form class="enterCode" onSubmit={handleSubmit}>
            <div class="fullGame">
              {/* Input field for entering the game code */}
              <input
                type="text"
                id="gameCode"
                name="gameCode"
                placeholder="Enter Game Code"
                onChange={handleInput}
              ></input>
              {/* Button for joining the game */}
              <input class="joinButton" type="submit" value="Join"></input>
            </div>
          </form>
          {/* Button for creating a private room */}
          <div class="createRoom d-grid gap-2 col-11 mx-auto">
            <button
              class="btn btn-primary"
              type="button"
              onClick={() => window.location.href = '/Room'}
            >
              Create Private Room
            </button>
          </div>
        </div>
      </body>
    </div>
  );  
}

export default Play;
