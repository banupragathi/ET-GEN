import React from 'react';
import { Agent } from '../types';
import { Activity, ShieldAlert, CheckCircle, Search } from 'lucide-react';
import { cn } from '../lib/utils';

interface AgentStatusProps {
  agents: Agent[];
}

export function AgentStatus({ agents }: AgentStatusProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {agents.map((agent) => (
        <div 
          key={agent.id}
          className="bg-[#151619] border border-[#2A2B2F] p-4 rounded-lg shadow-lg relative overflow-hidden group hover:border-[#F27D26] transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#1A1B1E] rounded-md border border-[#2A2B2F]">
              {agent.id === 'SPEND_INTEL' && <Search className="w-5 h-5 text-[#F27D26]" />}
              {agent.id === 'FINANCIAL_RECON' && <CheckCircle className="w-5 h-5 text-[#F27D26]" />}
              {agent.id === 'RESOURCE_OPT' && <Activity className="w-5 h-5 text-[#F27D26]" />}
              {agent.id === 'SLA_PREDICT' && <ShieldAlert className="w-5 h-5 text-[#F27D26]" />}
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-wider text-[#8E9299] font-mono">Efficiency</span>
              <span className="text-xl font-mono text-white">{agent.efficiency}%</span>
            </div>
          </div>
          
          <h3 className="text-sm font-semibold text-white mb-1">{agent.name}</h3>
          <p className="text-xs text-[#8E9299] mb-4 h-8 line-clamp-2">{agent.description}</p>
          
          <div className="flex items-center gap-2 pt-4 border-t border-[#2A2B2F]">
            <div className={cn(
              "w-2 h-2 rounded-full animate-pulse",
              agent.status === 'PROCESSING' ? "bg-blue-500" : 
              agent.status === 'ALERT' ? "bg-red-500" : "bg-green-500"
            )} />
            <span className="text-[10px] uppercase tracking-widest text-[#8E9299] font-mono">
              {agent.status}
            </span>
          </div>
          
          <div className="mt-2 text-[10px] text-[#5A5B5F] font-mono truncate italic">
            {agent.lastAction}
          </div>
        </div>
      ))}
    </div>
  );
}
