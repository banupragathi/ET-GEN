import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Activity, Search, ShieldAlert, ChevronRight, ArrowRight, Zap, Database, BarChart3, Globe } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#E4E3E0] overflow-x-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F27D26]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 h-20 border-b border-[#2A2B2F]/50 bg-[#0A0B0D]/80 backdrop-blur-md px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#F27D26] rounded flex items-center justify-center text-black font-bold">A</div>
          <span className="text-lg font-semibold uppercase tracking-[0.2em] text-white font-mono">AetherCost</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-mono uppercase tracking-widest text-[#8E9299]">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
          <a href="#enterprise" className="hover:text-white transition-colors">Enterprise</a>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/auth')} className="text-sm font-mono uppercase tracking-widest text-[#8E9299] hover:text-white transition-colors">Login</button>
          <button onClick={() => navigate('/auth')} className="bg-white text-black px-6 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#F27D26] transition-colors">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F27D26]/10 border border-[#F27D26]/20 text-[#F27D26] text-[10px] font-mono uppercase tracking-[0.2em] mb-8">
            <Zap className="w-3 h-3" />
            Autonomous Intelligence Engine v4.2
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-[0.9]">
            Autonomous Enterprise <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F27D26] to-orange-300">Cost Intelligence</span>
          </h1>
          <p className="text-xl text-[#8E9299] max-w-2xl mx-auto mb-12 leading-relaxed">
            Transform passive analytics into an action-oriented optimization engine. 
            Real-time spend intelligence, resource optimization, and autonomous decision-making for the modern enterprise.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/auth')} className="w-full sm:w-auto bg-[#F27D26] text-black px-10 py-4 rounded font-bold uppercase tracking-widest hover:bg-[#D96C1E] transition-all flex items-center justify-center gap-2 group">
              Start Optimization
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto border border-[#2A2B2F] text-white px-10 py-4 rounded font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
              View Demo
            </button>
          </div>
        </motion.div>

        {/* Hero Image / Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-24 w-full max-w-6xl relative"
        >
          <div className="absolute inset-0 bg-[#F27D26]/20 blur-[100px] rounded-full opacity-20" />
          <div className="relative bg-[#151619] border border-[#2A2B2F] rounded-xl overflow-hidden shadow-2xl">
            <div className="h-8 bg-[#1A1B1E] border-b border-[#2A2B2F] flex items-center px-4 gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <img 
              src="https://picsum.photos/seed/dashboard/1600/900?blur=2" 
              alt="Dashboard Preview" 
              className="w-full opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#0A0B0D]/80 backdrop-blur-md border border-[#F27D26]/30 p-8 rounded-lg text-center max-w-md">
                <BarChart3 className="w-12 h-12 text-[#F27D26] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Real-time Ingestion</h3>
                <p className="text-sm text-[#8E9299]">Processing 1.2M events/sec across AWS, Azure, and ERP platforms.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-8 bg-[#0D0E11]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#F27D26] font-mono mb-4">Core Intelligence</h2>
            <h3 className="text-4xl font-bold text-white italic font-serif">Multi-Agent Autonomous Framework</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Search, title: 'Spend Intelligence', desc: 'Detects procurement anomalies and vendor payment leaks using historical baselines.' },
              { icon: ShieldAlert, title: 'Financial Recon', desc: 'Cross-verifies invoices against contracts and POs with explainable AI.' },
              { icon: Activity, title: 'Resource Optimization', desc: 'Evaluates infrastructure and workforce utilization patterns for consolidation.' },
              { icon: Shield, title: 'SLA Prediction', desc: 'Proactively detects potential violations using time-series forecasting.' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-[#151619] border border-[#2A2B2F] p-8 rounded-xl hover:border-[#F27D26] transition-all group"
              >
                <div className="w-12 h-12 bg-[#1A1B1E] border border-[#2A2B2F] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#F27D26] group-hover:text-black transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{feature.title}</h4>
                <p className="text-[#8E9299] leading-relaxed mb-6">{feature.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#F27D26] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ChevronRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-8 border-y border-[#2A2B2F]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-5xl font-mono text-white mb-2">$1.2B+</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#8E9299] font-mono">Cost Optimized</div>
          </div>
          <div>
            <div className="text-5xl font-mono text-white mb-2">99.9%</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#8E9299] font-mono">Detection Accuracy</div>
          </div>
          <div>
            <div className="text-5xl font-mono text-white mb-2">150ms</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#8E9299] font-mono">Decision Latency</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 bg-[#0A0B0D]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#F27D26] rounded flex items-center justify-center text-black font-bold">A</div>
            <span className="text-lg font-semibold uppercase tracking-[0.2em] text-white font-mono">AetherCost</span>
          </div>
          <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest text-[#5A5B5F]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Status</a>
          </div>
          <div className="text-[10px] font-mono text-[#5A5B5F]">
            © 2026 AetherCost Intelligence. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
