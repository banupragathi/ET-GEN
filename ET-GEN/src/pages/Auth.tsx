import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Github, Chrome, AlertCircle, Loader2 } from 'lucide-react';

import { useAuth } from '../lib/AuthContext';

export function Auth() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const floatingCurrencies = [
    { symbol: '$', left: '15%', top: '20%', duration: 5, delay: 0 },
    { symbol: '₹', left: '80%', top: '25%', duration: 6, delay: 1 },
    { symbol: '€', left: '10%', top: '70%', duration: 5.5, delay: 0.5 },
    { symbol: '¥', left: '85%', top: '75%', duration: 6.5, delay: 1.5 },
    { symbol: '£', left: '45%', top: '15%', duration: 7, delay: 2 },
    { symbol: '$', left: '55%', top: '85%', duration: 5.2, delay: 0.8 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        login();
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#FF7A00]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#00E5FF]/5 blur-[120px] rounded-full" />

      {/* Floating Currencies */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {floatingCurrencies.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-[#00E5FF] font-mono text-5xl sm:text-7xl font-bold select-none"
            style={{
              left: item.left,
              top: item.top,
              textShadow: '0 0 30px rgba(0, 229, 255, 0.4), 0 0 60px rgba(0, 229, 255, 0.2)',
            }}
            initial={{ opacity: 0 }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.05, 1],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {item.symbol}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-[#151619] border border-[#2A2B2F] rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-[#FF7A00] rounded-lg flex items-center justify-center text-black font-bold text-2xl mx-auto mb-4">C</div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-sm text-[#8E9299]">
              {isLogin ? 'Access your cost intelligence dashboard' : 'Start your autonomous optimization journey'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#8E9299] font-mono">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A5B5F]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1A1B1E] border border-[#2A2B2F] rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#F27D26] transition-colors"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#8E9299] font-mono">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A5B5F]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1A1B1E] border border-[#2A2B2F] rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#F27D26] transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#F27D26] text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-[#D96C1E] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2A2B2F]" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
              <span className="bg-[#151619] px-4 text-[#5A5B5F] font-mono">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 border border-[#2A2B2F] rounded-lg py-3 text-xs font-bold text-white hover:bg-white/5 transition-all">
              <Chrome className="w-4 h-4" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-[#2A2B2F] rounded-lg py-3 text-xs font-bold text-white hover:bg-white/5 transition-all">
              <Github className="w-4 h-4" />
              GitHub
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-[#8E9299]">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#F27D26] hover:underline font-bold"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
