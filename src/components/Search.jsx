import { useState } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      className="form-control border border-dark mb-4"
      placeholder="Search games..."
      value={query}
      onChange={handleChange}
    />
  );
};

export default Search;
