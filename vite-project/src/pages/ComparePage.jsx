import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchGitHubUser } from "../services/githubApi";

function ComparePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialUser1 = searchParams.get("user1") || "";
  const initialUser2 = searchParams.get("user2") || "";

  const [user1Input, setUser1Input] = useState(initialUser1);
  const [user2Input, setUser2Input] = useState(initialUser2);

  const user1 = searchParams.get("user1");
  const user2 = searchParams.get("user2");

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
  };

  return (
    <div>
      <h1>Compare GitHub Users</h1>
      <p>Enter two GitHub usernames to compare their profiles.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First username"
          value={user1Input}
          onChange={(e) => setUser1Input(e.target.value)}
        />

        <input
          type="text"
          placeholder="Second username"
          value={user2Input}
          onChange={(e) => setUser2Input(e.target.value)}
        />

        <button type="submit">Compare</button>
      </form>

      <hr />

      {isLoading1 && <p>Loading first user...</p>}
      {isLoading2 && <p>Loading second user...</p>}

      {isError1 && <p>Error for first user: {error1.message}</p>}
      {isError2 && <p>Error for second user: {error2.message}</p>}

      {profile1 && profile2 && (
        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
          <div>
            <img src={profile1.avatar_url} alt={profile1.login} width="100" />
            <h2>{profile1.name || profile1.login}</h2>
            <p>@{profile1.login}</p>
            <p>Followers: {profile1.followers}</p>
            <p>Following: {profile1.following}</p>
            <p>Public Repos: {profile1.public_repos}</p>
            <p>Location: {profile1.location || "Not provided"}</p>
          </div>

          <div>
            <img src={profile2.avatar_url} alt={profile2.login} width="100" />
            <h2>{profile2.name || profile2.login}</h2>
            <p>@{profile2.login}</p>
            <p>Followers: {profile2.followers}</p>
            <p>Following: {profile2.following}</p>
            <p>Public Repos: {profile2.public_repos}</p>
            <p>Location: {profile2.location || "Not provided"}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComparePage;
