import React from "react";

// Styling
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Inline styling
const favStyle = {
  fontWeight: "bold",

  color: "#ff0063",
};

const basicStyle = {
  color: "#898276",
};

export default function Results({ error, search, favourites, addFav }) {
  //function changes the colour of the heart if already flagged as a favourite
  function isFav(trackId) {
    if (favourites.some((favourite) => favourite.trackId === trackId)) {
      return favStyle;
    } else {
      return basicStyle;
    }
  }

  //maps through the search results and creates a card to display each result
  const searchCard = search.map((result) => (
    <Col key={result.trackId.toString()} className="colcard">
      <Card className="card">
        <Card.Header>
          <FontAwesomeIcon
            icon={["fas", "heart"]}
            className="icons"
            style={isFav(result.trackId)}
            onClick={() => addFav(result)}
          />
        </Card.Header>
        <Card.Img
          className="cardimg"
          variant="top"
          src={result.artworkUrl100}
        />
        <Card.Body>
          <Card.Title className="cardtitle">
            {result.trackName}
            <br />
          </Card.Title>
          <Card.Text className="cardtext">
            Artist: {result.artistName} <br />
            <br />
            Type: {result.kind}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ));
  return (
    <Container fluid className="card-container">
      {search && <h1>Search Results</h1>}
      {error && <p className="searchError">{error}</p>}

      <Row className="cardrow" xs={1} md={2} lg={3}>
        {searchCard}
      </Row>
    </Container>
  );
}
