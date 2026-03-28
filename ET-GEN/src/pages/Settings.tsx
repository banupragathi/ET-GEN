import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Globe, Zap, Save, Trash2, Key, Settings as SettingsIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export function Settings() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#E6EDF3] flex items-center gap-2 italic font-serif">
            <SettingsIcon className="w-6 h-6 text-[#FF7A00]" /> Intelligence Governance
          </h1>
          <p className="text-xs text-[#5A5B5F] font-mono mt-1 uppercase tracking-widest">System Configuration & Security v4.2</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <aside className="space-y-2">
          {[
            { icon: User, label: 'Profile' },
            { icon: Shield, label: 'Security' },
            { icon: Bell, label: 'Notifications' },
            { icon: Globe, label: 'Governance' },
            { icon: Zap, label: 'Automation' },
            { icon: Key, label: 'API Keys' },
          ].map((item, i) => (
            <button 
              key={item.label}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border",
                i === 0 
                  ? "bg-[#FF7A00] text-black border-[#FF7A00] shadow-[0_0_15px_rgba(255,122,0,0.3)]" 
                  : "text-[#5A5B5F] border-transparent hover:text-[#E6EDF3] hover:bg-white/5 hover:border-[#1C2632]"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </aside>

        <div className="lg:col-span-3 space-y-8">
          <div className="bg-[#11171D] border border-[#1C2632] rounded-2xl p-10 shadow-xl">
            <h3 className="text-lg font-bold text-[#E6EDF3] mb-10 flex items-center gap-2">
              <User className="w-5 h-5 text-[#FF7A00]" /> Profile Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono font-bold">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Banu Pragathi"
                  className="w-full bg-[#0B0F14] border border-[#1C2632] rounded-xl px-5 py-4 text-sm text-[#E6EDF3] focus:outline-none focus:border-[#FF7A00]/50 transition-all focus:shadow-[0_0_15px_rgba(255,122,0,0.05)] font-mono"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono font-bold">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="banupragathi@gmail.com"
                  className="w-full bg-[#0B0F14] border border-[#1C2632] rounded-xl px-5 py-4 text-sm text-[#E6EDF3] focus:outline-none focus:border-[#FF7A00]/50 transition-all focus:shadow-[0_0_15px_rgba(255,122,0,0.05)] font-mono"
                />
              </div>
            </div>
            
            <div className="space-y-3 mb-10">
              <label className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono font-bold">Organization</label>
              <input 
                type="text" 
                defaultValue="Aether Intelligence Corp"
                className="w-full bg-[#0B0F14] border border-[#1C2632] rounded-xl px-5 py-4 text-sm text-[#E6EDF3] focus:outline-none focus:border-[#FF7A00]/50 transition-all focus:shadow-[0_0_15px_rgba(255,122,0,0.05)] font-mono"
              />
            </div>

            <div className="flex justify-end gap-4 pt-8 border-t border-[#1C2632]">
              <button className="px-8 py-4 border border-[#1C2632] text-[#5A5B5F] text-[10px] font-bold uppercase tracking-widest rounded-xl hover:text-[#E6EDF3] hover:border-[#8B949E] transition-all font-mono">
                Discard
              </button>
              <button className="px-8 py-4 bg-[#FF7A00] text-black text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-[#E66D00] transition-all flex items-center gap-2 shadow-lg hover:scale-[1.02]">
                <Save className="w-4 h-4" /> Commit Changes
              </button>
            </div>
          </div>

          <div className="bg-[#11171D] border border-red-500/20 rounded-2xl p-10 shadow-xl group">
            <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
              <Trash2 className="w-5 h-5" /> Danger Zone
            </h3>
            <p className="text-sm text-[#8B949E] mb-10 leading-relaxed italic">Permanently delete your account and all associated cost intelligence data. This action cannot be undone.</p>
            <button className="px-8 py-4 border border-red-500/20 text-red-500/50 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 transition-all flex items-center gap-2 shadow-inner">
              <Trash2 className="w-4 h-4" /> Purge Account Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

