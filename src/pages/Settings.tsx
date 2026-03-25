import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Globe, Zap, Save, Trash2, Key } from 'lucide-react';
import { cn } from '../lib/utils';

export function Settings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-white mb-2 italic font-serif">System Settings</h2>
        <p className="text-sm text-[#8E9299]">Configure your autonomous engine and enterprise governance policies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="space-y-1">
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
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all",
                i === 0 ? "bg-[#F27D26] text-black" : "text-[#8E9299] hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </aside>

        <div className="lg:col-span-3 space-y-8">
          <div className="bg-[#151619] border border-[#2A2B2F] rounded-xl p-8">
            <h3 className="text-lg font-bold text-white mb-8">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Banu Pragathi"
                  className="w-full bg-[#1A1B1E] border border-[#2A2B2F] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F27D26] transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="banupragathi@gmail.com"
                  className="w-full bg-[#1A1B1E] border border-[#2A2B2F] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F27D26] transition-colors"
                />
              </div>
            </div>
            
            <div className="space-y-2 mb-8">
              <label className="text-[10px] uppercase tracking-widest text-[#5A5B5F] font-mono">Organization</label>
              <input 
                type="text" 
                defaultValue="Aether Intelligence Corp"
                className="w-full bg-[#1A1B1E] border border-[#2A2B2F] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F27D26] transition-colors"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button className="px-6 py-3 border border-[#2A2B2F] text-[#8E9299] text-xs font-bold uppercase tracking-widest rounded-lg hover:text-white hover:border-white transition-all">
                Cancel
              </button>
              <button className="px-6 py-3 bg-[#F27D26] text-black text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#D96C1E] transition-all flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>

          <div className="bg-[#151619] border border-[#2A2B2F] rounded-xl p-8 border-red-900/30">
            <h3 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h3>
            <p className="text-sm text-[#8E9299] mb-8">Permanently delete your account and all associated cost intelligence data. This action cannot be undone.</p>
            <button className="px-6 py-3 border border-red-900/50 text-red-400 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-red-900/20 transition-all flex items-center gap-2">
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
