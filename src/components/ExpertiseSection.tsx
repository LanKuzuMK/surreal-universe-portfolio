import React, { useState } from 'react';
import { PILLARS } from '../constants/projects';
import { Terminal } from 'lucide-react';

export const ExpertiseSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const currentPillar = PILLARS[activeIdx];

  return (
    <section id="skills" className="relative min-h-screen w-full archipelago-section z-10">
      <div className="dream-container">
        
        {/* Destination Header */}
        <div className="mb-14 pb-6 border-b border-white/[0.12]">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#fcd34d] mb-2.5 flex items-center gap-2.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#fcd34d] shadow-[0_0_8px_#fcd34d] shrink-0" />
            <span>DESTINATION 03 &bull; SKILL MATRIX</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-white tracking-tight">
            The Five Realms
          </h2>
        </div>

        {/* Spacious Interactive Liquid Glass Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Realm Index Navigation */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {PILLARS.map((p, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-300 flex items-center justify-between border cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-white via-[#fef08a] to-white text-[#0c0e17] border-white font-bold shadow-xl translate-x-2'
                      : 'liquid-glass-subcard text-[#cbd5e1] hover:text-white border-white/[0.12] hover:bg-white/[0.12]'
                  }`}
                >
                  <div className="font-sans text-base sm:text-lg font-bold tracking-tight">
                    {p.title}
                  </div>
                  <span className="font-mono text-xs font-bold opacity-75">
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Expanded Mastery Codex */}
          <div className="lg:col-span-7 liquid-glass-panel p-8 sm:p-14 flex flex-col gap-8">
            <div>
              <div className="font-sans text-xs text-[#00f0ff] uppercase tracking-wider mb-2 flex items-center gap-2 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
                <span>REALM 0{activeIdx + 1} &bull; {currentPillar.subtitle}</span>
              </div>
              <h3 className="font-sans text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {currentPillar.title}
              </h3>
            </div>

            <p className="font-sans text-base sm:text-lg text-white/90 leading-relaxed font-normal">
              {currentPillar.philosophy}
            </p>

            {/* Core Technologies Badges */}
            <div className="pt-6 border-t border-white/[0.1]">
              <div className="font-sans text-xs uppercase tracking-wider text-[#cbd5e1] mb-4 flex items-center gap-2 font-semibold">
                <Terminal className="w-3.5 h-3.5 text-[#10b981]" />
                <span>Core Weapons &amp; Technologies</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {currentPillar.coreTech.map((tech) => (
                  <span key={tech} className="badge-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Production Standard Metric */}
            <div className="pt-2 flex items-center justify-between p-5 rounded-2xl liquid-glass-subcard">
              <span className="font-sans text-xs text-[#cbd5e1] uppercase tracking-wider font-semibold">
                Production Standard
              </span>
              <span className="font-mono text-xs sm:text-sm text-[#00f0ff] font-bold tracking-tight">
                {currentPillar.metrics}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
