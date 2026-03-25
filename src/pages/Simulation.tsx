import React from 'react';
import { motion } from 'framer-motion';
import { SimulationEngine } from '../components/SimulationEngine';
import { TrendingUp, Info } from 'lucide-react';

export function Simulation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#F27D26]/10 rounded-lg">
            <TrendingUp className="w-5 h-5 text-[#F27D26]" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">What-If Simulation Engine</h2>
        </div>
        <p className="text-[#8E9299] max-w-2xl">
          Model potential cost optimization scenarios and project ROI. Adjust parameters to see how autonomous actions could impact your bottom line.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <SimulationEngine />
        
        <div className="bg-[#151619] border border-[#2A2B2F] rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-500/10 rounded-lg mt-1">
              <Info className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">How it works</h4>
              <p className="text-xs text-[#8E9299] leading-relaxed">
                The simulation engine uses historical data and machine learning models to project savings. 
                <br /><br />
                • <b>Unused Resource Reduction:</b> Estimates savings by identifying and terminating idle cloud resources.
                <br />
                • <b>Vendor Consolidation:</b> Projects volume discounts and reduced overhead by merging overlapping SaaS vendors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
