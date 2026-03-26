import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, ShieldCheck, X, TrendingUp } from 'lucide-react';
import { useCostIntelligence } from '../lib/CostIntelligenceContext';
import { formatDistanceToNow } from 'date-fns';

const fmt = (n: number) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(2)}L` : `₹${Math.abs(n).toLocaleString('en-IN')}`;

export function ActionLogs() {
  const { logs, anomalies } = useCostIntelligence();

  const totalSaved = logs
    .filter((l) => l.action === 'approve')
    .reduce((acc, l) => acc + l.amount, 0);

  const approveCount = logs.filter((l) => l.action === 'approve').length;
  const rejectCount = logs.filter((l) => l.action === 'reject').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <ClipboardList className="w-5 h-5 text-[#F27D26]" />
        <h1 className="text-lg font-semibold text-white">Action Logs</h1>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#111214] border border-[#1F2023] rounded-xl p-4">
          <p className="text-[10px] text-[#5A5B5F] font-mono uppercase tracking-widest mb-2">Total Resolved</p>
          <p className="text-2xl font-mono font-bold text-white">{approveCount}</p>
        </div>
        <div className="bg-[#111214] border border-[#1F2023] rounded-xl p-4">
          <p className="text-[10px] text-[#5A5B5F] font-mono uppercase tracking-widest mb-2">Dismissed</p>
          <p className="text-2xl font-mono font-bold text-[#5A5B5F]">{rejectCount}</p>
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
          <p className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3" /> Total Saved
          </p>
          <p className="text-2xl font-mono font-bold text-emerald-400">{fmt(totalSaved)}</p>
        </div>
      </div>

      {/* Log table */}
      {logs.length === 0 ? (
        <div className="text-center py-20 bg-[#111214] border border-[#1F2023] rounded-xl">
          <ClipboardList className="w-10 h-10 text-[#2A2B2F] mx-auto mb-3" />
          <p className="text-[#5A5B5F] text-sm">No actions taken yet.</p>
          <p className="text-xs text-[#3A3B3F] mt-1">Approve or dismiss an issue to see the log here.</p>
        </div>
      ) : (
        <div className="bg-[#111214] border border-[#1F2023] rounded-xl overflow-hidden">
          <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-[#1F2023]">
            {['Action', 'Vendor', 'Amount Saved', 'Root Cause', 'Time'].map((h) => (
              <p key={h} className="text-[9px] uppercase tracking-widest text-[#5A5B5F] font-mono">{h}</p>
            ))}
          </div>
          <AnimatePresence>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-5 gap-4 px-5 py-4 border-b border-[#1A1B1E] hover:bg-[#141518] transition-colors items-center"
              >
                <div className="flex items-center gap-2">
                  {log.action === 'approve' ? (
                    <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" /> Resolved
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#5A5B5F]">
                      <X className="w-3.5 h-3.5" /> Dismissed
                    </span>
                  )}
                </div>
                <p className="text-xs text-white font-medium">{log.vendor}</p>
                <p className={`text-xs font-mono font-bold ${log.action === 'approve' ? 'text-emerald-400' : 'text-[#5A5B5F]'}`}>
                  {log.action === 'approve' ? fmt(log.amount) : '—'}
                </p>
                <p className="text-xs text-[#5A5B5F] truncate" title={log.description}>{log.description}</p>
                <p className="text-[10px] text-[#5A5B5F] font-mono">
                  {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
