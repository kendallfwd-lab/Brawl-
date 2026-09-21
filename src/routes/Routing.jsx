import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import BrawlersPage from '../pages/BrawlersPage';
import MapSelectPage from '../pages/MapSelectPage';
import GamePage from '../pages/GamePage';
import LeaderboardPage from '../pages/LeaderboardPage';
import InstructionsPage from '../pages/InstructionsPage';
import ResultsPage from '../pages/ResultsPage';

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/brawlers" element={<BrawlersPage />} />
      <Route path="/maps" element={<MapSelectPage />} />
      <Route path="/game/:mapId" element={<GamePage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/instructions" element={<InstructionsPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
