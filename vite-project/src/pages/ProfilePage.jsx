import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchGitHubUser, fetchGitHubRepos } from "../services/githubApi";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function ProfilePage() {
  const { username } = useParams();

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["githubUser", username],
    queryFn: () => fetchGitHubUser(username),
    enabled: !!username,
  });

  const {
    data: repos,
    isLoading: isReposLoading,
    isError: isReposError,
    error: reposError,
  } = useQuery({
    queryKey: ["githubRepos", username],
    queryFn: () => fetchGitHubRepos(username),
    enabled: !!username,
  });

  const totalStars =
    repos?.reduce((sum, repo) => sum + repo.stargazers_count, 0) || 0;

  const totalForks =
    repos?.reduce((sum, repo) => sum + repo.forks_count, 0) || 0;

  const topRepos = [...(repos || [])]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  const chartData = topRepos.map((repo) => ({
    name: repo.name,
    stars: repo.stargazers_count,
  }));

  const languageCounts =
    repos?.reduce((acc, repo) => {
      const language = repo.language || "Unknown";
      acc[language] = (acc[language] || 0) + 1;
      return acc;
    }, {}) || {};

  const languageChartData = Object.entries(languageCounts).map(
    ([language, count]) => ({
      name: language,
      value: count,
    }),
  );

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#7c3aed",
    "#0f766e",
    "#9333ea",
  ];

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
            <Link to="/compare">Compare</Link>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <Link to="/" className="back-link">
            ← Back to search
          </Link>

          <section className="hero">
            <p className="eyebrow">Profile overview</p>
            <h1>{username}</h1>
            <p>Complete GitHub profile with repositories and activity stats.</p>
          </section>

          {/* User Profile Card */}
          {isUserLoading ? (
            <div className="panel skeleton-card">
              <div className="user-card__top">
                <div className="skeleton-circle" />
                <div style={{ flex: 1, display: "grid", gap: "0.75rem" }}>
                  <div className="skeleton-block lg" style={{ width: "55%" }} />
                  <div className="skeleton-block" style={{ width: "35%" }} />
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
          ) : isUserError ? (
            <div className="panel panel--padded message message--error">
              {userError?.message || "Failed to load user profile"}
            </div>
          ) : user ? (
            <article className="panel user-card">
              <div className="user-card__top">
                <img
                  className="avatar"
                  src={user.avatar_url}
                  alt={`${user.login} avatar`}
                  width="88"
                  height="88"
                />
                <div>
                  <h2>{user.name || user.login}</h2>
                  <p className="user-handle">@{user.login}</p>
                </div>
              </div>

              {user.bio && <p className="user-bio">{user.bio}</p>}

              <div className="info-list">
                {user.company && (
                  <p className="info-row">
                    <strong>Company:</strong> {user.company}
                  </p>
                )}
                {user.location && (
                  <p className="info-row">
                    <strong>Location:</strong> {user.location}
                  </p>
                )}
                {user.blog && (
                  <p className="info-row">
                    <strong>Website:</strong>{" "}
                    <a
                      href={
                        user.blog.startsWith("http")
                          ? user.blog
                          : `https://${user.blog}`
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {user.blog}
                    </a>
                  </p>
                )}
              </div>

              <div className="stats">
                <div className="stat">
                  <span className="stat__label">Public Repos</span>
                  <span className="stat__value">
                    {user.public_repos.toLocaleString()}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat__label">Followers</span>
                  <span className="stat__value">
                    {user.followers.toLocaleString()}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat__label">Following</span>
                  <span className="stat__value">
                    {user.following.toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="info-row">
                <strong>Profile:</strong>{" "}
                <a href={user.html_url} target="_blank" rel="noreferrer">
                  View on GitHub →
                </a>
              </p>
            </article>
          ) : null}

          {/* Repository Stats */}
          <section className="section-stack">
            <div className="panel panel--padded">
              <div className="section-head">
                <h2>Repository Stats</h2>
              </div>
              <div className="stats">
                <div className="stat">
                  <span className="stat__label">Total Stars</span>
                  <span className="stat__value">
                    {totalStars.toLocaleString()}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat__label">Total Forks</span>
                  <span className="stat__value">
                    {totalForks.toLocaleString()}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat__label">Repos Loaded</span>
                  <span className="stat__value">{repos?.length || 0}</span>
                </div>
              </div>
            </div>

            {/* Top Repos Chart */}
            {topRepos.length > 0 && (
              <div className="panel">
                <div className="section-head">
                  <h2>Top 5 Repositories</h2>
                </div>
                <div style={{ width: "100%", height: 300, padding: "1rem" }}>
                  <ResponsiveContainer>
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" angle={-45} height={60} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="stars" fill="#2563eb" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="panel--padded">
                  <ol style={{ margin: 0, paddingLeft: "1.5rem" }}>
                    {topRepos.map((repo) => (
                      <li key={repo.id} style={{ marginBottom: "0.75rem" }}>
                        <strong>{repo.name}</strong> — ⭐{" "}
                        {repo.stargazers_count.toLocaleString()} | 🍴{" "}
                        {repo.forks_count.toLocaleString()}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* Language Breakdown */}
            {languageChartData.length > 1 && (
              <div className="panel">
                <div className="section-head">
                  <h2>Language Breakdown</h2>
                </div>
                <div style={{ width: "100%", height: 350, padding: "1rem" }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={languageChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {languageChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
