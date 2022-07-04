import React from "react";

// Styling
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import SolidTrash from "https://www.flaticon.com/free-icons/trash-can";
import { Link } from "react-router-dom";

export default function DisplayFavourites({ favourites, delFav }) {
  /* media maps through favourites array and inputs fields(artworkUrl100,
        trackName etc. ) into a card */
  const mediaCard = favourites.map((fav) => (
    <Col key={fav.trackId.toString()} className="colcard">
      <Card className="card">
        <Card.Header>
          <Link className="icons" onClick={() => delFav(fav.trackId)}>
            <SolidTrash />          
          </Link>
        </Card.Header>
        
        <Card.Img className="cardimg" variant="top" src={fav.artworkUrl100} />
        <Card.Body>
          <Card.Title className="cardtitle">{fav.trackName}</Card.Title>
          <Card.Text className="cardtext">
            Artist: {fav.artistName} <br />
            <br />
            Type: {fav.kind}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <Container fluid className="card-container">
      <h1>Favourites</h1>
      <Row className="cardrow" xs={1} md={2} lg={3}>
        {mediaCard}
      </Row>
    </Container>
  );
}