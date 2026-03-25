import React from 'react';
import { motion } from 'framer-motion';
import { AnomalyList } from '../components/AnomalyList';
import { Filter, Download, Calendar } from 'lucide-react';
import { useCostIntelligence } from '../lib/CostIntelligenceContext';
import { cn } from '../lib/utils';

export function Alerts() {
  const { anomalies } = useCostIntelligence();

  const stats = [
    { label: 'Critical', count: anomalies.filter(a => a.confidence > 0.9).length, color: 'bg-red-500', width: '40%' },
    { label: 'High', count: anomalies.filter(a => a.confidence > 0.8 && a.confidence <= 0.9).length, color: 'bg-orange-500', width: '60%' },
    { label: 'Medium', count: anomalies.filter(a => a.confidence <= 0.8).length, color: 'bg-blue-500', width: '80%' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 italic font-serif">Intelligence Alerts</h2>
          <p className="text-sm text-[#8E9299]">Comprehensive list of all detected anomalies and cost leakage patterns.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-[#2A2B2F] text-[#8E9299] text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded hover:text-white hover:border-white transition-colors">
            <Filter className="w-3 h-3" /> Filter
          </button>
          <button className="flex items-center gap-2 border border-[#2A2B2F] text-[#8E9299] text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded hover:text-white hover:border-white transition-colors">
            <Download className="w-3 h-3" /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <AnomalyList />
        </div>
        
        <div className="space-y-6">
          <div className="bg-[#151619] border border-[#2A2B2F] p-6 rounded-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest font-mono mb-6">Alert Statistics</h3>
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono block mb-2">Severity Distribution</span>
                <div className="space-y-2">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="flex justify-between text-[10px] font-mono mb-1">
                        <span className="text-[#8E9299]">{stat.label}</span>
                        <span className="text-white">{stat.count}</span>
                      </div>
                      <div className="w-full bg-[#1A1B1E] h-1 rounded-full">
                        <div className={cn("h-full rounded-full", stat.color)} style={{ width: stat.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono block mb-2">Resolution Rate</span>
                <div className="text-3xl font-mono text-white">84.2%</div>
                <p className="text-[10px] text-[#8E9299] mt-1">+2.4% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-[#151619] border border-[#2A2B2F] p-6 rounded-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#F27D26]" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-l border-[#2A2B2F] pl-4 py-1">
                  <p className="text-xs text-white">Anomaly ANOM-00{i} Resolved</p>
                  <span className="text-[10px] text-[#5A5B5F] font-mono">2 hours ago</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
