import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Integrations from '@/pages/Integrations';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/Settings/Integrations" replace />} />
        <Route path="Settings/Integrations" element={<Integrations />} />
        <Route path="*" element={<Navigate to="/Settings/Integrations" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
