import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Anomaly {
  id: string;
  agentId: string;
  type: 'duplicate_payment' | 'unused_resource' | 'vendor_consolidation' | 'sla_breach';
  vendor?: string;
  amount: number;
  poNumber?: string;
  timestamp: string;
  description: string;
  rootCause: string;
  confidence: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ActionLog {
  id: string;
  timestamp: string;
  action: 'approve' | 'reject';
  anomalyId: string;
  description: string;
  impact: number;
  status: 'completed' | 'failed' | 'pending';
}

interface CostIntelligenceContextType {
  anomalies: Anomaly[];
  logs: ActionLog[];
  totalSavings: number;
  approveAnomaly: (id: string) => void;
  rejectAnomaly: (id: string) => void;
  simulationParams: {
    unusedResourceReduction: number;
    vendorConsolidationCount: number;
  };
  setSimulationParams: (params: { unusedResourceReduction: number; vendorConsolidationCount: number }) => void;
}

const CostIntelligenceContext = createContext<CostIntelligenceContextType | undefined>(undefined);

export function CostIntelligenceProvider({ children }: { children: React.ReactNode }) {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([
    {
      id: 'ANOM-001',
      agentId: 'FINANCIAL_RECON',
      type: 'duplicate_payment',
      vendor: 'CloudScale Systems',
      amount: 12450.00,
      poNumber: 'PO-99281',
      timestamp: new Date().toISOString(),
      description: 'Potential duplicate invoice detected for CloudScale Systems.',
      rootCause: 'ERP processing error: Invoice #INV-2024-001 submitted twice with different internal IDs across ERP vs Bank Statement.',
      confidence: 0.98,
      status: 'pending',
    },
    {
      id: 'ANOM-002',
      agentId: 'RESOURCE_OPT',
      type: 'unused_resource',
      vendor: 'AWS us-east-1',
      amount: 3200.00,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      description: 'Idle Cloud Compute Instances (m5.xlarge) detected.',
      rootCause: 'Instances running at < 2% CPU utilization for over 72 hours with no active network traffic.',
      confidence: 0.88,
      status: 'pending',
    },
    {
      id: 'ANOM-003',
      agentId: 'SPEND_INTEL',
      type: 'sla_breach',
      vendor: 'Global CDN Corp',
      amount: 8500.00,
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      description: 'Unclaimed SLA Credit: Service Downtime Breach.',
      rootCause: 'Vendor downtime exceeded 99.9% threshold. No credit memo detected in current billing cycle.',
      confidence: 0.92,
      status: 'pending',
    }
  ]);

  const [logs, setLogs] = useState<ActionLog[]>([]);
  const [totalSavings, setTotalSavings] = useState(0);
  const [simulationParams, setSimulationParams] = useState({
    unusedResourceReduction: 20,
    vendorConsolidationCount: 5,
  });

  const approveAnomaly = (id: string) => {
    const anomaly = anomalies.find(a => a.id === id);
    if (!anomaly || anomaly.status !== 'pending') return;

    setAnomalies(prev => prev.map(a => a.id === id ? { ...a, status: 'approved' } : a));
    setTotalSavings(prev => prev + anomaly.amount);
    
    const newLog: ActionLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'approve',
      anomalyId: id,
      description: `Approved ${anomaly.type} for ${anomaly.vendor || 'Unknown'}. Savings realized: $${anomaly.amount.toLocaleString()}`,
      impact: anomaly.amount,
      status: 'completed',
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const rejectAnomaly = (id: string) => {
    const anomaly = anomalies.find(a => a.id === id);
    if (!anomaly || anomaly.status !== 'pending') return;

    setAnomalies(prev => prev.map(a => a.id === id ? { ...a, status: 'rejected' } : a));
    
    const newLog: ActionLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'reject',
      anomalyId: id,
      description: `Rejected ${anomaly.type} for ${anomaly.vendor || 'Unknown'}. No impact recorded.`,
      impact: 0,
      status: 'completed',
    };
    setLogs(prev => [newLog, ...prev]);
  };

  return (
    <CostIntelligenceContext.Provider value={{
      anomalies,
      logs,
      totalSavings,
      approveAnomaly,
      rejectAnomaly,
      simulationParams,
      setSimulationParams,
    }}>
      {children}
    </CostIntelligenceContext.Provider>
  );
}

export function useCostIntelligence() {
  const context = useContext(CostIntelligenceContext);
  if (context === undefined) {
    throw new Error('useCostIntelligence must be used within a CostIntelligenceProvider');
  }
  return context;
}
