import React from 'react';
import { motion } from 'framer-motion';
import { AGENTS } from '../utils/mockData';
import { Search, ShieldAlert, Activity, Shield, ChevronRight, Terminal, Cpu, Network } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Agents() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 italic font-serif">Autonomous Intelligence Agents</h2>
          <p className="text-sm text-[#8E9299]">Manage and monitor the performance of your specialized cost optimization agents.</p>
        </div>
        <button className="bg-[#F27D26] text-black text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded hover:bg-[#D96C1E] transition-colors">
          Deploy New Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {AGENTS.map((agent) => (
          <div 
            key={agent.id}
            onClick={() => navigate(`/agents/${agent.id}`)}
            className="bg-[#151619] border border-[#2A2B2F] rounded-xl p-6 hover:border-[#F27D26] transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1A1B1E] border border-[#2A2B2F] rounded-lg flex items-center justify-center group-hover:bg-[#F27D26] group-hover:text-black transition-colors">
                  {agent.id === 'SPEND_INTEL' && <Search className="w-6 h-6" />}
                  {agent.id === 'FINANCIAL_RECON' && <ShieldAlert className="w-6 h-6" />}
                  {agent.id === 'RESOURCE_OPT' && <Activity className="w-6 h-6" />}
                  {agent.id === 'SLA_PREDICT' && <Shield className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      agent.status === 'PROCESSING' ? "bg-blue-500" : 
                      agent.status === 'ALERT' ? "bg-red-500" : "bg-green-500"
                    )} />
                    <span className="text-[10px] uppercase tracking-widest text-[#8E9299] font-mono">{agent.status}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono block mb-1">Efficiency</span>
                <span className="text-2xl font-mono text-white">{agent.efficiency}%</span>
              </div>
            </div>

            <p className="text-sm text-[#8E9299] mb-6 leading-relaxed">{agent.description}</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[#1A1B1E] p-3 rounded border border-[#2A2B2F]">
                <div className="flex items-center gap-2 text-[8px] uppercase tracking-widest text-[#5A5B5F] font-mono mb-1">
                  <Terminal className="w-3 h-3" /> CPU Load
                </div>
                <span className="text-xs font-mono text-white">12.4%</span>
              </div>
              <div className="bg-[#1A1B1E] p-3 rounded border border-[#2A2B2F]">
                <div className="flex items-center gap-2 text-[8px] uppercase tracking-widest text-[#5A5B5F] font-mono mb-1">
                  <Cpu className="w-3 h-3" /> Memory
                </div>
                <span className="text-xs font-mono text-white">2.1 GB</span>
              </div>
              <div className="bg-[#1A1B1E] p-3 rounded border border-[#2A2B2F]">
                <div className="flex items-center gap-2 text-[8px] uppercase tracking-widest text-[#5A5B5F] font-mono mb-1">
                  <Network className="w-3 h-3" /> Latency
                </div>
                <span className="text-xs font-mono text-white">15ms</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#2A2B2F]">
              <span className="text-[10px] text-[#5A5B5F] font-mono italic truncate max-w-[200px]">
                {agent.lastAction}
              </span>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#F27D26]">
                View Insights <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
