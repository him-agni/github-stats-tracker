import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
    setUsername("");
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="brand">
            <span className="brand__mark">GH</span>
            <span>GitHub Explorer</span>
          </Link>

          <nav className="nav" aria-label="Main navigation">
            <NavLink to="/" end>
              Search
            </NavLink>
            <NavLink to="/compare">Compare</NavLink>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <section className="hero">
            <p className="eyebrow">GitHub profile search</p>
            <h1>Search developers and compare profiles.</h1>
            <p>
              Look up a GitHub user, review public profile details, and keep
              track of recent searches.
            </p>
          </section>

          <section className="panel panel--padded">
            <form className="search-form" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="username">
                GitHub username
              </label>

              <div className="search-row">
                <input
                  id="username"
                  className="input"
                  type="text"
                  placeholder="Enter a GitHub username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button className="button button--primary" type="submit">
                  Search Profile
                </button>
              </div>
            </form>
          </section>

          <section className="section-stack">
            <div className="panel panel--padded">
              <div className="section-head">
                <h2>Recent searches</h2>
                {recentSearches.length > 0 && (
                  <button
                    className="button button--secondary"
                    type="button"
                    onClick={clearRecentSearches}
                  >
                    Clear
                  </button>
                )}
              </div>

              {recentSearches.length > 0 ? (
                <div className="chip-list">
                  {recentSearches.map((user) => (
                    <button
                      key={user}
                      className="chip"
                      type="button"
                      onClick={() => navigate(`/user/${user}`)}
                    >
                      {user}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="muted-text">
                  Your recent searches will appear here.
                </p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SearchPage;
