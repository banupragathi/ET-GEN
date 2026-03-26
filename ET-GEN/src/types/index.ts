
export type AgentType = 'SPEND_INTEL' | 'FINANCIAL_RECON' | 'RESOURCE_OPT' | 'SLA_PREDICT';

export interface Agent {
  id: AgentType;
  name: string;
  status: 'IDLE' | 'PROCESSING' | 'ALERT';
  lastAction: string;
  efficiency: number;
  description: string;
}

export interface Anomaly {
  id: string;
  title: string;
  description: string;
  agentId: AgentType;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  financialImpact: number;
  confidence: number;
  timestamp: string;
  rootCause: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXECUTED';
  suggestedAction: string;
  formula: string;
}

export interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  projectedSavings: number;
  roi: number;
  confidence: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  anomalyId?: string;
}
