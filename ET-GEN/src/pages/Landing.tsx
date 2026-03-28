import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 0 }: { value: number, prefix?: string, suffix?: string, decimals?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setDisplayValue(start + (value - start) * easeOut);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}{displayValue.toFixed(decimals)}{suffix}
    </span>
  );
}

import { Shield, Activity, Search, ShieldAlert, ChevronRight, ArrowRight, Zap, Database, BarChart3, Globe, Layers, Cloud, Clock, FileCheck, Server, ShieldCheck, ClipboardCheck, Network } from 'lucide-react';

export function Landing() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };
  const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const navigate = useNavigate();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] overflow-x-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FF7A00]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00E5FF]/10 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 h-20 border-b border-[#1C2632]/50 bg-[#0B0F14]/80 backdrop-blur-md px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FF7A00] rounded flex items-center justify-center text-black font-bold">C</div>
          <span className="text-lg font-semibold uppercase tracking-[0.2em] text-[#E6EDF3] font-mono">CostPilot</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-mono uppercase tracking-widest text-[#8B949E]">
          <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-[#E6EDF3] transition-colors">Features</a>
          <a href="#solutions" onClick={(e) => scrollToSection(e, 'solutions')} className="hover:text-[#E6EDF3] transition-colors">Solutions</a>
          <a href="#enterprise" onClick={(e) => scrollToSection(e, 'enterprise')} className="hover:text-[#E6EDF3] transition-colors">Enterprise</a>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/auth')} className="text-sm font-mono uppercase tracking-widest text-[#8B949E] hover:text-[#E6EDF3] hover:scale-105 transition-all duration-300 inline-block">Login</button>
          <button onClick={() => navigate('/dashboard')} className="bg-[#E6EDF3] text-black px-6 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#FF7A00] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,122,0,0.3)] transition-all duration-300">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="relative pt-32 pb-20 px-8 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/20 text-[#FF7A00] text-[10px] font-mono uppercase tracking-[0.2em] mb-8">
            <Zap className="w-3 h-3" />
            Autonomous Intelligence Engine v4.2
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-[#E6EDF3] mb-8 tracking-tighter leading-[0.9]">
            Autonomous Enterprise <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#00E5FF]">Cost Intelligence</span>
          </h1>
          <p className="text-xl text-[#8B949E] max-w-2xl mx-auto mb-12 leading-relaxed">
            Transform passive analytics into an action-oriented optimization engine. 
            Real-time spend intelligence, resource optimization, and autonomous decision-making for the modern enterprise.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="w-full sm:w-auto bg-[#FF7A00] text-black px-10 py-4 rounded font-bold uppercase tracking-widest hover:bg-[#E66D00] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,122,0,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group">
              Start Optimization
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => navigate('/simulation')} className="w-full sm:w-auto border border-[#1C2632] text-[#E6EDF3] px-10 py-4 rounded font-bold uppercase tracking-widest hover:bg-[#E6EDF3]/10 hover:scale-105 transition-all duration-300">
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
          <div className="absolute inset-0 bg-[#FF7A00]/20 blur-[100px] rounded-full opacity-20" />
          <div className="relative bg-[#11171D] border border-[#1C2632] rounded-xl overflow-hidden shadow-2xl">
            <div className="h-8 bg-[#151D25] border-b border-[#1C2632] flex items-center px-4 gap-1.5">
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
              <div className="bg-[#0B0F14]/80 backdrop-blur-md border border-[#FF7A00]/30 p-8 rounded-lg text-center max-w-md">
                <BarChart3 className="w-12 h-12 text-[#FF7A00] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#E6EDF3] mb-2">Real-time Ingestion</h3>
                <p className="text-sm text-[#8B949E]">Processing 1.2M events/sec across AWS, Azure, and ERP platforms.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="py-24 px-8 border-t border-[#1C2632] bg-[#0B0F14]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#FF7A00] font-mono mb-4">Workflow</h2>
            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E6EDF3] to-[#8B949E] italic font-serif">How It Works</h3>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[3rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#FF7A00]/0 via-[#FF7A00]/20 to-[#FF7A00]/0 z-0" />
            
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
              {[
                { icon: Database, title: 'Data Ingestion', desc: 'Secure connection to ERP and Cloud endpoints' },
                { icon: Search, title: 'AI Detection', desc: 'Pattern recognition and anomaly flagging' },
                { icon: BarChart3, title: 'Financial Impact', desc: 'Quantifying exact losses and optimization ROI' },
                { icon: Zap, title: 'Autonomous Action', desc: 'Proactive execution and real-time alerts' }
              ].map((step, i) => (
                <motion.div key={i} variants={staggerItem} className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full bg-[#11171D] border border-[#1C2632] flex items-center justify-center mb-6 relative group-hover:scale-105 group-hover:border-[#FF7A00]/50 transition-all duration-300 shadow-xl bg-blend-overlay">
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#0B0F14] border border-[#FF7A00]/30 text-[#FF7A00] flex items-center justify-center text-xs font-mono font-bold">
                      0{i + 1}
                    </div>
                    <step.icon className="w-8 h-8 text-[#8B949E] group-hover:text-[#E6EDF3] transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold text-[#E6EDF3] mb-3 group-hover:text-[#FF7A00] transition-colors">{step.title}</h4>
                  <p className="text-[#8B949E] text-sm leading-relaxed max-w-[200px]">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        id="features" className="py-32 px-8 bg-[#0B0F14]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#FF7A00] font-mono mb-4">Core Intelligence</h2>
            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E6EDF3] to-[#8B949E] italic font-serif">Multi-Agent Autonomous Framework</h3>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Search, title: 'Spend Intelligence', desc: 'Detects procurement anomalies and vendor payment leaks using historical baselines.' },
              { icon: ShieldAlert, title: 'Financial Recon', desc: 'Cross-verifies invoices against contracts and POs with explainable AI.' },
              { icon: Activity, title: 'Resource Optimization', desc: 'Evaluates infrastructure and workforce utilization patterns for consolidation.' },
              { icon: Shield, title: 'SLA Prediction', desc: 'Proactively detects potential violations using time-series forecasting.' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-[#11171D] border border-[#1C2632] p-8 rounded-xl hover:border-[#FF7A00]/50 hover:shadow-[0_0_30px_rgba(242,125,38,0.2)] transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#151D25] border border-[#1C2632] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#FF7A00] group-hover:text-black transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-[#E6EDF3] mb-4">{feature.title}</h4>
                <p className="text-[#8B949E] leading-relaxed mb-6">{feature.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#FF7A00] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ChevronRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Solutions Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        id="solutions" className="py-32 px-8 bg-[#0B0F14]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#FF7A00] font-mono mb-4">Real-World Solutions</h2>
            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E6EDF3] to-[#8B949E] italic font-serif">Actionable Use Cases</h3>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Layers, title: 'Duplicate Payment Detection', desc: 'Automatically identifies and flags duplicate vendor payments to prevent financial loss.' },
              { icon: Cloud, title: 'Cloud Cost Optimization', desc: 'Analyzes cloud usage patterns to detect idle resources and recommend cost-saving actions.' },
              { icon: Clock, title: 'SLA Breach Prevention', desc: 'Predicts potential SLA violations and enables proactive action to avoid penalties.' },
              { icon: FileCheck, title: 'Financial Reconciliation', desc: 'Cross-verifies invoices, contracts, and transactions to detect discrepancies and ensure accuracy.' }
            ].map((solution, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ scale: 1.02 }}
                className="bg-[#11171D] border border-[#1C2632] p-8 rounded-xl hover:border-[#FF7A00]/50 hover:shadow-[0_0_30px_rgba(242,125,38,0.15)] transition-all duration-300 group flex flex-col sm:flex-row gap-6 items-start"
              >
                <div className="w-16 h-16 shrink-0 bg-[#0B0F14] border border-[#1C2632] rounded-2xl flex items-center justify-center group-hover:bg-[#FF7A00]/10 group-hover:border-[#FF7A00]/30 text-[#8B949E] group-hover:text-[#FF7A00] transition-all">
                  <solution.icon className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#E6EDF3] mb-3 group-hover:text-[#E6EDF3] transition-colors">{solution.title}</h4>
                  <p className="text-[#8B949E] leading-relaxed text-sm">{solution.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Real Impact Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="py-32 px-8 border-y border-[#1C2632] bg-[#0B0F14] relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-[#FF7A00]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#FF7A00] font-mono mb-4">Measured Results</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E6EDF3] to-[#8B949E] italic font-serif mb-6">Real Impact</h3>
            <p className="text-xl text-[#8B949E] max-w-2xl mx-auto leading-relaxed">
              Our autonomous engine doesn't just provide analytics—it delivers measurable financial returns from day one by eliminating waste and preventing breaches.
            </p>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div variants={staggerItem} className="p-8 rounded-2xl bg-[#11171D]/50 border border-[#1C2632] hover:border-[#FF7A00]/30 transition-colors group shadow-lg">
              <div className="text-5xl md:text-6xl font-mono text-[#E6EDF3] mb-4 group-hover:text-[#FF7A00] transition-colors drop-shadow-md">
                <AnimatedCounter value={1.2} prefix="$" suffix="B+" decimals={1} />
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#8B949E] font-mono group-hover:text-[#E6EDF3] transition-colors">Cost Optimized</div>
            </motion.div>
            <motion.div variants={staggerItem} className="p-8 rounded-2xl bg-[#11171D]/50 border border-[#1C2632] hover:border-[#FF7A00]/30 transition-colors group shadow-lg">
              <div className="text-5xl md:text-6xl font-mono text-[#E6EDF3] mb-4 group-hover:text-[#FF7A00] transition-colors drop-shadow-md">
                <AnimatedCounter value={99.9} suffix="%" decimals={1} />
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#8B949E] font-mono group-hover:text-[#E6EDF3] transition-colors">Detection Accuracy</div>
            </motion.div>
            <motion.div variants={staggerItem} className="p-8 rounded-2xl bg-[#11171D]/50 border border-[#1C2632] hover:border-[#FF7A00]/30 transition-colors group shadow-lg">
              <div className="text-5xl md:text-6xl font-mono text-[#E6EDF3] mb-4 group-hover:text-[#FF7A00] transition-colors drop-shadow-md">
                <AnimatedCounter value={150} suffix="ms" />
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#8B949E] font-mono group-hover:text-[#E6EDF3] transition-colors">Decision Latency</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Enterprise Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        id="enterprise" className="py-32 px-8 bg-[#0B0F14] border-y border-[#1C2632]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#FF7A00] font-mono mb-4">Enterprise Capable</h2>
            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E6EDF3] to-[#8B949E] italic font-serif">Robust, Secure, Compliant</h3>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Server, title: 'Scalable Infrastructure', desc: 'Designed to handle large-scale enterprise data with real-time processing and high availability.' },
              { icon: ShieldCheck, title: 'Enterprise-Grade Security', desc: 'Implements secure data handling, access controls, and encryption to protect sensitive financial information.' },
              { icon: ClipboardCheck, title: 'Compliance & Governance', desc: 'Ensures adherence to industry standards and audit requirements with full traceability and logs.' },
              { icon: Network, title: 'Seamless Integrations', desc: 'Connects easily with ERP systems, cloud platforms, and financial tools for unified data flow.' }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={staggerItem} 
                className="p-8 border border-[#1C2632] bg-[#11171D]/40 rounded-2xl hover:bg-[#11171D] hover:border-[#FF7A00]/50 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(242,125,38,0.1)] transition-all duration-300 group flex flex-col"
              >
                <div className="w-14 h-14 bg-[#0B0F14] border border-[#1C2632] rounded-xl flex items-center justify-center mb-6 group-hover:text-[#FF7A00] group-hover:border-[#FF7A00]/30 group-hover:bg-[#FF7A00]/10 transition-all text-[#E6EDF3]">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-[#E6EDF3] mb-3 group-hover:text-[#FF7A00] transition-colors">{item.title}</h4>
                <p className="text-[#8B949E] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-20 px-8 bg-[#0B0F14]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF7A00] rounded flex items-center justify-center text-black font-bold">C</div>
            <span className="text-lg font-semibold uppercase tracking-[0.2em] text-[#E6EDF3] font-mono">CostPilot</span>
          </div>
          <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest text-[#5A5B5F]">
            <a href="#" className="hover:text-[#E6EDF3] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#E6EDF3] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#E6EDF3] transition-colors">Security</a>
            <a href="#" className="hover:text-[#E6EDF3] transition-colors">Status</a>
          </div>
          <div className="text-[10px] font-mono text-[#5A5B5F]">
            © 2026 CostPilot Intelligence. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
