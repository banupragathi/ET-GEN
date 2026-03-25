import React from 'react';
import { motion } from 'framer-motion';
import { AGENTS } from '../utils/mockData';
import { AgentStatus } from '../components/AgentStatus';
import { AnomalyList } from '../components/AnomalyList';
import { FinancialImpactCharts } from '../components/FinancialImpactCharts';
import { ActionCenter } from '../components/ActionCenter';
import { cn } from '../lib/utils';
import { useCostIntelligence } from '../lib/CostIntelligenceContext';

export function Dashboard() {
  const { anomalies } = useCostIntelligence();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Top Stats & Agents */}
      <AgentStatus agents={AGENTS} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column: Charts & Anomalies */}
        <div className="xl:col-span-2 space-y-8">
          <FinancialImpactCharts />
          <AnomalyList />
        </div>

        {/* Right Column: Action Center & Simulations */}
        <div className="space-y-8">
          <ActionCenter />
          
          {/* System Health / Data Streams */}
          <div className="bg-[#151619] border border-[#2A2B2F] p-4 rounded-lg">
            <h3 className="text-[10px] uppercase tracking-widest text-[#8E9299] font-mono mb-4">Ingestion Streams</h3>
            <div className="space-y-3">
              {[
                { name: 'ERP Platforms', status: 'Active', latency: '12ms' },
                { name: 'Vendor Contracts', status: 'Active', latency: '45ms' },
                { name: 'Cloud Usage Logs', status: 'Active', latency: '8ms' },
                { name: 'Financial DB', status: 'Standby', latency: '-' },
              ].map((stream) => (
                <div key={stream.name} className="flex items-center justify-between">
                  <span className="text-xs text-white">{stream.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-mono text-[#5A5B5F]">{stream.latency}</span>
                    <span className={cn(
                      "text-[8px] px-1.5 py-0.5 rounded font-mono uppercase",
                      stream.status === 'Active' ? "text-green-500 bg-green-500/10" : "text-[#5A5B5F] bg-[#1A1B1E]"
                    )}>
                      {stream.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
