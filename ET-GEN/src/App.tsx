import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Agents } from './pages/Agents';
import { AgentDetails } from './pages/AgentDetails';
import { Alerts } from './pages/Alerts';
import { DataSources } from './pages/DataSources';
import { Settings } from './pages/Settings';
import { Simulation } from './pages/Simulation';
import { ActionLogs } from './pages/ActionLogs';
import { Layout } from './components/Layout';
import { CostIntelligenceProvider } from './lib/CostIntelligenceContext';
import { AuthProvider, useAuth } from './lib/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <CostIntelligenceProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            
            <Route element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="agents" element={<Agents />} />
              <Route path="agents/:id" element={<AgentDetails />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="data-sources" element={<DataSources />} />
              <Route path="simulation" element={<Simulation />} />
              <Route path="action-logs" element={<ActionLogs />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CostIntelligenceProvider>
    </AuthProvider>
  );
}
