import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, Search, ShieldAlert, ChevronRight, Zap, Target, Cpu, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AGENTS = [
  {
    id: 'agent-1',
    name: 'Spend Intelligence',
    role: 'Procurement Specialist',
    status: 'active',
    accuracy: 0.992,
    latency: 120,
    icon: Search,
    desc: 'Detects procurement anomalies and vendor payment leaks using historical baselines.',
    color: '#FF7A00'
  },
  {
    id: 'agent-2',
    name: 'Financial Recon',
    role: 'Audit Engine',
    status: 'active',
    accuracy: 0.998,
    latency: 85,
    icon: ShieldAlert,
    desc: 'Cross-verifies invoices against contracts and POs with explainable AI logic.',
    color: '#00E5FF'
  },
  {
    id: 'agent-3',
    name: 'Resource Ops',
    role: 'Infrastructure Analyst',
    status: 'active',
    accuracy: 0.985,
    latency: 240,
    icon: Activity,
    desc: 'Evaluates infrastructure and workforce utilization patterns for consolidation.',
    color: '#22c55e'
  },
  {
    id: 'agent-4',
    name: 'SLA Sentinel',
    role: 'Predictive Guard',
    status: 'standby',
    accuracy: 0.979,
    latency: 150,
    icon: Shield,
    desc: 'Proactively detects potential SLA violations using time-series forecasting.',
    color: '#6366f1'
  }
];

export function Agents() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#E6EDF3] flex items-center gap-2 italic font-serif">
            <Cpu className="w-6 h-6 text-[#FF7A00]" /> Intelligence Fleet
          </h1>
          <p className="text-xs text-[#5A5B5F] font-mono mt-1 uppercase tracking-widest">Multi-Agent Autonomous Framework v4.2</p>
        </div>
        <button className="bg-[#FF7A00] text-black px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#E66D00] transition-all hover:scale-105 shadow-[0_0_15px_rgba(255,122,0,0.3)]">
          Deploy New Agent
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {AGENTS.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => navigate(`/agents/${agent.id}`)}
            className="bg-[#11171D] border border-[#1C2632] rounded-2xl p-6 hover:border-[#FF7A00]/50 hover:shadow-[0_8px_30px_rgba(255,122,0,0.05)] transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#0B0F14] border border-[#1C2632] flex items-center justify-center text-[#5A5B5F] group-hover:text-[#FF7A00] group-hover:bg-[#FF7A00]/5 group-hover:border-[#FF7A00]/30 transition-all">
                  <agent.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#E6EDF3] group-hover:text-[#FF7A00] transition-colors">{agent.name}</h3>
                  <p className="text-xs text-[#5A5B5F] font-mono uppercase tracking-widest">{agent.role}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase tracking-widest border ${
                  agent.status === 'active' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-[#5A5B5F]/10 border-[#5A5B5F]/30 text-[#5A5B5F]'
                }`}>
                  {agent.status}
                </span>
                {agent.status === 'active' && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
              </div>
            </div>

            <p className="text-sm text-[#8B949E] leading-relaxed mb-8 line-clamp-2">
              {agent.desc}
            </p>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#1C2632]">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#5A5B5F] font-mono block mb-1">Precision</span>
                <p className="text-sm font-mono text-[#E6EDF3]">{(agent.accuracy * 100).toFixed(1)}%</p>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#5A5B5F] font-mono block mb-1">Latency</span>
                <p className="text-sm font-mono text-[#E6EDF3]">{agent.latency}ms</p>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#5A5B5F] font-mono block mb-1">Impact</span>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-[#FF7A00]" />
                  <span className="text-sm font-mono text-[#E6EDF3]">High</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#FF7A00] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
              Access Core Logic <ChevronRight className="w-3 h-3" />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* System Status Banner */}
      <div className="bg-[#0B0F14] border border-[#FF7A00]/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7A00]/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#FF7A00]/10 transition-colors" />
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-center justify-center text-[#FF7A00] shadow-[0_0_20px_rgba(255,122,0,0.1)]">
            <Target className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#E6EDF3]">Neural Mesh Coordination</h3>
            <p className="text-sm text-[#8B949E] mt-1">Cross-agent intelligence sync complete. All systems within 10ms variance.</p>
          </div>
        </div>
        <button className="relative z-10 px-6 py-3 border border-[#1C2632] hover:border-[#FF7A00]/50 rounded-xl text-[10px] font-bold uppercase tracking-widest text-[#5A5B5F] hover:text-[#E6EDF3] transition-all flex items-center gap-2 shadow-lg">
          <MessageSquare className="w-4 h-4" /> System Logs
        </button>
      </div>
    </div>
  );
}
