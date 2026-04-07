import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchGitHubUser, fetchGitHubRepos } from "../services/githubApi";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function ProfilePage() {
  const { username } = useParams();

  const {
    data: user,
    isLoading,
    isError,
    error,
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

  if (isLoading) {
    return <p>Loading user profile...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>{user.name || user.login}</h1>
      <img src={user.avatar_url} alt={user.login} width="120" />
      <p>@{user.login}</p>
      <p>{user.bio}</p>
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
      <p>Public Repos: {user.public_repos}</p>
      <p>Location: {user.location || "Not provided"}</p>
      <p>
        Profile URL:{" "}
        <a href={user.html_url} target="_blank" rel="noreferrer">
          {user.html_url}
        </a>
      </p>

      <hr />

      <h2>Repository Stats</h2>
      <p>Total Stars: {totalStars}</p>
      <p>Total Forks: {totalForks}</p>
      <p>Total Repositories Loaded: {repos?.length || 0}</p>

      <h2>Top 5 Repositories by Stars</h2>
      <h2>Top Repositories Chart</h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stars" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {topRepos.length > 0 ? (
        <ol>
          {topRepos.map((repo) => (
            <li key={repo.id}>
              <strong>{repo.name}</strong> — ⭐ {repo.stargazers_count} | 🍴{" "}
              {repo.forks_count}
            </li>
          ))}
        </ol>
      ) : (
        <p>No repositories available.</p>
      )}
      <hr />

      <h2>Repositories</h2>

      {isReposLoading && <p>Loading repositories...</p>}
      {isReposError && <p>Error: {reposError.message}</p>}

      {repos && repos.length > 0 ? (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <h3>{repo.name}</h3>
              <p>{repo.description || "No description"}</p>
              <p>⭐ Stars: {repo.stargazers_count}</p>
              <p>🍴 Forks: {repo.forks_count}</p>
              <p>🧠 Language: {repo.language || "Not specified"}</p>
              <p>Updated: {new Date(repo.updated_at).toLocaleDateString()}</p>
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                View Repository
              </a>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        !isReposLoading && <p>No repositories found.</p>
      )}
    </div>
  );
}

export default ProfilePage;
