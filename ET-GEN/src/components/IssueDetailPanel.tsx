import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, TrendingUp, Clock, Building2, ShieldCheck, Activity } from 'lucide-react';
import { FrontendAnomaly } from '../lib/api';

const fmt = (n: number) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(2)}L` : `₹${n.toLocaleString('en-IN')}`;

const SEVERITY_CONFIG = {
  CRITICAL: { color: '#ef4444', bg: 'bg-red-500/10 border-red-500/20 text-red-400', label: 'CRITICAL' },
  HIGH:     { color: '#f97316', bg: 'bg-orange-500/10 border-orange-500/20 text-orange-400', label: 'HIGH' },
  MEDIUM:   { color: '#eab308', bg: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400', label: 'MEDIUM' },
};

interface Props {
  issue: FrontendAnomaly | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function IssueDetailPanel({ issue, onClose, onApprove, onReject }: Props) {
  const cfg = issue ? SEVERITY_CONFIG[issue.severity] : null;
  const daysRisk = issue ? issue.riskIfIgnored : 0;

  return (
    <AnimatePresence>
      {issue && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Side panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full max-w-xl bg-[#0D0E10] border-l border-[#1F2023] z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#0D0E10] border-b border-[#1F2023] px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] px-2 py-0.5 rounded border font-mono uppercase tracking-widest ${cfg!.bg}`}>
                  {cfg!.label}
                </span>
                <span className="text-[11px] font-mono text-[#5A5B5F]">#{issue.id}</span>
              </div>
              <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#1F2023] text-[#5A5B5F] hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Vendor + amount */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-[#5A5B5F]" />
                    <span className="text-xs text-[#5A5B5F] font-mono">{issue.vendor}</span>
                  </div>
                  <p className="text-2xl font-semibold text-white font-mono">{fmt(issue.amount)}</p>
                  <p className="text-xs text-[#5A5B5F] mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {issue.timestamp}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#5A5B5F] font-mono uppercase tracking-widest">Vendor Avg</p>
                  <p className="text-lg font-mono text-[#8E9299]">{fmt(issue.vendorAvg)}</p>
                </div>
              </div>

              {/* Anomaly label */}
              <div className="bg-[#111214] border border-[#1F2023] rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono mb-2">Detection</p>
                <p className="text-sm text-white leading-relaxed">{issue.anomalyLabel}</p>
                {issue.isDuplicate && (
                  <span className="mt-2 inline-block text-[9px] uppercase tracking-widest bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2 py-0.5 rounded font-mono">
                    Duplicate Invoice
                  </span>
                )}
              </div>

              {/* Root cause */}
              <div className="bg-[#111214] border border-[#1F2023] rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono mb-2 flex items-center gap-2">
                  <Activity className="w-3 h-3" /> Root Cause Analysis
                </p>
                <p className="text-sm text-[#8E9299] leading-relaxed italic">{issue.rootCause}</p>
              </div>

              {/* Risk simulation */}
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-widest text-red-400 font-mono mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3" /> Risk Simulation
                </p>
                <p className="text-sm text-[#8E9299] leading-relaxed">
                  If this issue is <span className="text-red-400 font-semibold">ignored</span>, it could result in a potential loss of{' '}
                  <span className="text-white font-mono font-bold">{fmt(daysRisk)}</span> over the next 7 days based on vendor patterns.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-[#1F2023] rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${Math.min(issue.confidence * 100, 100)}%` }} />
                  </div>
                  <span className="text-[11px] font-mono text-red-400 shrink-0">{(issue.confidence * 100).toFixed(0)}% confidence</span>
                </div>
              </div>

              {/* Impact */}
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono mb-1 flex items-center gap-2">
                    <TrendingUp className="w-3 h-3" /> Recoverable Impact
                  </p>
                  <p className="text-sm text-[#8E9299]">Savings realised on approval</p>
                </div>
                <p className="text-xl font-mono font-bold text-emerald-400">{fmt(issue.impact)}</p>
              </div>

              {/* Actions */}
              {issue.status === 'pending' && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => { onApprove(issue.id); onClose(); }}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#F27D26] hover:bg-[#D96C1E] text-black text-xs font-bold uppercase tracking-widest py-3 rounded-xl transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4" /> Approve & Resolve
                  </button>
                  <button
                    onClick={() => { onReject(issue.id); onClose(); }}
                    className="px-5 border border-[#2A2B2F] hover:bg-red-500/10 hover:border-red-500/30 text-[#8E9299] hover:text-red-400 text-xs font-bold uppercase tracking-widest py-3 rounded-xl transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              )}
              {issue.status !== 'pending' && (
                <div className={`text-center py-3 rounded-xl text-xs font-mono uppercase tracking-widest ${
                  issue.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-[#1F2023] text-[#5A5B5F]'
                }`}>
                  {issue.status === 'approved' ? '✓ Resolved' : '✕ Dismissed'}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
