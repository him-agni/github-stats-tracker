import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/user/:username" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
