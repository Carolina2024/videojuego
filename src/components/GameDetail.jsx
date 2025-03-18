const GameDetail = ({ game }) => {
  if (!game) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h1 className="game-title mb-4 text-center">DETAIL</h1>
      <h2 className="mb-4 mt-4 text-center">{game.name}</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <img
            src={
              game.background_image ||
              "https://thumbs.dreamstime.com/z/plantilla-para-una-ilustraci%C3%B3n-de-p%C3%A1gina-error-oops-no-concepto-fundado-errorcomputer-con-pagea-persona-que-puede-cargar-un-191091130.jpg?text=No+Image"
            }
            alt={game.name}
            className="img-fluid rounded mb-4 animated-image"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <p className="mt-4">
            <strong>Género:</strong> {game.genres.map((g) => g.name).join(", ")}
          </p>
        </div>

        <div className="col-12">
          <p>
            <strong>Puntuación:</strong>{" "}
            {game.metacritic !== null && game.metacritic !== undefined
              ? game.metacritic
              : "No disponible"}
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <p>
            <strong>Plataformas:</strong>{" "}
            {game.platforms.map((p) => p.platform.name).join(", ")}
          </p>
        </div>

        <div className="col-12">
          <p>
            <strong>Año de lanzamiento:</strong> {game.released}
          </p>
        </div>
      </div>

      {game.clip && (
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <video controls className="img-fluid mb-4">
              <source src={game.clip.clip} type="video/mp4" />
              Tu navegador no soporta video
            </video>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-12">
          <p>
            <strong>Descripción:</strong> {game.description_raw}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
