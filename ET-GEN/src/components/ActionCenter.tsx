import React from 'react';
import { History, User, Terminal, Shield, TrendingUp, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { useCostIntelligence } from '../lib/CostIntelligenceContext';
import { formatDistanceToNow } from 'date-fns';

export function ActionCenter() {
  const { logs, totalSavings } = useCostIntelligence();

  return (
    <div className="bg-[#151619] border border-[#2A2B2F] rounded-lg overflow-hidden h-full">
      <div className="p-4 border-b border-[#2A2B2F] flex items-center justify-between bg-[#1A1B1E]">
        <h3 className="text-sm font-semibold text-white uppercase tracking-widest font-mono flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#F27D26]" />
          Autonomous Action Center
        </h3>
        <span className="text-[10px] text-[#5A5B5F] font-mono">Audit Trail Active</span>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-2 mb-6">
          <div className="bg-[#1A1B1E] p-3 rounded border border-[#2A2B2F]">
            <span className="text-[8px] uppercase tracking-widest text-[#5A5B5F] font-mono block mb-1">Total Savings (MTD)</span>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3 h-3 text-green-400" />
              <motion.span 
                key={totalSavings}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-xl font-mono text-green-400"
              >
                ${totalSavings.toLocaleString()}
              </motion.span>
            </div>
          </div>
          <div className="bg-[#1A1B1E] p-3 rounded border border-[#2A2B2F]">
            <span className="text-[8px] uppercase tracking-widest text-[#5A5B5F] font-mono block mb-1">Actions Taken</span>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-white" />
              <motion.span 
                key={logs.length}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-xl font-mono text-white"
              >
                {logs.length}
              </motion.span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] text-[#8E9299] font-mono uppercase tracking-widest">
            <History className="w-3 h-3" />
            Recent Execution Logs
          </div>
          
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence initial={false}>
              {logs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-[10px] text-[#5A5B5F] font-mono uppercase">No actions logged yet</p>
                </div>
              ) : (
                logs.map((log) => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-start gap-3 p-2 hover:bg-[#1A1B1E] rounded transition-colors group"
                  >
                    <div className="mt-1">
                      {log.action === 'approve' ? (
                        <Terminal className="w-3 h-3 text-[#F27D26]" />
                      ) : (
                        <User className="w-3 h-3 text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-white leading-tight">{log.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] text-[#5A5B5F] font-mono">{formatDistanceToNow(new Date(log.timestamp))} ago</span>
                        <span className="text-[9px] text-[#5A5B5F] font-mono">•</span>
                        <span className="text-[9px] text-[#5A5B5F] font-mono">{log.status}</span>
                      </div>
                    </div>
                    <div className={cn(
                      "text-[8px] px-1.5 py-0.5 rounded font-mono uppercase",
                      log.action === 'approve' ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"
                    )}>
                      {log.action}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
