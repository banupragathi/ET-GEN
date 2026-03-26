import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchAnomalies, fetchMetrics, approveIssue, FrontendAnomaly, BackendMetrics } from './api';

export type { FrontendAnomaly as Anomaly };

export interface ActionLog {
  id: string;
  timestamp: string;
  action: 'approve' | 'reject';
  anomalyId: string;
  vendor: string;
  amount: number;
  description: string;
  status: 'completed' | 'failed';
}

export interface SimulationParams {
  unusedResourceReduction: number;
  vendorConsolidationCount: number;
}

interface CostIntelligenceContextType {
  anomalies: FrontendAnomaly[];
  logs: ActionLog[];
  metrics: BackendMetrics;
  loading: boolean;
  error: string | null;
  approveAnomaly: (id: string) => Promise<void>;
  rejectAnomaly: (id: string) => void;
  refresh: () => void;
  simulationParams: SimulationParams;
  setSimulationParams: (p: SimulationParams) => void;
}

const defaultMetrics: BackendMetrics = {
  total_spend: 0,
  potential_loss: 0,
  recoverable_savings: 0,
};

const CostIntelligenceContext = createContext<CostIntelligenceContextType | undefined>(undefined);

export function CostIntelligenceProvider({ children }: { children: React.ReactNode }) {
  const [anomalies, setAnomalies] = useState<FrontendAnomaly[]>([]);
  const [logs, setLogs] = useState<ActionLog[]>([]);
  const [metrics, setMetrics] = useState<BackendMetrics>(defaultMetrics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [simulationParams, setSimulationParams] = useState<SimulationParams>({
    unusedResourceReduction: 20,
    vendorConsolidationCount: 5,
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [anomalyData, metricData] = await Promise.all([fetchAnomalies(), fetchMetrics()]);
      setAnomalies(anomalyData);
      setMetrics(metricData);
    } catch (e) {
      setError('Failed to connect to backend. Make sure the API is running on port 8000.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const approveAnomaly = useCallback(async (id: string) => {
    const anomaly = anomalies.find((a) => a.id === id);
    if (!anomaly || anomaly.status !== 'pending') return;

    // Optimistic update
    setAnomalies((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'approved' } : a)));

    try {
      await approveIssue(id);
      const newLog: ActionLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        action: 'approve',
        anomalyId: id,
        vendor: anomaly.vendor,
        amount: anomaly.impact,
        description: `${anomaly.vendor} · ${anomaly.rootCause}`,
        status: 'completed',
      };
      setLogs((prev) => [newLog, ...prev]);
      // Refresh metrics after approval
      fetchMetrics().then(setMetrics).catch(() => {});
    } catch {
      // Rollback optimistic update on failure
      setAnomalies((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'pending' } : a)));
    }
  }, [anomalies]);

  const rejectAnomaly = useCallback((id: string) => {
    const anomaly = anomalies.find((a) => a.id === id);
    if (!anomaly || anomaly.status !== 'pending') return;

    setAnomalies((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'rejected' } : a)));
    const newLog: ActionLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'reject',
      anomalyId: id,
      vendor: anomaly.vendor,
      amount: 0,
      description: `Dismissed: ${anomaly.rootCause}`,
      status: 'completed',
    };
    setLogs((prev) => [newLog, ...prev]);
  }, [anomalies]);

  return (
    <CostIntelligenceContext.Provider value={{
      anomalies, logs, metrics, loading, error, approveAnomaly, rejectAnomaly, refresh: loadData,
      simulationParams, setSimulationParams,
    }}>
      {children}
    </CostIntelligenceContext.Provider>
  );
}

export function useCostIntelligence() {
  const context = useContext(CostIntelligenceContext);
  if (!context) throw new Error('useCostIntelligence must be used within a CostIntelligenceProvider');
  return context;
}
