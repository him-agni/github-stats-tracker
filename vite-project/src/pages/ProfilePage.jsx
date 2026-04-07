import { useParams } from "react-router-dom";

function ProfilePage() {
  const { username } = useParams();

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Username: {username}</p>
    </div>
  );
}

export default ProfilePage;
