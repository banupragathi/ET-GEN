import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingDown, TrendingUp, AlertTriangle, RefreshCw, ArrowUpRight, Brain, Copy, Server, FileText, Zap, ChevronRight, ShieldCheck } from 'lucide-react';
import { useCostIntelligence } from '../lib/CostIntelligenceContext';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell,
} from 'recharts';

const fmt = (n: number) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString('en-IN')}`;

const SEVERITY_COLOR: Record<string, string> = {
  CRITICAL: '#ef4444',
  HIGH: '#FF7A00',
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
    className="bg-[#11171D] border border-[#1C2632] rounded-xl p-5 flex flex-col gap-3 hover:border-[#FF7A00]/30 transition-all group"
  >
    <div className="flex items-center justify-between">
      <span className="text-[11px] uppercase tracking-widest text-[#5A5B5F] font-mono group-hover:text-[#8B949E] transition-colors">{label}</span>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors`} style={{ background: `${accent}18` }}>
        <Icon className="w-4 h-4" style={{ color: accent }} />
      </div>
    </div>
    <div className="flex items-end gap-2">
      <span className="text-2xl font-semibold text-[#E6EDF3] tracking-tight font-mono">{value}</span>
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
    <div className="bg-[#0B0F14] border border-[#1C2632] px-3 py-2 rounded-lg shadow-xl">
      <p className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono mb-1">{label}</p>
      <p className="text-sm font-mono text-[#E6EDF3]">{fmt(payload[0].value)}</p>
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

  const aiInsights = useMemo(() => {
    return activeIssues.slice(0, 4).map(issue => {
       let icon = FileText;
       let action = "Review transaction";
       
       if (issue.anomalyLabel.includes('Duplicate')) {
         icon = Copy;
         action = `Reject duplicate to save ${fmt(issue.impact)}`;
       } else if (issue.anomalyLabel.includes('Idle') || issue.anomalyLabel.includes('Cloud')) {
         icon = Server;
         action = `Decommission resources to save ${fmt(issue.impact)}`;
       } else if (issue.anomalyLabel.includes('SLA')) {
         icon = Zap;
         action = `Investigate breach to prevent ${fmt(issue.impact)} penalty`;
       }

       return {
         id: issue.id,
         title: issue.anomalyLabel,
         description: issue.rootCause,
         action: action,
         icon: icon,
         severity: issue.severity
       };
    });
  }, [activeIssues]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <RefreshCw className="w-6 h-6 text-[#FF7A00] animate-spin" />
      <p className="text-sm text-[#5A5B5F] font-mono">Loading telemetry...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <AlertTriangle className="w-8 h-8 text-red-500" />
      <p className="text-sm text-[#8B949E] max-w-sm text-center">{error}</p>
      <button onClick={refresh} className="px-4 py-2 text-xs font-mono uppercase tracking-widest bg-[#FF7A00] text-black rounded-lg hover:bg-[#E66D00] transition-colors">
        Retry
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Metric cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard label="Total Spend" value={fmt(metrics.total_spend)} icon={DollarSign} accent="#00E5FF" sub="This billing cycle" />
        <MetricCard label="Potential Loss" value={fmt(metrics.potential_loss)} icon={TrendingDown} accent="#ef4444" trend="up" sub="If left unaddressed" />
        <MetricCard label="Recoverable Savings" value={fmt(metrics.recoverable_savings)} icon={TrendingUp} accent="#22c55e" trend="down" sub="Via approved actions" />
        <MetricCard label="Active Issues" value={String(activeIssues.length)} icon={AlertTriangle} accent="#FF7A00" sub={`${criticalCount} critical · ${highCount} high`} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Spend trend */}
        <div className="xl:col-span-2 bg-[#11171D] border border-[#1C2632] rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-[#E6EDF3]">Spend Trend</h3>
              <p className="text-xs text-[#5A5B5F] font-mono mt-0.5">Daily transaction volume</p>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono border border-[#1C2632] px-2 py-1 rounded">Live</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={spendTrend} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C2632" vertical={false} />
              <XAxis dataKey="date" stroke="#3A3B3F" fontSize={10} tickLine={false} axisLine={false} fontFamily="JetBrains Mono" />
              <YAxis stroke="#3A3B3F" fontSize={10} tickLine={false} axisLine={false} fontFamily="JetBrains Mono" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="value" stroke="#FF7A00" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#FF7A00' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Vendor breakdown */}
        <div className="bg-[#11171D] border border-[#1C2632] rounded-xl p-6 shadow-lg">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-[#E6EDF3]">Spend by Vendor</h3>
            <p className="text-xs text-[#5A5B5F] font-mono mt-0.5">Anomaly volume</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={vendorBreakdown} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C2632" horizontal={false} />
              <XAxis type="number" stroke="#3A3B3F" fontSize={9} tickLine={false} axisLine={false} fontFamily="JetBrains Mono" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" stroke="#3A3B3F" fontSize={10} tickLine={false} axisLine={false} fontFamily="JetBrains Mono" width={48} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {vendorBreakdown.map((_, i) => (
                  <Cell key={i} fill={['#FF7A00', '#00E5FF', '#22c55e', '#6366f1'][i % 4]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="bg-[#11171D] border border-[#1C2632] rounded-xl p-6 relative overflow-hidden shadow-xl">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-64 bg-[#FF7A00]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-6 relative z-10">
          <Brain className="w-5 h-5 text-[#FF7A00]" />
          <h3 className="text-sm font-bold text-[#E6EDF3] tracking-wide">Autonomous Intelligence</h3>
          <span className="text-[10px] uppercase tracking-widest text-[#FF7A00] font-mono border border-[#FF7A00]/30 bg-[#FF7A00]/10 px-2 py-0.5 rounded ml-2">Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {aiInsights.length > 0 ? aiInsights.map((insight, idx) => (
            <div key={insight.id || idx} className="bg-[#0B0F14]/50 border border-[#1C2632] rounded-xl p-5 hover:border-[#FF7A00]/50 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(255,122,0,0.1)] transition-all duration-300 group flex flex-col sm:flex-row gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#11171D] border border-[#1C2632] flex items-center justify-center shrink-0 group-hover:bg-[#FF7A00]/10 group-hover:text-[#FF7A00] group-hover:border-[#FF7A00]/30 transition-all text-[#5A5B5F]">
                <insight.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className="text-sm font-semibold text-[#E6EDF3] truncate">{insight.title}</h4>
                  <span className={`text-[9px] uppercase tracking-widest font-mono px-2 py-0.5 rounded border ${
                    insight.severity === 'CRITICAL' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                    insight.severity === 'HIGH' ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' :
                    'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                  }`}>
                    {insight.severity}
                  </span>
                </div>
                <p className="text-xs text-[#8B949E] mb-4 line-clamp-2 leading-relaxed">{insight.description}</p>
                
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#5A5B5F] group-hover:text-[#FF7A00] transition-colors cursor-pointer">
                  <span>{insight.action}</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-1 md:col-span-2 py-10 text-center border-2 border-dashed border-[#1C2632] rounded-xl bg-[#0B0F14]/30">
              <ShieldCheck className="w-8 h-8 text-[#22c55e] mx-auto mb-3 opacity-60" />
              <p className="text-sm font-semibold text-[#E6EDF3] mb-1">Architecture Clear</p>
              <p className="text-xs text-[#5A5B5F]">No active insights requiring autonomous intervention.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

