import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import ComparePage from "./pages/ComparePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/user/:username" element={<ProfilePage />} />
      <Route path="/compare" element={<ComparePage />} />
    </Routes>
  );
}

export default App;
