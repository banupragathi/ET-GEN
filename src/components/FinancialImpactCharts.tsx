import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { useCostIntelligence } from '../lib/CostIntelligenceContext';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#151619] border border-[#2A2B2F] p-3 rounded-lg shadow-xl">
        <p className="text-[10px] uppercase tracking-widest text-[#8E9299] font-mono mb-1">{payload[0].payload.name}</p>
        <p className="text-lg font-mono text-white">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export function FinancialImpactCharts() {
  const { totalSavings } = useCostIntelligence();

  const data = [
    { name: 'Procurement', value: 45000 + (totalSavings * 0.4), color: '#F27D26' },
    { name: 'Cloud Infra', value: 32000 + (totalSavings * 0.3), color: '#D96C1E' },
    { name: 'SLA Penalties', value: 28000 + (totalSavings * 0.2), color: '#BF5B1A' },
    { name: 'Reconciliation', value: 15000 + (totalSavings * 0.1), color: '#A64A16' },
  ];

  const totalPotential = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#151619] border border-[#2A2B2F] p-6 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest font-mono">Cost Leakage by Domain</h3>
          <span className="text-[10px] text-[#5A5B5F] font-mono">Real-time Stream</span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2B2F" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#5A5B5F" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                fontFamily="JetBrains Mono"
              />
              <YAxis 
                stroke="#5A5B5F" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                fontFamily="JetBrains Mono"
                tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1A1B1E' }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#151619] border border-[#2A2B2F] p-6 rounded-xl relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest font-mono">Potential ROI Distribution</h3>
          <span className="text-[10px] text-[#5A5B5F] font-mono">Projected Q3</span>
        </div>
        <div className="h-64 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute flex flex-col items-center pointer-events-none">
            <span className="text-[8px] uppercase tracking-widest text-[#8E9299] font-mono">Total Impact</span>
            <span className="text-xl font-mono text-white">${(totalPotential/1000).toFixed(1)}k</span>
          </div>
        </div>
      </div>
    </div>
  );
}
