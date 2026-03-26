import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingDown, TrendingUp, AlertTriangle, RefreshCw, ArrowUpRight } from 'lucide-react';
import { useCostIntelligence } from '../lib/CostIntelligenceContext';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell,
} from 'recharts';

const fmt = (n: number) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString('en-IN')}`;

const SEVERITY_COLOR: Record<string, string> = {
  CRITICAL: '#ef4444',
  HIGH: '#f97316',
  MEDIUM: '#eab308',
};

const MetricCard = ({
  label, value, sub, icon: Icon, accent, trend,
}: {
  label: string; value: string; sub?: string;
  icon: React.ElementType; accent: string; trend?: 'up' | 'down';
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[#111214] border border-[#1F2023] rounded-xl p-5 flex flex-col gap-3 hover:border-[#2A2B2F] transition-colors"
  >
    <div className="flex items-center justify-between">
      <span className="text-[11px] uppercase tracking-widest text-[#5A5B5F] font-mono">{label}</span>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center`} style={{ background: `${accent}18` }}>
        <Icon className="w-4 h-4" style={{ color: accent }} />
      </div>
    </div>
    <div className="flex items-end gap-2">
      <span className="text-2xl font-semibold text-white tracking-tight font-mono">{value}</span>
      {trend && (
        <span className={`text-xs mb-0.5 flex items-center gap-0.5 ${trend === 'up' ? 'text-red-400' : 'text-emerald-400'}`}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        </span>
      )}
    </div>
    {sub && <span className="text-xs text-[#5A5B5F]">{sub}</span>}
  </motion.div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#151619] border border-[#2A2B2F] px-3 py-2 rounded-lg shadow-xl">
      <p className="text-[10px] uppercase tracking-widest text-[#8E9299] font-mono mb-1">{label}</p>
      <p className="text-sm font-mono text-white">{fmt(payload[0].value)}</p>
    </div>
  );
};

export function Dashboard() {
  const { anomalies, metrics, loading, error, refresh } = useCostIntelligence();

  const activeIssues = useMemo(() => anomalies.filter((a) => a.status === 'pending'), [anomalies]);

  const vendorBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    anomalies.forEach((a) => { map[a.vendor] = (map[a.vendor] || 0) + a.amount; });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [anomalies]);

  const spendTrend = useMemo(() => {
    const byDate: Record<string, number> = {};
    anomalies.forEach((a) => {
      const d = a.timestamp.slice(0, 10);
      byDate[d] = (byDate[d] || 0) + a.amount;
    });
    return Object.entries(byDate).sort(([a], [b]) => a.localeCompare(b)).map(([date, value]) => ({
      date: date.slice(5),
      value,
    }));
  }, [anomalies]);

  const criticalCount = useMemo(() => activeIssues.filter((a) => a.severity === 'CRITICAL').length, [activeIssues]);
  const highCount = useMemo(() => activeIssues.filter((a) => a.severity === 'HIGH').length, [activeIssues]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <RefreshCw className="w-6 h-6 text-[#F27D26] animate-spin" />
      <p className="text-sm text-[#5A5B5F] font-mono">Loading intelligence data…</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <AlertTriangle className="w-8 h-8 text-red-500" />
      <p className="text-sm text-[#8E9299] max-w-sm text-center">{error}</p>
      <button onClick={refresh} className="px-4 py-2 text-xs font-mono uppercase tracking-widest bg-[#F27D26] text-black rounded-lg hover:bg-[#D96C1E] transition-colors">
        Retry
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Metric cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard label="Total Spend" value={fmt(metrics.total_spend)} icon={DollarSign} accent="#6366f1" sub="This billing cycle" />
        <MetricCard label="Potential Loss" value={fmt(metrics.potential_loss)} icon={TrendingDown} accent="#ef4444" trend="up" sub="If left unaddressed" />
        <MetricCard label="Recoverable Savings" value={fmt(metrics.recoverable_savings)} icon={TrendingUp} accent="#22c55e" trend="down" sub="Via approved actions" />
        <MetricCard label="Active Issues" value={String(activeIssues.length)} icon={AlertTriangle} accent="#F27D26" sub={`${criticalCount} critical · ${highCount} high`} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Spend trend */}
        <div className="xl:col-span-2 bg-[#111214] border border-[#1F2023] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-white">Spend Trend</h3>
              <p className="text-xs text-[#5A5B5F] font-mono mt-0.5">Daily transaction volume</p>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono border border-[#1F2023] px-2 py-1 rounded">Live</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={spendTrend} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2023" vertical={false} />
              <XAxis dataKey="date" stroke="#3A3B3F" fontSize={10} tickLine={false} axisLine={false} fontFamily="JetBrains Mono" />
              <YAxis stroke="#3A3B3F" fontSize={10} tickLine={false} axisLine={false} fontFamily="JetBrains Mono" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="value" stroke="#F27D26" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#F27D26' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Vendor breakdown */}
        <div className="bg-[#111214] border border-[#1F2023] rounded-xl p-6">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-white">Spend by Vendor</h3>
            <p className="text-xs text-[#5A5B5F] font-mono mt-0.5">Anomaly volume</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={vendorBreakdown} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2023" horizontal={false} />
              <XAxis type="number" stroke="#3A3B3F" fontSize={9} tickLine={false} axisLine={false} fontFamily="JetBrains Mono" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" stroke="#3A3B3F" fontSize={10} tickLine={false} axisLine={false} fontFamily="JetBrains Mono" width={48} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {vendorBreakdown.map((_, i) => (
                  <Cell key={i} fill={['#F27D26', '#6366f1', '#22c55e', '#3b82f6'][i % 4]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights strip */}
      <div className="bg-[#111214] border border-[#1F2023] rounded-xl p-5">
        <h3 className="text-[11px] uppercase tracking-widest text-[#5A5B5F] font-mono mb-4">System Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { dot: '#ef4444', text: `${criticalCount} critical-severity issues require immediate action` },
            { dot: '#F27D26', text: `${highCount} high-risk vendor anomalies detected this cycle` },
            { dot: '#22c55e', text: `${fmt(metrics.recoverable_savings)} can be recovered by approving flagged issues` },
          ].map(({ dot, text }) => (
            <div key={text} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: dot }} />
              <p className="text-xs text-[#8E9299] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
