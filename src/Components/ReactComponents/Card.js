import React from 'react';
import Card from 'react-bootstrap/Card';
function CustomCard(props) {
  const { imageSrc, title } = props;

  return (
    <Card style={{ width: "10vw",  margin:"20px", border:"none"}}>
      <Card.Img variant="top" src={imageSrc} style={{ height: "20vh", objectFit:"cover" }}/>
      <Card.Body style={{height: "4vh"}}>
        <Card.Title style={{fontSize:"15px", fontFamily: "Gilroy-Medium, sans-serif", marginTop:"-4px", textAlign:"center"}}>{title}</Card.Title>
        {props.children}
      </Card.Body>
    </Card>
  );
}

export default CustomCard;
