import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Shield, Database, Settings, Bell, Search, LogOut, Menu, X, TrendingUp, ClipboardList } from 'lucide-react';
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
    { icon: Bell, label: 'Issues', path: '/alerts' },
    { icon: Database, label: 'Data Sources', path: '/data-sources' },
    { icon: TrendingUp, label: 'Simulation', path: '/simulation' },
    { icon: ClipboardList, label: 'Action Logs', path: '/action-logs' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#E4E3E0] font-sans flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-20 bg-[#151619] border-r border-[#2A2B2F] flex-col items-center py-8 gap-8 z-50">
        <div 
          onClick={() => navigate('/')}
          className="w-10 h-10 bg-[#F27D26] rounded flex items-center justify-center text-black font-bold text-xl cursor-pointer hover:scale-105 transition-transform"
        >
          A
        </div>
        <nav className="flex flex-col gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "p-3 rounded-xl transition-all group relative",
                isActive ? "text-[#F27D26] bg-[#F27D26]/10" : "text-[#8E9299] hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="absolute left-full ml-4 px-2 py-1 bg-[#1A1B1E] border border-[#2A2B2F] text-[10px] uppercase tracking-widest text-white rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-6">
          <button 
            onClick={handleLogout}
            className="p-3 text-[#8E9299] hover:text-red-400 transition-colors group relative"
          >
            <LogOut className="w-6 h-6" />
            <span className="absolute left-full ml-4 px-2 py-1 bg-[#1A1B1E] border border-[#2A2B2F] text-[10px] uppercase tracking-widest text-white rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Logout
            </span>
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F27D26] to-orange-300 border border-[#2A2B2F] flex items-center justify-center text-black text-[10px] font-bold">
            BP
          </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#151619] border-b border-[#2A2B2F] flex items-center justify-between px-6 z-[60]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#F27D26] rounded flex items-center justify-center text-black font-bold">A</div>
          <span className="text-sm font-semibold uppercase tracking-widest text-white font-mono">AetherCost</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#0A0B0D] z-[55] pt-20 px-6">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center gap-4 p-4 rounded-xl transition-all",
                  isActive ? "text-[#F27D26] bg-[#F27D26]/10" : "text-[#8E9299] hover:text-white"
                )}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
              </NavLink>
            ))}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-4 p-4 text-[#8E9299] hover:text-red-400"
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
        <header className="hidden lg:flex h-16 border-b border-[#2A2B2F] bg-[#0A0B0D]/80 backdrop-blur-md sticky top-0 z-40 px-8 items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-white font-mono">
              AetherCost <span className="text-[#5A5B5F] font-normal">· Autonomous Cost Intelligence</span>
            </h1>
            <div className="h-4 w-px bg-[#2A2B2F]" />
            <div className="flex items-center gap-2 text-[10px] text-[#8E9299] font-mono uppercase tracking-widest">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Autonomous Engine Active
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5A5B5F]" />
              <input 
                type="text" 
                placeholder="Search console..." 
                className="bg-[#151619] border border-[#2A2B2F] rounded-md pl-9 pr-4 py-1.5 text-xs w-64 focus:outline-none focus:border-[#F27D26] transition-colors"
              />
            </div>
            <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-[#8E9299]">
              <span className="flex items-center gap-1">
                <span className="text-white">Region:</span> us-east-1
              </span>
              <span className="flex items-center gap-1">
                <span className="text-white">Env:</span> Production
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
