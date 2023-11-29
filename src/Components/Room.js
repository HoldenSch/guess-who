import React from "react";
//import { IoIosSettings } from "react-icons/io";
//import "./Play.css";
import DragList from "./ReactComponents/DragList";
import ReactDOM from "react-dom";

const Room = () => {
    const rootElement = document.getElementById("root");
    ReactDOM.render(<DragList />, rootElement);
};

export default Room;
