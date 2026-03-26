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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 italic font-serif">Enterprise Data Ingestion</h2>
          <p className="text-sm text-[#8E9299]">Manage and monitor the data streams feeding your cost intelligence engine.</p>
        </div>
        <button className="bg-[#F27D26] text-black text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded hover:bg-[#D96C1E] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Data Source
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.map((source) => (
          <div 
            key={source.id}
            className="bg-[#151619] border border-[#2A2B2F] rounded-xl p-6 hover:border-[#F27D26] transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#1A1B1E] border border-[#2A2B2F] rounded-lg flex items-center justify-center group-hover:bg-[#F27D26] group-hover:text-black transition-colors">
                  {source.type === 'Cloud' && <Cloud className="w-5 h-5" />}
                  {source.type === 'ERP' && <Server className="w-5 h-5" />}
                  {source.type === 'Unstructured' && <FileText className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-md font-bold text-white">{source.name}</h3>
                  <span className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono">{source.type}</span>
                </div>
              </div>
              <div className={cn(
                "w-2 h-2 rounded-full",
                source.status === 'CONNECTED' ? "bg-green-500" : "bg-red-500"
              )} />
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-[#8E9299] uppercase tracking-widest">Last Sync</span>
                <span className="text-white">{source.sync}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-[#8E9299] uppercase tracking-widest">Health Score</span>
                <span className={cn(
                  source.health > 90 ? "text-green-500" : "text-red-500"
                )}>{source.health}%</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-[#1A1B1E] border border-[#2A2B2F] hover:border-[#F27D26] text-[#8E9299] hover:text-white text-[10px] font-bold uppercase tracking-widest py-2 rounded transition-all flex items-center justify-center gap-2">
                <RefreshCw className="w-3 h-3" /> Sync Now
              </button>
              <button className="px-3 border border-[#2A2B2F] hover:bg-white/5 text-[#8E9299] hover:text-white text-[10px] font-bold uppercase tracking-widest py-2 rounded transition-all">
                Config
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#151619] border border-[#2A2B2F] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#2A2B2F] bg-[#1A1B1E]">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest font-mono">Ingestion Pipeline Status</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-8 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono block">Ingestion Rate</span>
                <span className="text-xl font-mono text-white">1.2M events/s</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono block">Data Drift</span>
                <span className="text-xl font-mono text-white">0.02%</span>
              </div>
            </div>
          </div>
          
          <div className="h-2 w-full bg-[#1A1B1E] rounded-full overflow-hidden flex">
            <div className="h-full bg-green-500" style={{ width: '85%' }} />
            <div className="h-full bg-yellow-500" style={{ width: '10%' }} />
            <div className="h-full bg-red-500" style={{ width: '5%' }} />
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-mono text-[#5A5B5F]">
            <span>Healthy (85%)</span>
            <span>Warning (10%)</span>
            <span>Critical (5%)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
