const API_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export const fetchGames = async () => {
  try {
    const response = await fetch(
      `${API_URL}/games?key=${API_KEY}&page_size=20&ordering=-metacritic`
    );
    const data = await response.json();
    return data.results.sort((a, b) => b.metacritic - a.metacritic);
  } catch (error) {
    console.error("Error fetching games", error);
    return [];
  }
};

export const fetchGenres = async () => {
  try {
    const response = await fetch(`${API_URL}/genres?key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching genres", error);
    return [];
  }
};

export const fetchPlatforms = async () => {
  try {
    const response = await fetch(`${API_URL}/platforms?key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching platforms", error);
    return [];
  }
};

export const fetchTags = async () => {
  try {
    const response = await fetch(`${API_URL}/tags?key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching tags", error);
    return [];
  }
};

export const fetchCreators = async () => {
  try {
    const response = await fetch(`${API_URL}/creators?key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching creators", error);
    return [];
  }
};

export const fetchCreatorDetails = async (creatorId, games) => {
  try {
    const response = await fetch(
      `${API_URL}/creators/${creatorId}?key=${API_KEY}`
    );
    const data = await response.json();

    if (data.description && data.games_count > 0) {
      const description = data.description.toLowerCase();

      const matchingGames = games.filter((game) => {
        const gameName = game.name.toLowerCase();
        return description.includes(gameName);
      });
      const matchingGameNames = matchingGames.map((game) => game.name);
      return matchingGameNames;
    }
    return [];
  } catch (error) {
    console.error("Error fetching creator details", error);
    return [];
  }
};

export const searchG = async (query) => {
  try {
    const response = await fetch(
      `${API_URL}/games?key=${API_KEY}&page_size=20&search=${query}`
    );
    const data = await response.json();
    return data.results.sort((a, b) => b.metacritic - a.metacritic);
  } catch (error) {
    console.error("Error fetching search", error);
    return [];
  }
};

export const fetchId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/games/${id}?key=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Id", error);
    return null;
  }
};
