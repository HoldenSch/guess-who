import React from "react";
import "./Play.css";
import Dropdown from "react-bootstrap/Dropdown";

const Play = () => {
  return (
    <div>
      <body>
      <div class="gameName">
  <div class="headerContainer">
    <p>Guess Who!</p>
    <div class="dropdown1">
    <Dropdown>
          <Dropdown.Toggle variant="warning" id="dropdown-basic" class="playdropdown">
            Settings
          </Dropdown.Toggle>

          <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Logout</Dropdown.Item>
      </Dropdown.Menu>
        </Dropdown>
        </div>
        </div>
        </div>
        <div class="startMenu">
          <form class="enterCode">
            <div class="fullGame">
            <input
              type="text"
              id="gameCode"
              name="gameCode"
              placeholder="Enter Game Code"
            ></input>
            <input class="joinButton" type="submit" value="Join"></input>
            </div>
          </form>
          <div class="createRoom d-grid gap-2 col-11 mx-auto" >
            <button class="btn btn-primary" type="button"  onClick={() => window.location.href = '/Room'}>
              Create Private Room
            </button>
          </div>
        </div>
      </body>
    </div>
  );
};

export default Play;
