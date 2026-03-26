import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, RefreshCw, ShieldCheck, X, ChevronRight, Filter } from 'lucide-react';
import { useCostIntelligence } from '../lib/CostIntelligenceContext';
import { FrontendAnomaly } from '../lib/api';
import { IssueDetailPanel } from '../components/IssueDetailPanel';

const fmt = (n: number) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(2)}L` : `₹${n.toLocaleString('en-IN')}`;

const SEVERITY_CONFIG = {
  CRITICAL: {
    badge: 'bg-red-500/10 border-red-500/30 text-red-400',
    border: 'hover:border-red-500/30',
    dot: 'bg-red-500',
  },
  HIGH: {
    badge: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
    border: 'hover:border-orange-500/30',
    dot: 'bg-orange-500',
  },
  MEDIUM: {
    badge: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    border: 'hover:border-yellow-500/30',
    dot: 'bg-yellow-500',
  },
};

type FilterSeverity = 'ALL' | 'CRITICAL' | 'HIGH' | 'MEDIUM';
type FilterStatus = 'pending' | 'approved' | 'rejected' | 'all';

function IssueCard({ issue, onSelect, onApprove, onReject }: {
  issue: FrontendAnomaly;
  onSelect: (a: FrontendAnomaly) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const cfg = SEVERITY_CONFIG[issue.severity];
  const isPending = issue.status === 'pending';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={`bg-[#111214] border border-[#1F2023] rounded-xl overflow-hidden transition-all cursor-pointer group ${cfg.border}`}
      onClick={() => onSelect(issue)}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Left */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-[9px] px-2 py-0.5 rounded border font-mono uppercase tracking-widest ${cfg.badge}`}>
                {issue.severity}
              </span>
              {issue.isDuplicate && (
                <span className="text-[9px] px-2 py-0.5 rounded border bg-purple-500/10 border-purple-500/30 text-purple-400 font-mono uppercase tracking-widest">
                  Duplicate
                </span>
              )}
              <span className="text-[9px] text-[#5A5B5F] font-mono">#{issue.id} · {issue.timestamp}</span>
            </div>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-white">{issue.vendor}</span>
            </div>
            <p className="text-xs text-[#8E9299] leading-relaxed line-clamp-1">{issue.rootCause}</p>
          </div>

          {/* Right numbers */}
          <div className="text-right shrink-0">
            <p className="text-[10px] text-[#5A5B5F] font-mono uppercase tracking-widest">Amount</p>
            <p className="text-lg font-mono font-semibold text-white">{fmt(issue.amount)}</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-[#1F2023]">
          <div>
            <p className="text-[9px] text-[#5A5B5F] font-mono uppercase tracking-widest mb-1">Risk If Ignored</p>
            <p className="text-xs font-mono text-red-400 font-semibold">{fmt(issue.riskIfIgnored)}</p>
          </div>
          <div>
            <p className="text-[9px] text-[#5A5B5F] font-mono uppercase tracking-widest mb-1">Recoverable</p>
            <p className="text-xs font-mono text-emerald-400 font-semibold">{fmt(issue.impact)}</p>
          </div>
          <div>
            <p className="text-[9px] text-[#5A5B5F] font-mono uppercase tracking-widest mb-2">Confidence</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-[#1F2023] rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${cfg.dot}`} style={{ width: `${issue.confidence * 100}%` }} />
              </div>
              <span className="text-[9px] font-mono text-[#8E9299]">{(issue.confidence * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Action buttons — only for pending */}
        {isPending && (
          <div className="mt-4 flex gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onApprove(issue.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F27D26] hover:bg-[#D96C1E] text-black text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors"
            >
              <ShieldCheck className="w-3 h-3" /> Approve
            </button>
            <button
              onClick={() => onReject(issue.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#2A2B2F] hover:bg-red-500/10 hover:border-red-500/30 text-[#8E9299] hover:text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors"
            >
              <X className="w-3 h-3" /> Ignore
            </button>
            <button className="ml-auto flex items-center gap-1 text-[10px] text-[#5A5B5F] group-hover:text-[#F27D26] transition-colors font-mono">
              Details <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Resolved state */}
        {!isPending && (
          <div className="mt-4 pt-3 border-t border-[#1F2023]">
            <span className={`text-[10px] font-mono uppercase tracking-widest ${issue.status === 'approved' ? 'text-emerald-400' : 'text-[#5A5B5F]'}`}>
              {issue.status === 'approved' ? '✓ Resolved' : '✕ Dismissed'}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Alerts() {
  const { anomalies, loading, error, refresh, approveAnomaly, rejectAnomaly } = useCostIntelligence();
  const [selectedIssue, setSelectedIssue] = useState<FrontendAnomaly | null>(null);
  const [severityFilter, setSeverityFilter] = useState<FilterSeverity>('ALL');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('pending');

  const filtered = useMemo(() => anomalies.filter((a) => {
    const sev = severityFilter === 'ALL' || a.severity === severityFilter;
    const stat = statusFilter === 'all' || a.status === statusFilter;
    return sev && stat;
  }), [anomalies, severityFilter, statusFilter]);

  const counts = useMemo(() => ({
    critical: anomalies.filter((a) => a.severity === 'CRITICAL' && a.status === 'pending').length,
    high: anomalies.filter((a) => a.severity === 'HIGH' && a.status === 'pending').length,
    medium: anomalies.filter((a) => a.severity === 'MEDIUM' && a.status === 'pending').length,
  }), [anomalies]);

  if (loading) return (
    <div className="flex items-center justify-center h-64 gap-3">
      <RefreshCw className="w-5 h-5 text-[#F27D26] animate-spin" />
      <span className="text-sm text-[#5A5B5F] font-mono">Loading issues…</span>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <AlertTriangle className="w-8 h-8 text-red-500" />
      <p className="text-sm text-[#8E9299]">{error}</p>
      <button onClick={refresh} className="px-4 py-2 text-xs font-mono uppercase tracking-widest bg-[#F27D26] text-black rounded-lg">Retry</button>
    </div>
  );

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#F27D26]" /> Issues & Anomalies
            </h1>
            <p className="text-xs text-[#5A5B5F] font-mono mt-1">{filtered.length} issue{filtered.length !== 1 ? 's' : ''} shown</p>
          </div>
          <button onClick={refresh} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#5A5B5F] hover:text-white border border-[#1F2023] hover:border-[#2A2B2F] px-3 py-2 rounded-lg transition-colors">
            <RefreshCw className="w-3 h-3" /> Refresh
          </button>
        </div>

        {/* Severity summary */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Critical', count: counts.critical, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', key: 'CRITICAL' as FilterSeverity },
            { label: 'High', count: counts.high, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', key: 'HIGH' as FilterSeverity },
            { label: 'Medium', count: counts.medium, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', key: 'MEDIUM' as FilterSeverity },
          ].map(({ label, count, color, bg, key }) => (
            <button
              key={key}
              onClick={() => setSeverityFilter(severityFilter === key ? 'ALL' : key)}
              className={`rounded-xl p-4 border transition-all text-left ${bg} ${severityFilter === key ? 'ring-1 ring-white/10' : 'opacity-70 hover:opacity-100'}`}
            >
              <p className={`text-2xl font-mono font-bold ${color}`}>{count}</p>
              <p className={`text-[10px] uppercase tracking-widest font-mono mt-1 ${color}`}>{label}</p>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-3.5 h-3.5 text-[#5A5B5F]" />
          {(['pending', 'approved', 'rejected', 'all'] as FilterStatus[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`text-[10px] px-3 py-1 rounded-lg font-mono uppercase tracking-widest transition-colors border ${
                statusFilter === s
                  ? 'bg-[#F27D26] border-[#F27D26] text-black font-bold'
                  : 'border-[#1F2023] text-[#5A5B5F] hover:border-[#2A2B2F] hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Issue list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-[#111214] border border-[#1F2023] rounded-xl">
            <ShieldCheck className="w-10 h-10 text-[#F27D26] mx-auto mb-3" />
            <p className="text-white font-semibold">All Clear</p>
            <p className="text-xs text-[#5A5B5F] mt-1">No issues match the current filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <AnimatePresence>
              {filtered.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onSelect={setSelectedIssue}
                  onApprove={approveAnomaly}
                  onReject={rejectAnomaly}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Detail panel */}
      <IssueDetailPanel
        issue={selectedIssue}
        onClose={() => setSelectedIssue(null)}
        onApprove={approveAnomaly}
        onReject={rejectAnomaly}
      />
    </>
  );
}
