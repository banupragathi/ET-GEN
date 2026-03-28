import React, { useState } from 'react';
import { useCostIntelligence, Anomaly } from '../lib/CostIntelligenceContext';
import { AlertTriangle, TrendingDown, Clock, ShieldCheck, XCircle, Brain, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { GoogleGenerativeAI } from "@google/generative-ai";

const fmt = (n: number) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(2)}L` : `₹${n.toLocaleString('en-IN')}`;

export function AnomalyList() {
  const { anomalies, approveAnomaly, rejectAnomaly } = useCostIntelligence();
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, string>>({});

  const pendingAnomalies = anomalies.filter(a => a.status === 'pending');

  const handleAiAnalyze = async (anomaly: Anomaly) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setAiAnalysis(prev => ({ ...prev, [anomaly.id]: "API Key not configured. Set VITE_GEMINI_API_KEY." }));
      return;
    }

    setAnalyzingId(anomaly.id);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Analyze this cost anomaly for an enterprise cost intelligence system:
      Type: ${anomaly.anomalyLabel}
      Description: ${anomaly.rootCause}
      Amount: ${fmt(anomaly.amount)}
      Confidence: ${anomaly.confidence}
      Vendor: ${anomaly.vendor || 'N/A'}
      
      Provide a concise 2-sentence autonomous recommendation on whether to approve or reject this action, and why.`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      setAiAnalysis(prev => ({ ...prev, [anomaly.id]: responseText || "Analysis failed." }));
    } catch (error) {
      console.error("AI Analysis failed:", error);
      setAiAnalysis(prev => ({ ...prev, [anomaly.id]: "AI Engine currently offline. Recommended action: Manual Review." }));
    } finally {
      setAnalyzingId(null);
    }
  };

  if (pendingAnomalies.length === 0) {
    return (
      <div className="bg-[#0B0F14] border border-[#1C2632] rounded-xl p-12 text-center">
        <div className="w-16 h-16 bg-[#FF7A00]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-8 h-8 text-[#FF7A00]" />
        </div>
        <h3 className="text-[#E6EDF3] font-bold mb-2">System Clear</h3>
        <p className="text-[#8B949E] text-sm">No pending anomalies detected. Autonomous engine is monitoring all data streams.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-[#E6EDF3] flex items-center gap-2 italic font-serif">
          <AlertTriangle className="w-5 h-5 text-[#FF7A00]" />
          Prioritized Intelligence Alerts
        </h2>
        <span className="text-[10px] uppercase tracking-widest text-[#8B949E] font-mono">
          Sorted by Financial Impact
        </span>
      </div>
      
      {pendingAnomalies.map((anomaly) => (
        <div 
          key={anomaly.id}
          className="bg-[#11171D] border border-[#1C2632] rounded-xl overflow-hidden hover:border-[#FF7A00]/50 transition-all group shadow-lg"
        >
          <div className="p-5 flex flex-col md:flex-row gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className={cn(
                  "text-[9px] px-2 py-0.5 rounded font-mono uppercase tracking-widest border",
                  anomaly.confidence > 0.9 ? "bg-red-500/10 text-red-400 border-red-500/30" :
                  anomaly.confidence > 0.8 ? "bg-orange-500/10 text-orange-400 border-orange-500/30" :
                  "bg-blue-500/10 text-[#00E5FF] border-[#00E5FF]/30"
                )}>
                  {anomaly.confidence > 0.9 ? 'CRITICAL' : anomaly.confidence > 0.8 ? 'HIGH' : 'MEDIUM'}
                </span>
                <span className="text-[10px] text-[#5A5B5F] font-mono">
                  #{anomaly.id}
                </span>
                <span className="text-[10px] text-[#5A5B5F] font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(new Date(anomaly.timestamp))} ago
                </span>
              </div>
              
              <h3 className="text-md font-semibold text-[#E6EDF3] mb-3">{anomaly.anomalyLabel}</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0B0F14]/50 p-4 rounded-xl border border-[#1C2632] mb-4">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#5A5B5F] font-mono block mb-1">Root Cause</span>
                  <p className="text-xs text-[#8B949E] italic leading-relaxed">{anomaly.rootCause}</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#5A5B5F] font-mono block mb-1">Context</span>
                  <p className="text-xs text-[#8B949E] font-semibold">{anomaly.vendor || 'N/A'}</p>
                </div>
              </div>

              {aiAnalysis[anomaly.id] && (
                <div className="p-4 bg-[#FF7A00]/5 border border-[#FF7A00]/20 rounded-xl flex gap-3 mb-4">
                  <Brain className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-[#FF7A00] font-mono block mb-1">Autonomous Recommendation</span>
                    <p className="text-xs text-[#8B949E] italic leading-relaxed">{aiAnalysis[anomaly.id]}</p>
                  </div>
                </div>
              )}

              <button 
                onClick={() => handleAiAnalyze(anomaly)}
                disabled={analyzingId === anomaly.id}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#FF7A00] font-bold hover:text-[#E66D00] transition-colors disabled:opacity-50"
              >
                {analyzingId === anomaly.id ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Brain className="w-3 h-3" />
                )}
                {aiAnalysis[anomaly.id] ? "Re-Analyze" : "AI Deep Analysis"}
              </button>
            </div>
            
            <div className="md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#1C2632] pt-6 md:pt-0 md:pl-6">
              <div>
                <div className="mb-6">
                  <span className="text-[9px] uppercase tracking-widest text-[#5A5B5F] font-mono block mb-1">Financial Impact</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-mono text-[#E6EDF3]">{fmt(anomaly.amount)}</span>
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-end mb-1.5">
                    <span className="text-[9px] uppercase tracking-widest text-[#5A5B5F] font-mono">Confidence Score</span>
                    <span className="text-[10px] text-[#E6EDF3] font-mono">{(anomaly.confidence * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-[#0B0F14] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#FF7A00] h-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,122,0,0.5)]" 
                      style={{ width: `${anomaly.confidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => approveAnomaly(anomaly.id)}
                  className="flex-1 bg-[#FF7A00] hover:bg-[#E66D00] text-black text-[10px] font-bold uppercase tracking-widest py-3 rounded-lg transition-all hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Approve
                </button>
                <button 
                  onClick={() => rejectAnomaly(anomaly.id)}
                  className="px-4 border border-[#1C2632] hover:bg-red-500/10 hover:border-red-500/30 text-[#8B949E] hover:text-red-400 text-[10px] font-bold uppercase tracking-widest py-3 rounded-lg transition-all"
                >
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

