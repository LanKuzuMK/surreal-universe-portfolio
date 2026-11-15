import React from 'react';
import { MILESTONES } from '../constants/projects';
import { CheckCircle2, Milestone, Shield } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative min-h-screen w-full archipelago-section z-10">
      <div className="dream-container">
        
        {/* Destination Header */}
        <div className="mb-14 pb-6 border-b border-white/[0.12]">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#f472b6] mb-2.5 flex items-center gap-2.5 font-semibold">
            <Milestone className="w-3.5 h-3.5 text-[#f472b6]" />
            <span>DESTINATION 05 &bull; MILESTONES</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-white tracking-tight">
            The Experience Castle
          </h2>
        </div>

        {/* Milestone Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Chronological Journey */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {MILESTONES.map((item, idx) => (
              <div
                key={idx}
                className="liquid-glass-panel p-8 sm:p-12 relative overflow-hidden flex flex-col gap-6"
              >
                {/* Milestone Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.1]">
                  <div>
                    <span className="font-sans text-xs text-[#00f0ff] uppercase tracking-wider font-semibold">
                      {item.role}
                    </span>
                    <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                      {item.title}
                    </h3>
                  </div>
                  <div className="font-mono text-xs text-[#fcd34d] font-bold bg-white/[0.08] px-4 py-1.5 rounded-full border border-white/[0.15] backdrop-blur-sm self-start sm:self-auto whitespace-nowrap shrink-0">
                    {item.year}
                  </div>
                </div>

                {/* Subtitle / Domain */}
                <div className="font-sans text-xs text-[#cbd5e1] font-medium">
                  {item.domain}
                </div>

                {/* Narrative */}
                <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Proven Highlights */}
                <div className="pt-4 border-t border-white/[0.1] flex flex-col gap-2.5">
                  <div className="font-sans text-xs text-[#10b981] uppercase tracking-wider mb-1 flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>Conquered Milestones</span>
                  </div>
                  {item.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="font-sans text-sm text-white/90 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] mt-2 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Engineering Standards & Rigor */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="liquid-glass-panel p-8 sm:p-10 flex flex-col gap-6">
              
              <div className="flex items-center gap-2.5 pb-4 border-b border-white/[0.1] text-white">
                <Shield className="w-4 h-4 text-[#10b981]" />
                <h4 className="font-sans text-xs uppercase tracking-wider font-bold">
                  SOVEREIGN STANDARDS
                </h4>
              </div>

              <div className="flex flex-col gap-5 text-xs">
                <div>
                  <div className="font-sans text-[#cbd5e1] uppercase mb-1 font-semibold">01 / FRAME BUDGET</div>
                  <div className="font-mono text-white font-bold text-sm tracking-tight">Strict 16.6ms / 60-120 FPS</div>
                  <div className="font-sans text-white/70 text-[11px] mt-0.5">Zero unthrottled CPU loops; pure GPU matrix pipeline.</div>
                </div>

                <div className="pt-3 border-t border-white/[0.08]">
                  <div className="font-sans text-[#cbd5e1] uppercase mb-1 font-semibold">02 / TYPOGRAPHY DISCIPLINE</div>
                  <div className="font-sans text-white font-bold text-sm tracking-tight">Swiss Precision &amp; Hierarchy</div>
                  <div className="font-sans text-white/70 text-[11px] mt-0.5">High contrast, comfortable line heights, zero broken text.</div>
                </div>

                <div className="pt-3 border-t border-white/[0.08]">
                  <div className="font-sans text-[#cbd5e1] uppercase mb-1 font-semibold">03 / CODE SOVEREIGNTY</div>
                  <div className="font-sans text-white font-bold text-sm tracking-tight">Human Craft Over Slop</div>
                  <div className="font-sans text-white/70 text-[11px] mt-0.5">Bespoke mathematical shaders, custom physics, zero boilerplate.</div>
                </div>

                <div className="pt-3 border-t border-white/[0.08]">
                  <div className="font-sans text-[#cbd5e1] uppercase mb-1 font-semibold">04 / ARCHITECTURE INTEGRITY</div>
                  <div className="font-mono text-[#00f0ff] font-bold text-sm tracking-tight">Vite / React 19 / Three.js PBR</div>
                  <div className="font-sans text-white/70 text-[11px] mt-0.5">Modular component systems, strict TypeScript verification.</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
