import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const GameList = ({ games }) => {
  if (!games.length) return <p>No games found</p>;

  return (
    <div className="row g-4 justify-content-center">
      {games.map((game) => (
        <div className="col-12 d-flex justify-content-center" key={game.id}>
          <Card
            className="shadow-sm bg-dark text-white"
            style={{ width: "100%", maxWidth: "350px" }}
          >
            <Card.Img
              variant="top"
              src={
                game.background_image ||
                "https://thumbs.dreamstime.com/z/plantilla-para-una-ilustraci%C3%B3n-de-p%C3%A1gina-error-oops-no-concepto-fundado-errorcomputer-con-pagea-persona-que-puede-cargar-un-191091130.jpg?text=No+Image"
              }
              alt={game.name}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>{game.name}</Card.Title>
              <p className="text-white">
                <strong>Puntuación: </strong>
                <span
                  className="badge rounden-pill"
                  style={{ backgroundColor: "green" }}
                >
                  {game.metacritic !== null && game.metacritic !== undefined
                    ? game.metacritic
                    : "No disponible"}
                </span>
              </p>
              <Link to={`/games/${game.id}`}>
                <Button variant="light" className="w-100">
                  See more
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default GameList;
