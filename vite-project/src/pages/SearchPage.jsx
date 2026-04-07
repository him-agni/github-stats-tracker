import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername) return;

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
      </form>
    </div>
  );
}

export default SearchPage;
