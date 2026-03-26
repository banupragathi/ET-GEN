import React, { useState } from 'react';
import { useCostIntelligence, Anomaly } from '../lib/CostIntelligenceContext';
import { AlertCircle, TrendingDown, Clock, ShieldCheck, XCircle, Brain, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { GoogleGenAI } from "@google/genai";

export function AnomalyList() {
  const { anomalies, approveAnomaly, rejectAnomaly } = useCostIntelligence();
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, string>>({});

  const pendingAnomalies = anomalies.filter(a => a.status === 'pending');

  const handleAiAnalyze = async (anomaly: Anomaly) => {
    setAnalyzingId(anomaly.id);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Analyze this cost anomaly for an enterprise cost intelligence system:
      Type: ${anomaly.type}
      Description: ${anomaly.description}
      Amount: $${anomaly.amount}
      Confidence: ${anomaly.confidence}
      Root Cause: ${anomaly.rootCause}
      Vendor: ${anomaly.vendor || 'N/A'}
      
      Provide a concise 2-sentence autonomous recommendation on whether to approve or reject this action, and why.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setAiAnalysis(prev => ({ ...prev, [anomaly.id]: response.text || "Analysis failed." }));
    } catch (error) {
      console.error("AI Analysis failed:", error);
      setAiAnalysis(prev => ({ ...prev, [anomaly.id]: "AI Engine currently offline. Recommended action: Manual Review." }));
    } finally {
      setAnalyzingId(null);
    }
  };

  if (pendingAnomalies.length === 0) {
    return (
      <div className="bg-[#151619] border border-[#2A2B2F] rounded-lg p-12 text-center">
        <div className="w-16 h-16 bg-[#F27D26]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-8 h-8 text-[#F27D26]" />
        </div>
        <h3 className="text-white font-bold mb-2">System Clear</h3>
        <p className="text-[#8E9299] text-sm">No pending anomalies detected. Autonomous engine is monitoring all data streams.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 italic font-serif">
          <AlertCircle className="w-5 h-5 text-[#F27D26]" />
          Prioritized Intelligence Alerts
        </h2>
        <span className="text-[10px] uppercase tracking-widest text-[#8E9299] font-mono">
          Sorted by Financial Impact
        </span>
      </div>
      
      {pendingAnomalies.map((anomaly) => (
        <div 
          key={anomaly.id}
          className="bg-[#151619] border border-[#2A2B2F] rounded-lg overflow-hidden hover:border-[#F27D26] transition-all group"
        >
          <div className="p-4 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded font-mono uppercase tracking-widest",
                  anomaly.confidence > 0.9 ? "bg-red-900/30 text-red-400 border border-red-900/50" :
                  anomaly.confidence > 0.8 ? "bg-orange-900/30 text-orange-400 border border-orange-900/50" :
                  "bg-blue-900/30 text-blue-400 border border-blue-900/50"
                )}>
                  {anomaly.confidence > 0.9 ? 'CRITICAL' : anomaly.confidence > 0.8 ? 'HIGH' : 'MEDIUM'}
                </span>
                <span className="text-[10px] text-[#5A5B5F] font-mono uppercase">
                  {anomaly.id}
                </span>
                <span className="text-[10px] text-[#5A5B5F] font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(new Date(anomaly.timestamp))} ago
                </span>
              </div>
              
              <h3 className="text-md font-semibold text-white mb-2">{anomaly.description}</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#1A1B1E] p-3 rounded border border-[#2A2B2F] mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono block mb-1">Root Cause Analysis</span>
                  <p className="text-xs text-[#8E9299] italic">{anomaly.rootCause}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono block mb-1">Vendor Context</span>
                  <p className="text-xs text-[#8E9299]">{anomaly.vendor || 'N/A'} {anomaly.poNumber ? `(PO: ${anomaly.poNumber})` : ''}</p>
                </div>
              </div>

              {aiAnalysis[anomaly.id] && (
                <div className="p-3 bg-[#F27D26]/5 border border-[#F27D26]/20 rounded-lg flex gap-3 mb-4">
                  <Brain className="w-4 h-4 text-[#F27D26] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-[#F27D26] font-mono block mb-1">AI Autonomous Recommendation</span>
                    <p className="text-xs text-[#8E9299] italic leading-relaxed">{aiAnalysis[anomaly.id]}</p>
                  </div>
                </div>
              )}

              <button 
                onClick={() => handleAiAnalyze(anomaly)}
                disabled={analyzingId === anomaly.id}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#F27D26] font-bold hover:text-[#D96C1E] transition-colors disabled:opacity-50"
              >
                {analyzingId === anomaly.id ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Brain className="w-3 h-3" />
                )}
                {aiAnalysis[anomaly.id] ? "Re-Analyze" : "AI Deep Analysis"}
              </button>
            </div>
            
            <div className="md:w-64 flex flex-col justify-between border-l border-[#2A2B2F] pl-6">
              <div>
                <div className="mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#8E9299] font-mono block mb-1">Financial Impact</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-mono text-white">${anomaly.amount.toLocaleString()}</span>
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#8E9299] font-mono block mb-1">Confidence Score</span>
                  <div className="w-full bg-[#1A1B1E] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#F27D26] h-full transition-all duration-1000" 
                      style={{ width: `${anomaly.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-white font-mono mt-1 block">{(anomaly.confidence * 100).toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => approveAnomaly(anomaly.id)}
                  className="flex-1 bg-[#F27D26] hover:bg-[#D96C1E] text-black text-[10px] font-bold uppercase tracking-widest py-2 rounded transition-colors flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-3 h-3" />
                  Approve
                </button>
                <button 
                  onClick={() => rejectAnomaly(anomaly.id)}
                  className="px-3 border border-[#2A2B2F] hover:bg-red-900/20 hover:border-red-900 text-[#8E9299] hover:text-red-400 text-[10px] font-bold uppercase tracking-widest py-2 rounded transition-colors"
                >
                  <XCircle className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
