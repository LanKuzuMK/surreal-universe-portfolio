import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  currentDestination: string;
  onSelectDestination: (destId: string) => void;
}

const NAV_ITEMS = [
  { id: 'origin', label: 'Origin', idx: '01' },
  { id: 'sanctuary', label: 'Sanctuary', idx: '02' },
  { id: 'skills', label: 'Skills', idx: '03' },
  { id: 'projects', label: 'Projects', idx: '04' },
  { id: 'experience', label: 'Experience', idx: '05' },
  { id: 'gate', label: 'Contact', idx: '06' },
];

export const Navigation: React.FC<NavigationProps> = ({
  currentDestination,
  onSelectDestination,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onSelectDestination(id);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0f1d]/35 backdrop-blur-xl border-b border-white/[0.12] transition-all">
      <div className="dream-container py-3.5 flex items-center justify-between">
        
        {/* Brand Mark */}
        <button
          onClick={() => handleNavClick('origin')}
          className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer bg-transparent border-0 shrink-0"
        >
          <span className="font-sans font-black text-base tracking-tight text-white group-hover:text-[#00f0ff] transition-colors flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
            MK
          </span>
          <span className="text-white/20 text-xs font-sans font-light">/</span>
          <span className="font-sans text-xs tracking-wider text-[#94a3b8] uppercase font-semibold hidden sm:inline">
            LAN KUZU STUDIO
          </span>
        </button>

        {/* Clean Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = currentDestination === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-sans text-xs tracking-wider transition-all duration-200 relative py-1 focus:outline-none cursor-pointer bg-transparent border-0 whitespace-nowrap ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-[#94a3b8] hover:text-white font-medium'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00f0ff] via-[#10b981] to-[#fcd34d] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Studio Telemetry Pill */}
        <div className="hidden xl:flex items-center gap-2.5 font-mono text-[11px] text-[#cbd5e1] bg-white/[0.04] px-4 py-1.5 rounded-full border border-white/[0.1] shrink-0 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
          <span>ELEVATION: 4,200M</span>
          <span className="text-white/20">|</span>
          <span className="text-[#10b981] font-semibold">REALM ACTIVE</span>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg bg-white/[0.04] text-white hover:text-[#00f0ff] transition-colors cursor-pointer border-0"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0e111a]/95 backdrop-blur-2xl border-b border-white/[0.08] px-6 py-6 flex flex-col gap-4 animate-in fade-in duration-200">
          {NAV_ITEMS.map((item) => {
            const isActive = currentDestination === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left font-sans text-sm tracking-wide py-2 flex items-center justify-between cursor-pointer bg-transparent border-0 ${
                  isActive ? 'text-[#00f0ff] font-bold' : 'text-[#cbd5e1] font-medium'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-[#64748b] font-mono">{item.idx}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
