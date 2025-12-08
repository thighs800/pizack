import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Kitchen } from './pages/Kitchen';
import { Login } from './pages/Login';
import { TeamSelect } from './pages/TeamSelect';
import { TeamDashboard } from './pages/TeamDashboard';
import { Result } from './pages/Result';
import { History } from './pages/History';
import { Profile } from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/team-select" element={<TeamSelect />} />
        <Route path="/result" element={<Result />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/kitchen" replace />} />
          <Route path="kitchen" element={<Kitchen />} />
          <Route path="team" element={<TeamDashboard />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
