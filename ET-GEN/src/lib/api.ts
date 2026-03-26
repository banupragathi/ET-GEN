// API helper — all calls go through Vite proxy at /api/* → localhost:8000

export interface BackendAnomaly {
  id: number;
  vendor: string;
  amount: number;
  timestamp: string;
  vendor_avg: number;
  deviation: number;
  anomaly: number;
  anomaly_label: string;
  is_duplicate: boolean;
  root_cause: string;
  risk_if_ignored: number;
  confidence: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  impact: number;
}

export interface BackendMetrics {
  total_spend: number;
  potential_loss: number;
  recoverable_savings: number;
}

export interface FrontendAnomaly {
  id: string;
  vendor: string;
  amount: number;
  timestamp: string;
  vendorAvg: number;
  anomalyLabel: string;
  isDuplicate: boolean;
  rootCause: string;
  riskIfIgnored: number;
  confidence: number;
  severity: 'MEDIUM' | 'HIGH' | 'CRITICAL';
  impact: number;
  status: 'pending' | 'approved' | 'rejected';
}

const BASE = '/api';

function mapAnomaly(row: BackendAnomaly): FrontendAnomaly {
  return {
    id: String(row.id),
    vendor: row.vendor,
    amount: row.amount,
    timestamp: row.timestamp,
    vendorAvg: row.vendor_avg,
    anomalyLabel: row.anomaly_label,
    isDuplicate: row.is_duplicate,
    rootCause: row.root_cause,
    riskIfIgnored: row.risk_if_ignored,
    confidence: row.confidence,
    severity: (row.severity === 'LOW' ? 'MEDIUM' : row.severity) as 'MEDIUM' | 'HIGH' | 'CRITICAL',
    impact: row.impact,
    status: 'pending',
  };
}

export async function fetchAnomalies(): Promise<FrontendAnomaly[]> {
  const res = await fetch(`${BASE}/anomalies`);
  if (!res.ok) throw new Error('Failed to fetch anomalies');
  const data: BackendAnomaly[] = await res.json();
  return data.map(mapAnomaly);
}

export async function fetchMetrics(): Promise<BackendMetrics> {
  const res = await fetch(`${BASE}/metrics`);
  if (!res.ok) throw new Error('Failed to fetch metrics');
  return res.json();
}

export async function approveIssue(id: string): Promise<{ message: string }> {
  const res = await fetch(`${BASE}/approve/${id}`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to approve issue');
  return res.json();
}
