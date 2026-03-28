import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cloud, FileText, Server, Plus, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

export function DataSources() {
  const sources = [
    { id: '1', name: 'AWS CloudWatch', type: 'Cloud', status: 'CONNECTED', sync: '12m ago', health: 99.9 },
    { id: '2', name: 'Azure Monitor', type: 'Cloud', status: 'CONNECTED', sync: '45m ago', health: 98.5 },
    { id: '3', name: 'SAP ERP Platform', type: 'ERP', status: 'CONNECTED', sync: '1h ago', health: 94.2 },
    { id: '4', name: 'Oracle Financials', type: 'ERP', status: 'ERROR', sync: '3h ago', health: 0 },
    { id: '5', name: 'Vendor Contracts (PDF)', type: 'Unstructured', status: 'CONNECTED', sync: '5h ago', health: 100 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#E6EDF3] flex items-center gap-2 italic font-serif">
            <Database className="w-6 h-6 text-[#FF7A00]" /> Intelligence Ingestion
          </h1>
          <p className="text-xs text-[#5A5B5F] font-mono mt-1 uppercase tracking-widest">Enterprise Data Pipeline v4.2</p>
        </div>
        <button className="bg-[#FF7A00] text-black px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#E66D00] transition-all hover:scale-105 shadow-[0_0_15px_rgba(255,122,0,0.3)] flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Source
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.map((source, i) => (
          <motion.div 
            key={source.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#11171D] border border-[#1C2632] rounded-2xl p-6 hover:border-[#FF7A00]/50 hover:shadow-[0_8px_30px_rgba(255,122,0,0.05)] transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#0B0F14] border border-[#1C2632] rounded-xl flex items-center justify-center text-[#5A5B5F] group-hover:text-[#FF7A00] group-hover:bg-[#FF7A00]/5 group-hover:border-[#FF7A00]/30 transition-all">
                  {source.type === 'Cloud' && <Cloud className="w-6 h-6" />}
                  {source.type === 'ERP' && <Server className="w-6 h-6" />}
                  {source.type === 'Unstructured' && <FileText className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-md font-bold text-[#E6EDF3] group-hover:text-[#FF7A00] transition-colors">{source.name}</h3>
                  <span className="text-[9px] uppercase tracking-widest text-[#5A5B5F] font-mono">{source.type}</span>
                </div>
              </div>
              <div className={cn(
                "w-2 h-2 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse",
                source.status === 'CONNECTED' ? "bg-emerald-500" : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
              )} />
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-[#5A5B5F] uppercase tracking-widest">Last Sync</span>
                <span className="text-[#E6EDF3]">{source.sync}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-[#5A5B5F] uppercase tracking-widest">Health Score</span>
                <span className={cn(
                  "font-bold",
                  source.health > 90 ? "text-emerald-400" : "text-red-400"
                )}>{source.health}%</span>
              </div>
              <div className="w-full bg-[#0B0F14] h-1 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full transition-all duration-1000",
                    source.health > 90 ? "bg-emerald-500" : "bg-red-500"
                  )} 
                  style={{ width: `${source.health}%` }} 
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-[#11171D] border border-[#1C2632] hover:border-[#FF7A00]/50 text-[#5A5B5F] hover:text-[#E6EDF3] text-[10px] font-bold uppercase tracking-widest py-3 rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-[#FF7A00]/5">
                <RefreshCw className="w-3 h-3" /> Sync Pulse
              </button>
              <button className="px-4 border border-[#1C2632] hover:bg-white/5 text-[#5A5B5F] hover:text-[#E6EDF3] text-[10px] font-bold uppercase tracking-widest py-3 rounded-xl transition-all font-mono">
                CFG
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Ingestion Pipeline Overlay */}
      <div className="bg-[#11171D] border border-[#1C2632] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-[#1C2632] bg-[#0B0F14]/50">
          <h3 className="text-xs font-bold text-[#E6EDF3] uppercase tracking-[0.2em] font-mono flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Ingestion Pipeline Real-time Status
          </h3>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono block mb-1">Ingestion Throughput</span>
                <span className="text-2xl font-mono text-[#E6EDF3]">1.2M <span className="text-sm text-[#5A5B5F]">eps</span></span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 flex items-center justify-center text-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono block mb-1">Vector Drift Pattern</span>
                <span className="text-2xl font-mono text-[#E6EDF3]">0.02%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="h-2.5 w-full bg-[#0B0F14] rounded-full overflow-hidden flex shadow-inner">
              <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" style={{ width: '85%' }} />
              <div className="h-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]" style={{ width: '10%' }} />
              <div className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" style={{ width: '5%' }} />
            </div>
            <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
              <span className="text-emerald-400 flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Healthy (85%)</span>
              <span className="text-yellow-400 flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" /> Latent (10%)</span>
              <span className="text-red-400 flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-red-400 rounded-full" /> Critical (5%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

