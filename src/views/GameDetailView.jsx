import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchId } from "../services/api";
import GameDetail from "../components/GameDetail";

const GameDetailView = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGame = async () => {
      const data = await fetchId(id);
      setGame(data);
    };
    loadGame();
  }, [id]);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div>
      <GameDetail game={game} />
      <button className="btn btn-secondary mb-3 mt-3" onClick={handleGoBack}>
        Return Home
      </button>
    </div>
  );
};

export default GameDetailView;
