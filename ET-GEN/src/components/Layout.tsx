import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Shield, Database, Settings, Bell, Search, LogOut, Menu, X, TrendingUp, ClipboardList, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/AuthContext';

export function Layout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Shield, label: 'Agents', path: '/agents' },
    { icon: Bell, label: 'Alerts', path: '/alerts' },
    { icon: Database, label: 'Data Sources', path: '/data-sources' },
    { icon: TrendingUp, label: 'Simulation', path: '/simulation' },
    { icon: ClipboardList, label: 'Action Logs', path: '/action-logs' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] font-sans flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-20 bg-[#11171D] border-r border-[#1C2632] flex-col items-center py-8 gap-8 z-50 shadow-2xl">
        <div 
          onClick={() => navigate('/')}
          className="w-10 h-10 bg-[#FF7A00] rounded flex items-center justify-center text-black font-bold text-xl cursor-pointer hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,122,0,0.4)]"
        >
          C
        </div>
        <nav className="flex flex-col gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "p-3 rounded-xl transition-all group relative",
                isActive ? "text-[#FF7A00] bg-[#FF7A00]/10 shadow-[inset_0_0_10px_rgba(255,122,0,0.1)]" : "text-[#5A5B5F] hover:text-[#E6EDF3] hover:bg-white/5"
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="absolute left-full ml-4 px-3 py-1.5 bg-[#0B0F14] border border-[#1C2632] text-[10px] uppercase tracking-widest text-[#E6EDF3] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap z-50 shadow-xl font-mono">
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-6">
          <button 
            onClick={handleLogout}
            className="p-3 text-[#5A5B5F] hover:text-red-400 transition-colors group relative"
          >
            <LogOut className="w-6 h-6" />
            <span className="absolute left-full ml-4 px-3 py-1.5 bg-[#0B0F14] border border-[#1C2632] text-[10px] uppercase tracking-widest text-[#E6EDF3] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap z-50 shadow-xl font-mono">
              Logout
            </span>
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF7A00] to-[#00E5FF] border border-[#1C2632] flex items-center justify-center text-black text-[10px] font-bold shadow-lg">
            BP
          </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#11171D] border-b border-[#1C2632] flex items-center justify-between px-6 z-[60]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FF7A00] rounded flex items-center justify-center text-black font-bold shadow-[0_0_10px_rgba(255,122,0,0.3)]">C</div>
          <span className="text-sm font-semibold uppercase tracking-widest text-[#E6EDF3] font-mono">CostPilot</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#E6EDF3]">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#0B0F14] z-[55] pt-20 px-6">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center gap-4 p-4 rounded-xl transition-all",
                  isActive ? "text-[#FF7A00] bg-[#FF7A00]/10" : "text-[#5A5B5F] hover:text-[#E6EDF3]"
                )}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
              </NavLink>
            ))}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-4 p-4 text-[#5A5B5F] hover:text-red-400"
            >
              <LogOut className="w-6 h-6" />
              <span className="text-sm font-bold uppercase tracking-widest">Logout</span>
            </button>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-20 pt-16 lg:pt-0">
        {/* Header */}
        <header className="hidden lg:flex h-16 border-b border-[#1C2632] bg-[#0B0F14]/80 backdrop-blur-md sticky top-0 z-40 px-8 items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E6EDF3] font-mono flex items-center gap-2">
              CostPilot <span className="text-[#5A5B5F] font-normal">· Autonomous Intelligence</span>
            </h1>
            <div className="h-4 w-px bg-[#1C2632]" />
            <div className="flex items-center gap-2 text-[10px] text-[#8B949E] font-mono uppercase tracking-widest">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
              Engine v4.2 Active
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5A5B5F]" />
              <input 
                type="text" 
                placeholder="Query telemetry..." 
                className="bg-[#11171D] border border-[#1C2632] rounded-lg pl-10 pr-4 py-2 text-[11px] w-72 font-mono text-[#E6EDF3] focus:outline-none focus:border-[#FF7A00]/50 focus:shadow-[0_0_15px_rgba(255,122,0,0.1)] transition-all"
              />
            </div>
            <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-[#5A5B5F]">
              <span className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-[#FF7A00]" />
                <span className="text-[#8B949E]">Latency:</span> 14ms
              </span>
              <span className="flex items-center gap-2">
                <Database className="w-3 h-3 text-[#00E5FF]" />
                <span className="text-[#8B949E]">Region:</span> prod-as-1
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 lg:p-10 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

