import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AGENTS } from '../utils/mockData';
import { ArrowLeft, Search, ShieldAlert, Activity, Shield, Terminal, Cpu, Network, Clock, TrendingUp } from 'lucide-react';
import { AnomalyList } from '../components/AnomalyList';
import { cn } from '../lib/utils';
import { useCostIntelligence } from '../lib/CostIntelligenceContext';

export function AgentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { anomalies, totalSavings } = useCostIntelligence();
  
  const agent = AGENTS.find(a => a.id === id);
  const agentAnomalies = anomalies.filter(a => a.agentId === id);

  if (!agent) return <div>Agent not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <button 
        onClick={() => navigate('/agents')}
        className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#8E9299] hover:text-white transition-colors font-mono"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Agents
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <div className="bg-[#151619] border border-[#2A2B2F] rounded-xl p-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 bg-[#1A1B1E] border border-[#2A2B2F] rounded-xl flex items-center justify-center text-[#F27D26]">
                {agent.id === 'SPEND_INTEL' && <Search className="w-8 h-8" />}
                {agent.id === 'FINANCIAL_RECON' && <ShieldAlert className="w-8 h-8" />}
                {agent.id === 'RESOURCE_OPT' && <Activity className="w-8 h-8" />}
                {agent.id === 'SLA_PREDICT' && <Shield className="w-8 h-8" />}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{agent.name}</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      agent.status === 'PROCESSING' ? "bg-blue-500" : 
                      agent.status === 'ALERT' ? "bg-red-500" : "bg-green-500"
                    )} />
                    <span className="text-[10px] uppercase tracking-widest text-[#8E9299] font-mono">{agent.status}</span>
                  </div>
                  <div className="h-3 w-px bg-[#2A2B2F]" />
                  <span className="text-[10px] uppercase tracking-widest text-[#8E9299] font-mono">ID: {agent.id}</span>
                </div>
              </div>
            </div>

            <p className="text-lg text-[#8E9299] leading-relaxed mb-8">{agent.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1A1B1E] p-6 rounded-xl border border-[#2A2B2F]">
                <span className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono block mb-2">Efficiency Rating</span>
                <div className="text-4xl font-mono text-white">{agent.efficiency}%</div>
                <div className="mt-4 h-1.5 w-full bg-[#151619] rounded-full overflow-hidden">
                  <div className="h-full bg-[#F27D26]" style={{ width: `${agent.efficiency}%` }} />
                </div>
              </div>
              <div className="bg-[#1A1B1E] p-6 rounded-xl border border-[#2A2B2F]">
                <span className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono block mb-2">Savings Impact</span>
                <div className="text-4xl font-mono text-green-400">${(totalSavings / 4).toFixed(1)}k</div>
                <div className="mt-4 flex items-center gap-1 text-[10px] text-green-400 font-mono">
                  <TrendingUp className="w-3 h-3" /> +12% this month
                </div>
              </div>
              <div className="bg-[#1A1B1E] p-6 rounded-xl border border-[#2A2B2F]">
                <span className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono block mb-2">Anomalies Detected</span>
                <div className="text-4xl font-mono text-white">{agentAnomalies.length}</div>
                <div className="mt-4 text-[10px] text-[#8E9299] font-mono uppercase tracking-widest">
                  {agentAnomalies.filter(a => a.status === 'PENDING').length} Pending Review
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white italic font-serif">Active Alerts for {agent.name}</h3>
            <AnomalyList filterAgentId={id} />
          </div>
        </div>

        <div className="lg:w-80 space-y-6">
          <div className="bg-[#151619] border border-[#2A2B2F] p-6 rounded-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest font-mono mb-6">Real-time Metrics</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] text-[#8E9299] font-mono uppercase tracking-widest">
                  <Terminal className="w-3 h-3" /> CPU Load
                </div>
                <span className="text-xs font-mono text-white">12.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] text-[#8E9299] font-mono uppercase tracking-widest">
                  <Cpu className="w-3 h-3" /> Memory
                </div>
                <span className="text-xs font-mono text-white">2.1 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] text-[#8E9299] font-mono uppercase tracking-widest">
                  <Network className="w-3 h-3" /> Latency
                </div>
                <span className="text-xs font-mono text-white">15ms</span>
              </div>
            </div>
          </div>

          <div className="bg-[#151619] border border-[#2A2B2F] p-6 rounded-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest font-mono mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#F27D26]" />
              Agent Log
            </h3>
            <div className="space-y-4">
              {[
                'Ingesting data from ERP...',
                'Analyzing historical baselines...',
                'Detecting seasonality trends...',
                'Cross-verifying invoices...',
              ].map((log, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#F27D26] mt-1.5" />
                  <div className="flex-1">
                    <p className="text-[11px] text-[#8E9299]">{log}</p>
                    <span className="text-[9px] text-[#5A5B5F] font-mono">{i + 1}m ago</span>
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
