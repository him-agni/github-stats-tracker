export async function fetchGitHubUser(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    throw new Error("GitHub user not found");
  }

  return response.json();
}
