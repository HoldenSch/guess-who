import React from "react";
import "./Play.css";
import Dropdown from "react-bootstrap/Dropdown";

const Play = () => {
  return (
    <div>
      <body>
        <div class="gameName">
          <p>Guess Who!</p>
          <Dropdown class="dropdown">
          <Dropdown.Toggle variant="warning" id="dropdown-basic">
            Settings
          </Dropdown.Toggle>

          <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
        </Dropdown>
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
