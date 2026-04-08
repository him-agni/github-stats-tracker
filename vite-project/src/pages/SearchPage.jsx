import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchStore } from "../store/useSearchStore";

function SearchPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const addRecentSearch = useSearchStore((state) => state.addRecentSearch);
  const recentSearches = useSearchStore((state) => state.recentSearches);
  const clearRecentSearches = useSearchStore(
    (state) => state.clearRecentSearches,
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername) return;
    addRecentSearch(trimmedUsername);
    navigate(`/user/${trimmedUsername}`);
  };

  return (
    <div>
      <h1>GitHub Stats Tracker</h1>
      <p>Search for a GitHub username</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>

        <p>
          <Link to="/compare">Go to Compare Page</Link>
        </p>
      </form>
      {recentSearches.length > 0 && (
        <div>
          <h2>Recent Searches</h2>
          <ul>
            {recentSearches.map((user) => (
              <li key={user}>
                <button onClick={() => navigate(`/user/${user}`)}>
                  {user}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={clearRecentSearches}>Clear Recent Searches</button>
    </div>
  );
}

export default SearchPage;
