import { Navigate, Route, Routes } from "react-router-dom";
import GamesHubPage from "./pages/GamesHubPage.jsx";
import HangmanPage from "./pages/HangmanPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MemoryPage from "./pages/games/MemoryPage.jsx";
import ReactionPage from "./pages/games/ReactionPage.jsx";
import RpsPage from "./pages/games/RpsPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/games" element={<GamesHubPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/games/rps" element={<RpsPage />} />
      <Route path="/games/memory" element={<MemoryPage />} />
      <Route path="/games/reaction" element={<ReactionPage />} />
      <Route path="/hangman" element={<HangmanPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
