import { useState, useEffect } from "react";
import {
  fetchGames,
  fetchGenres,
  fetchPlatforms,
  fetchTags,
  fetchCreators,
  fetchCreatorDetails,
  searchG,
} from "../services/api";
import GameList from "../components/GameList";
import Search from "../components/Search";

const Home = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [tags, setTags] = useState([]);
  const [creators, setCreators] = useState([]);
  const [filters, setFilters] = useState({
    year: "",
    genre: "",
    platform: "",
    tag: "",
    creator: "",
  });

  const [uniqueYears, setUniqueYears] = useState([]);
  const [creatorGames, setCreatorGames] = useState([]);

  useEffect(() => {
    const loadGames = async () => {
      const data = await fetchGames();
      const sortedGames = data.sort((a, b) => b.metacritic - a.metacritic);
      setGames(sortedGames);
      setFilteredGames(sortedGames);

      const years = [
        ...new Set(
          sortedGames
            .map((game) => game.released?.split("-")[0])
            .filter(Boolean)
        ),
      ].sort((a, b) => b - a);
      setUniqueYears(years);
    };

    const loadGenres = async () => {
      const genreData = await fetchGenres();
      setGenres(genreData);
    };

    const loadPlatforms = async () => {
      const platformData = await fetchPlatforms();
      setPlatforms(platformData);
    };

    const loadTags = async () => {
      const tagData = await fetchTags();
      setTags(tagData);
    };

    const loadCreators = async () => {
      const creatorData = await fetchCreators();
      setCreators(creatorData);
    };

    loadGames();
    loadGenres();
    loadPlatforms();
    loadTags();
    loadCreators();
  }, []);

  useEffect(() => {
    setFilteredGames(games);
  }, [games]);

  const handleSearch = async (query) => {
    if (query.trim() === "") {
      const allGames = await searchG("");
      const sortedGames = allGames.sort((a, b) => b.metacritic - a.metacritic);
      setFilteredGames(games);

      const years = [
        ...new Set(
          sortedGames
            .map((game) => game.released?.split("-")[0])
            .filter(Boolean)
        ),
      ].sort((a, b) => b - a);
      setUniqueYears(years);
      return;
    }
    const data = await searchG(query);
    const sortedGames = data.sort((a, b) => b.metacritic - a.metacritic);
    const queryLower = query.toLowerCase();
    const searchWords = queryLower.split(" ").filter(Boolean);
    const filtered = sortedGames.filter((game) => {
      return searchWords.every((word) =>
        game.name.toLowerCase().includes(word)
      );
    });

    setFilteredGames(filtered);

    const years = [
      ...new Set(
        sortedGames.map((game) => game.released?.split("-")[0]).filter(Boolean)
      ),
    ].sort((a, b) => b - a);
    setUniqueYears(years);
  };

  const handleFilterChange = async (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));

    if (name === "creator" && value) {
      const selectedCreator = creators.find(
        (creator) => creator.name === value
      );

      if (selectedCreator) {
        const matchingGames = await fetchCreatorDetails(
          selectedCreator.id,
          games
        );
        setCreatorGames(matchingGames);
      }
    } else if (name === "creator" && value === "") {
      setCreatorGames([]);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = [...games];

    if (filters.year) {
      filtered = filtered.filter((game) =>
        game.released?.startsWith(filters.year)
      );
    }
    if (filters.genre) {
      filtered = filtered.filter((game) =>
        game.genres.some((g) => g.name === filters.genre)
      );
    }
    if (filters.platform) {
      filtered = filtered.filter((game) => {
        return game.platforms?.some(
          (p) => p.platform.name === filters.platform
        );
      });
    }
    if (filters.tag) {
      filtered = filtered.filter((game) =>
        game.tags.some((t) => t.name === filters.tag)
      );
    }

    if (filters.creator) {
      filtered = filtered.filter((game) => {
        if (creatorGames.length > 0) {
          return creatorGames.includes(game.name);
        }
        return false;
      });
    }

    setFilteredGames(filtered);
  };

  return (
    <div className="container mt-4">
      <h1 className="game-title text-center mb-4">VIDEOGAMES</h1>
      <Search onSearch={handleSearch} />

      <div className="card p-3 mb-4 shadow-sm bg-dark">
        <div className="row g-3 justify-content-center">
          <div className="col-md-2 mb-4 mt-3">
            <label className="form-label text-white">Year</label>
            <select
              className="form-select w-100"
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2 mb-4 mt-3">
            <label className="form-label text-white">Genre</label>
            <select
              className="form-select w-100"
              name="genre"
              value={filters.genre}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2 mb-4 mt-3">
            <label className="form-label text-white">Platform</label>
            <select
              className="form-select w-100"
              name="platform"
              value={filters.platform}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              {platforms.length > 0 ? (
                platforms.map((platform, index) => (
                  <option key={index} value={platform.name}>
                    {platform.name}
                  </option>
                ))
              ) : (
                <option>No hay plataformas disponibles</option>
              )}
            </select>
          </div>

          <div className="col-md-2 mb-4 mt-3">
            <label className="form-label text-white">Tag</label>
            <select
              className="form-select w-100"
              name="tag"
              value={filters.tag}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2 mb-4 mt-3">
            <label className="form-label text-white">Creator</label>
            <select
              className="form-select w-100"
              name="creator"
              value={filters.creator}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              {creators.map((dev) => (
                <option key={dev.id} value={dev.name}>
                  {dev.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <GameList games={filteredGames} />
    </div>
  );
};

export default Home;
