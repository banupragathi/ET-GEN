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
    badge: 'bg-[#FF7A00]/10 border-[#FF7A00]/30 text-[#FF7A00]',
    border: 'hover:border-[#FF7A00]/30',
    dot: 'bg-[#FF7A00]',
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
  key?: React.Key;
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
      className={`bg-[#11171D] border border-[#1C2632] rounded-xl overflow-hidden transition-all cursor-pointer group ${cfg.border} shadow-lg`}
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
              <span className="text-sm font-semibold text-[#E6EDF3]">{issue.vendor}</span>
            </div>
            <p className="text-xs text-[#8B949E] leading-relaxed line-clamp-1 italic">{issue.rootCause}</p>
          </div>

          {/* Right numbers */}
          <div className="text-right shrink-0">
            <p className="text-[10px] text-[#5A5B5F] font-mono uppercase tracking-widest">Amount</p>
            <p className="text-lg font-mono font-semibold text-[#E6EDF3]">{fmt(issue.amount)}</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-[#1C2632]">
          <div>
            <p className="text-[9px] text-[#5A5B5F] font-mono uppercase tracking-widest mb-1">Risk If Ignored</p>
            <p className="text-xs font-mono text-red-100 font-semibold">{fmt(issue.riskIfIgnored)}</p>
          </div>
          <div>
            <p className="text-[9px] text-[#5A5B5F] font-mono uppercase tracking-widest mb-1">Recoverable</p>
            <p className="text-xs font-mono text-[#00E5FF] font-semibold">{fmt(issue.impact)}</p>
          </div>
          <div>
            <p className="text-[9px] text-[#5A5B5F] font-mono uppercase tracking-widest mb-2">Confidence</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-[#0B0F14] rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${cfg.dot} shadow-[0_0_8px_rgba(255,122,0,0.4)]`} style={{ width: `${issue.confidence * 100}%` }} />
              </div>
              <span className="text-[9px] font-mono text-[#5A5B5F]">{(issue.confidence * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Action buttons — only for pending */}
        {isPending && (
          <div className="mt-4 flex gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onApprove(issue.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF7A00] hover:bg-[#E66D00] text-black text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all hover:scale-[1.02]"
            >
              <ShieldCheck className="w-3 h-3" /> Approve
            </button>
            <button
              onClick={() => onReject(issue.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#1C2632] hover:bg-red-500/10 hover:border-red-500/30 text-[#8B949E] hover:text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors"
            >
              <X className="w-3 h-3" /> Ignore
            </button>
            <button className="ml-auto flex items-center gap-1 text-[10px] text-[#5A5B5F] group-hover:text-[#FF7A00] transition-colors font-mono uppercase tracking-widest">
              Details <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Resolved state */}
        {!isPending && (
          <div className="mt-4 pt-3 border-t border-[#1C2632]">
            <span className={`text-[10px] font-mono uppercase tracking-widest ${issue.status === 'approved' ? 'text-[#00E5FF]' : 'text-[#5A5B5F]'}`}>
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
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <RefreshCw className="w-6 h-6 text-[#FF7A00] animate-spin" />
      <span className="text-sm text-[#5A5B5F] font-mono">Scanning telemetry...</span>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <AlertTriangle className="w-8 h-8 text-red-500" />
      <p className="text-sm text-[#8B949E]">{error}</p>
      <button onClick={refresh} className="px-4 py-2 text-xs font-mono uppercase tracking-widest bg-[#FF7A00] text-black rounded-lg">Retry</button>
    </div>
  );

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-[#E6EDF3] flex items-center gap-2 italic font-serif">
              <AlertTriangle className="w-5 h-5 text-[#FF7A00]" /> Intelligence Alerts
            </h1>
            <p className="text-xs text-[#5A5B5F] font-mono mt-1">{filtered.length} prioritized event{filtered.length !== 1 ? 's' : ''} found</p>
          </div>
          <button onClick={refresh} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#5A5B5F] hover:text-[#E6EDF3] border border-[#1C2632] hover:border-[#FF7A00]/50 px-3 py-2 rounded-lg transition-all">
            <RefreshCw className="w-3 h-3" /> Pulse Refresh
          </button>
        </div>

        {/* Severity summary */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Critical', count: counts.critical, color: 'text-red-400', bg: 'bg-red-500/5 border-red-500/10', key: 'CRITICAL' as FilterSeverity },
            { label: 'High', count: counts.high, color: 'text-[#FF7A00]', bg: 'bg-[#FF7A00]/5 border-[#FF7A00]/10', key: 'HIGH' as FilterSeverity },
            { label: 'Medium', count: counts.medium, color: 'text-yellow-400', bg: 'bg-yellow-500/5 border-yellow-500/10', key: 'MEDIUM' as FilterSeverity },
          ].map(({ label, count, color, bg, key }) => (
            <button
              key={key}
              onClick={() => setSeverityFilter(severityFilter === key ? 'ALL' : key)}
              className={`rounded-xl p-4 border transition-all text-left ${bg} ${severityFilter === key ? 'ring-1 ring-[#FF7A00]/30 border-[#FF7A00]/30' : 'opacity-70 hover:opacity-100 hover:border-white/10'}`}
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
              className={`text-[10px] px-3 py-1 rounded-lg font-mono uppercase tracking-widest transition-all border ${
                statusFilter === s
                  ? 'bg-[#FF7A00] border-[#FF7A00] text-black font-bold shadow-[0_0_15px_rgba(255,122,0,0.3)]'
                  : 'border-[#1C2632] text-[#5A5B5F] hover:border-[#8B949E] hover:text-[#E6EDF3]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Issue list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-[#11171D] border border-[#1C2632] rounded-xl shadow-inner">
            <ShieldCheck className="w-10 h-10 text-[#FF7A00] mx-auto mb-3 opacity-60" />
            <p className="text-[#E6EDF3] font-semibold">Architecture Stable</p>
            <p className="text-xs text-[#5A5B5F] mt-1 font-mono uppercase tracking-widest">No anomalies detected in current buffer</p>
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

