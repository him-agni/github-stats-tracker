import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchGitHubUser } from "../services/githubApi";

function ComparePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialUser1 = searchParams.get("user1") || "";
  const initialUser2 = searchParams.get("user2") || "";

  const [user1Input, setUser1Input] = useState(initialUser1);
  const [user2Input, setUser2Input] = useState(initialUser2);

  const user1 = searchParams.get("user1");
  const user2 = searchParams.get("user2");

  // Sync inputs with URL changes
  useEffect(() => {
    setUser1Input(initialUser1);
    setUser2Input(initialUser2);
  }, [initialUser1, initialUser2]);

  const {
    data: profile1,
    isLoading: isLoading1,
    isError: isError1,
    error: error1,
  } = useQuery({
    queryKey: ["githubUser", user1],
    queryFn: () => fetchGitHubUser(user1),
    enabled: !!user1,
  });

  const {
    data: profile2,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
  } = useQuery({
    queryKey: ["githubUser", user2],
    queryFn: () => fetchGitHubUser(user2),
    enabled: !!user2,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedUser1 = user1Input.trim();
    const trimmedUser2 = user2Input.trim();

    if (!trimmedUser1 || !trimmedUser2) return;

    setSearchParams({
      user1: trimmedUser1,
      user2: trimmedUser2,
    });
    setUser1Input("");
    setUser2Input("");
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
            <Link to="/">Search</Link>
            <Link to="/compare" className="active">
              Compare
            </Link>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <Link to="/" className="back-link">
            ← Back to search
          </Link>

          <section className="hero">
            <p className="eyebrow">Side-by-side comparison</p>
            <h1>Compare GitHub profiles</h1>
            <p>
              Enter two usernames to compare their public stats and activity.
            </p>
          </section>

          <section className="panel panel--padded">
            <form className="search-form" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="user1">
                First GitHub username
              </label>
              <label className="sr-only" htmlFor="user2">
                Second GitHub username
              </label>

              <div className="compare-inputs">
                <input
                  id="user1"
                  className="input"
                  type="text"
                  placeholder="First username (e.g. octocat)"
                  value={user1Input}
                  onChange={(e) => setUser1Input(e.target.value)}
                />
                <input
                  id="user2"
                  className="input"
                  type="text"
                  placeholder="Second username (e.g. torvalds)"
                  value={user2Input}
                  onChange={(e) => setUser2Input(e.target.value)}
                />
              </div>

              <button className="button button--primary" type="submit">
                Compare Users
              </button>
            </form>
          </section>

          <section className="section-stack">
            {(isError1 || isError2) && (
              <div className="panel panel--padded message message--error">
                {isError1 && `User 1: ${error1?.message || "Failed to load"}`}
                {isError1 && isError2 && <br />}
                {isError2 && `User 2: ${error2?.message || "Failed to load"}`}
              </div>
            )}

            <div className="compare-grid">
              <div>
                <h3 className="muted-text">
                  {isLoading1 ? "Loading..." : user1 || "No user selected"}
                </h3>
                {isLoading1 ? (
                  <div className="panel skeleton-card">
                    <div className="user-card__top">
                      <div className="skeleton-circle" />
                      <div style={{ flex: 1, display: "grid", gap: "0.75rem" }}>
                        <div
                          className="skeleton-block lg"
                          style={{ width: "55%" }}
                        />
                        <div
                          className="skeleton-block"
                          style={{ width: "35%" }}
                        />
                      </div>
                    </div>
                    <div className="skeleton-block" style={{ width: "100%" }} />
                    <div className="stats">
                      <div className="stat">
                        <div className="skeleton-block lg" />
                      </div>
                      <div className="stat">
                        <div className="skeleton-block lg" />
                      </div>
                      <div className="stat">
                        <div className="skeleton-block lg" />
                      </div>
                    </div>
                  </div>
                ) : profile1 ? (
                  <article className="panel user-card">
                    <div className="user-card__top">
                      <img
                        className="avatar"
                        src={profile1.avatar_url}
                        alt={`${profile1.login} avatar`}
                        width="88"
                        height="88"
                      />
                      <div>
                        <h2>{profile1.name || profile1.login}</h2>
                        <p className="user-handle">@{profile1.login}</p>
                      </div>
                    </div>

                    <p className="user-bio">
                      {profile1.bio || "No bio provided"}
                    </p>

                    <div className="info-list">
                      {profile1.location && (
                        <p className="info-row">
                          <strong>Location:</strong> {profile1.location}
                        </p>
                      )}
                      {profile1.company && (
                        <p className="info-row">
                          <strong>Company:</strong> {profile1.company}
                        </p>
                      )}
                    </div>

                    <div className="stats">
                      <div className="stat">
                        <span className="stat__label">Public Repos</span>
                        <span className="stat__value">
                          {profile1.public_repos.toLocaleString()}
                        </span>
                      </div>
                      <div className="stat">
                        <span className="stat__label">Followers</span>
                        <span className="stat__value">
                          {profile1.followers.toLocaleString()}
                        </span>
                      </div>
                      <div className="stat">
                        <span className="stat__label">Following</span>
                        <span className="stat__value">
                          {profile1.following.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </article>
                ) : null}
              </div>

              <div>
                <h3 className="muted-text">
                  {isLoading2 ? "Loading..." : user2 || "No user selected"}
                </h3>
                {isLoading2 ? (
                  <div className="panel skeleton-card">
                    <div className="user-card__top">
                      <div className="skeleton-circle" />
                      <div style={{ flex: 1, display: "grid", gap: "0.75rem" }}>
                        <div
                          className="skeleton-block lg"
                          style={{ width: "55%" }}
                        />
                        <div
                          className="skeleton-block"
                          style={{ width: "35%" }}
                        />
                      </div>
                    </div>
                    <div className="skeleton-block" style={{ width: "100%" }} />
                    <div className="stats">
                      <div className="stat">
                        <div className="skeleton-block lg" />
                      </div>
                      <div className="stat">
                        <div className="skeleton-block lg" />
                      </div>
                      <div className="stat">
                        <div className="skeleton-block lg" />
                      </div>
                    </div>
                  </div>
                ) : profile2 ? (
                  <article className="panel user-card">
                    <div className="user-card__top">
                      <img
                        className="avatar"
                        src={profile2.avatar_url}
                        alt={`${profile2.login} avatar`}
                        width="88"
                        height="88"
                      />
                      <div>
                        <h2>{profile2.name || profile2.login}</h2>
                        <p className="user-handle">@{profile2.login}</p>
                      </div>
                    </div>

                    <p className="user-bio">
                      {profile2.bio || "No bio provided"}
                    </p>

                    <div className="info-list">
                      {profile2.location && (
                        <p className="info-row">
                          <strong>Location:</strong> {profile2.location}
                        </p>
                      )}
                      {profile2.company && (
                        <p className="info-row">
                          <strong>Company:</strong> {profile2.company}
                        </p>
                      )}
                    </div>

                    <div className="stats">
                      <div className="stat">
                        <span className="stat__label">Public Repos</span>
                        <span className="stat__value">
                          {profile2.public_repos.toLocaleString()}
                        </span>
                      </div>
                      <div className="stat">
                        <span className="stat__label">Followers</span>
                        <span className="stat__value">
                          {profile2.followers.toLocaleString()}
                        </span>
                      </div>
                      <div className="stat">
                        <span className="stat__label">Following</span>
                        <span className="stat__value">
                          {profile2.following.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </article>
                ) : null}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ComparePage;
