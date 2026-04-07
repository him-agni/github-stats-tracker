import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchGitHubUser } from "../services/githubApi";

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
    </div>
  );
}

export default ProfilePage;
