import { Anomaly, Agent, SimulationScenario } from '../types';
import { subHours, formatISO } from 'date-fns';

export const AGENTS: Agent[] = [
  {
    id: 'SPEND_INTEL',
    name: 'Spend Intelligence',
    status: 'PROCESSING',
    lastAction: 'Analyzing procurement seasonality',
    efficiency: 94.2,
    description: 'Detects procurement anomalies and vendor payment leaks.'
  },
  {
    id: 'FINANCIAL_RECON',
    name: 'Financial Recon',
    status: 'ALERT',
    lastAction: 'Cross-verifying Invoice #9921 against Contract v2.1',
    efficiency: 98.5,
    description: 'Verifies invoices against contracts and purchase orders.'
  },
  {
    id: 'RESOURCE_OPT',
    name: 'Resource Optimization',
    status: 'IDLE',
    lastAction: 'Cloud usage log ingestion complete',
    efficiency: 89.1,
    description: 'Evaluates infrastructure and workforce utilization.'
  },
  {
    id: 'SLA_PREDICT',
    name: 'SLA Prediction',
    status: 'PROCESSING',
    lastAction: 'Forecasting workload distribution for Q2',
    efficiency: 92.8,
    description: 'Proactively detects potential SLA violations.'
  }
];

export const MOCK_ANOMALIES: Anomaly[] = [
  {
    id: 'ANOM-001',
    title: 'Duplicate Vendor Payment Detected',
    description: 'Two identical payments of $12,450.00 to "Global Logistics Corp" for the same PO #8821.',
    agentId: 'SPEND_INTEL',
    severity: 'CRITICAL',
    financialImpact: 12450,
    confidence: 0.99,
    timestamp: formatISO(subHours(new Date(), 1)),
    rootCause: 'System glitch in ERP payment batch processing.',
    status: 'PENDING',
    suggestedAction: 'Flag for immediate reversal and notify vendor.',
    formula: 'Duplicate Payment Value × Occurrence Frequency'
  },
  {
    id: 'ANOM-002',
    title: 'Idle Cloud Infrastructure (AWS)',
    description: '14 instances in us-east-1 have had < 2% CPU utilization for 72 consecutive hours.',
    agentId: 'RESOURCE_OPT',
    severity: 'HIGH',
    financialImpact: 4200,
    confidence: 0.92,
    timestamp: formatISO(subHours(new Date(), 4)),
    rootCause: 'Abandoned dev environment from Project X.',
    status: 'PENDING',
    suggestedAction: 'Terminate idle instances and reallocate reserved capacity.',
    formula: 'Idle Cost/Hr × Unused Duration'
  },
  {
    id: 'ANOM-003',
    title: 'Predicted SLA Breach: Latency',
    description: 'Time-series forecast predicts 15% probability of breaching P99 latency SLA for Order Service.',
    agentId: 'SLA_PREDICT',
    severity: 'MEDIUM',
    financialImpact: 25000,
    confidence: 0.78,
    timestamp: formatISO(subHours(new Date(), 2)),
    rootCause: 'Sudden spike in upstream dependency latency.',
    status: 'PENDING',
    suggestedAction: 'Trigger auto-scaling and workload redistribution.',
    formula: 'SLA Penalty Rate × Predicted Breach Probability'
  },
  {
    id: 'ANOM-004',
    title: 'Contract Pricing Mismatch',
    description: 'Vendor "CloudScale" is billing $0.12/GB vs contracted $0.10/GB.',
    agentId: 'FINANCIAL_RECON',
    severity: 'HIGH',
    financialImpact: 8900,
    confidence: 0.95,
    timestamp: formatISO(subHours(new Date(), 6)),
    rootCause: 'Vendor updated billing system without applying contract discounts.',
    status: 'PENDING',
    suggestedAction: 'Generate dispute report and request credit memo.',
    formula: '(Billed Rate - Contract Rate) × Total Usage'
  }
];

export const SCENARIOS: SimulationScenario[] = [
  {
    id: 'SCEN-1',
    name: 'Vendor Consolidation',
    description: 'Consolidate 3 logistics vendors into 1 primary partner.',
    projectedSavings: 145000,
    roi: 12.5,
    confidence: 0.85
  },
  {
    id: 'SCEN-2',
    name: 'Cloud Spot Instance Migration',
    description: 'Move 40% of non-critical workloads to AWS Spot Instances.',
    projectedSavings: 82000,
    roi: 24.2,
    confidence: 0.91
  }
];
