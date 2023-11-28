import React from "react";
import { IoIosSettings } from "react-icons/io";
import "./Play.css";

const Play = () => {
  return (
    <div class="fullPage">
      <h1>
        <IoIosSettings class="settingsButton" />
      </h1>
      <body>
        <div class="gameName">
          <p>Guess Who!</p>
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
            <button class="btn btn-primary" type="button">
              Create Private Room
            </button>
          </div>
        </div>
      </body>
    </div>
  );
};

export default Play;
