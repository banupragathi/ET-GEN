import React, { useState, useMemo } from 'react';
import { Play, TrendingUp, Zap, Settings2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { useCostIntelligence } from '../lib/CostIntelligenceContext';

const SCENARIOS = [
  {
    id: 'SCEN-1',
    name: 'Vendor Consolidation',
    description: 'Merge overlapping SaaS vendors for CRM and Marketing automation to leverage volume discounts.',
    baseSavings: 145000,
    roi: 320,
    confidence: 0.92,
  },
  {
    id: 'SCEN-2',
    name: 'Cloud Resource Rightsizing',
    description: 'Automatically terminate idle EC2 instances and right-size over-provisioned RDS databases.',
    baseSavings: 82000,
    roi: 450,
    confidence: 0.88,
  }
];

export function SimulationEngine() {
  const { simulationParams, setSimulationParams } = useCostIntelligence();
  const [activeScenario, setActiveScenario] = useState<string | null>(SCENARIOS[0].id);

  const calculatedSavings = useMemo(() => {
    if (activeScenario === 'SCEN-2') {
      return (simulationParams.unusedResourceReduction / 20) * 82000;
    }
    if (activeScenario === 'SCEN-1') {
      return (simulationParams.vendorConsolidationCount / 5) * 145000;
    }
    return 0;
  }, [activeScenario, simulationParams]);

  return (
    <div className="bg-[#151619] border border-[#2A2B2F] p-6 rounded-xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest font-mono flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#F27D26]" />
            Simulation Control Panel
          </h3>
          <p className="text-[10px] text-[#8E9299] mt-1 uppercase tracking-wider">Predictive Financial Modeling Engine</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {SCENARIOS.map((scenario) => (
            <motion.div 
              key={scenario.id}
              layout
              className={cn(
                "bg-[#1A1B1E] border p-4 rounded-lg group transition-all cursor-pointer",
                activeScenario === scenario.id ? "border-[#F27D26] ring-1 ring-[#F27D26]/20" : "border-[#2A2B2F] hover:border-[#F27D26]/50"
              )}
              onClick={() => setActiveScenario(scenario.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-tight">{scenario.name}</h4>
                <Play className={cn(
                  "w-4 h-4 text-[#F27D26] transition-opacity",
                  activeScenario === scenario.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )} />
              </div>
              <p className="text-xs text-[#8E9299] mb-4 leading-relaxed">{scenario.description}</p>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-[#151619] p-2 rounded border border-[#2A2B2F]">
                  <span className="text-[8px] uppercase tracking-widest text-[#5A5B5F] font-mono block">Base ROI</span>
                  <span className="text-xs font-mono text-white">{scenario.roi}%</span>
                </div>
                <div className="bg-[#151619] p-2 rounded border border-[#2A2B2F]">
                  <span className="text-[8px] uppercase tracking-widest text-[#5A5B5F] font-mono block">Confidence</span>
                  <span className="text-xs font-mono text-white">{(scenario.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="bg-[#151619] p-2 rounded border border-[#2A2B2F]">
                  <span className="text-[8px] uppercase tracking-widest text-[#5A5B5F] font-mono block">Impact</span>
                  <span className="text-xs font-mono text-green-400">High</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#1A1B1E] border border-[#2A2B2F] rounded-lg p-6 flex flex-col">
          <AnimatePresence mode="wait">
            {activeScenario ? (
              <motion.div 
                key={activeScenario}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1"
              >
                <div className="flex items-center gap-2 text-[10px] text-[#F27D26] font-mono uppercase tracking-widest mb-4">
                  <Settings2 className="w-3 h-3" />
                  Scenario Parameters
                </div>

                {activeScenario === 'SCEN-2' ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-[#8E9299] uppercase">Resource Reduction Target</span>
                        <span className="text-white font-bold">{simulationParams.unusedResourceReduction}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="100" 
                        value={simulationParams.unusedResourceReduction}
                        onChange={(e) => setSimulationParams({ ...simulationParams, unusedResourceReduction: Number(e.target.value) })}
                        className="w-full accent-[#F27D26] bg-[#151619] h-1.5 rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-[#8E9299] uppercase">Vendor Consolidation Count</span>
                        <span className="text-white font-bold">{simulationParams.vendorConsolidationCount} Vendors</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="20" 
                        value={simulationParams.vendorConsolidationCount}
                        onChange={(e) => setSimulationParams({ ...simulationParams, vendorConsolidationCount: Number(e.target.value) })}
                        className="w-full accent-[#F27D26] bg-[#151619] h-1.5 rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-8">
                  <div className="bg-[#0A0B0D] border border-[#2A2B2F] p-6 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2">
                      <TrendingUp className="w-12 h-12 text-[#F27D26]/10" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8E9299] font-mono block mb-2">Projected Annual Savings</span>
                    <motion.div 
                      key={calculatedSavings}
                      initial={{ scale: 1.1, color: '#F27D26' }}
                      animate={{ scale: 1, color: '#4ade80' }}
                      className="text-4xl font-mono font-bold"
                    >
                      ${calculatedSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </motion.div>
                    <div className="mt-4 flex items-center gap-2 text-[10px] text-[#8E9299] font-mono">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      Confidence: {(SCENARIOS.find(s => s.id === activeScenario)?.confidence! * 100).toFixed(0)}%
                    </div>
                  </div>

                  <button className="w-full mt-6 bg-white text-black text-[10px] font-bold uppercase tracking-widest py-4 rounded hover:bg-[#F27D26] transition-all flex items-center justify-center gap-2 group">
                    Deploy Autonomous Playbook
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <Zap className="w-12 h-12 text-[#2A2B2F] mb-4" />
                <p className="text-xs text-[#5A5B5F] uppercase tracking-widest">Select a scenario to begin simulation</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
