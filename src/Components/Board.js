import React from "react";
import "./Play.css";
import CustomCard from "./ReactComponents/Card";
import dogImage from "./Images/dog.jpeg";

const Board = () => {
  return (
    <div class="fullPage">
    <body>
    <CustomCard imageSrc={dogImage} title="Card Title"></CustomCard>
    </body>
    </div>
  );
};

export default Board;
