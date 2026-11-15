import React from 'react';
import { Cpu } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="sanctuary" className="relative min-h-screen w-full archipelago-section z-10">
      <div className="dream-container">
        
        {/* Main Section Enclosure with Liquid Glass */}
        <div className="liquid-glass-panel p-8 sm:p-14 lg:p-16">
          
          {/* Destination Header */}
          <div className="mb-14 pb-6 border-b border-white/[0.1]">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#00f0ff] mb-2.5 flex items-center gap-2.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
              <span>DESTINATION 02 &bull; SANCTUARY</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-white tracking-tight">
              The Creator's Sanctuary
            </h2>
          </div>

          {/* Spacious 2-Column Editorial Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Narrative & Axiom */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <p className="font-sans text-xl sm:text-2xl text-white font-medium leading-relaxed">
                I am <strong className="text-[#00f0ff] font-bold">MK (Jack)</strong> — an independent creative technologist, spatial system architect, and graphic designer operating at the bleeding edge of real-time 3D web environments, Swiss typography, and high-performance engineering.
              </p>

              <p className="font-sans text-base sm:text-lg text-white/90 font-normal leading-relaxed">
                The modern web has become sterile, paved over by cookie-cutter design templates and hollow automated boilerplate. My work exists to restore tangible majesty, physical tension, and human wonder to the browser — building digital worlds where floating islands carry volumetric weight, where light refracts through living crystal, and where code burns with sovereign craft.
              </p>

              {/* The Famous Axiom Callout */}
              <div className="liquid-glass-subcard p-6 sm:p-8 border-l-4 border-l-[#10b981] relative">
                <blockquote className="font-sans text-2xl sm:text-3xl text-white font-bold italic tracking-tight mb-3">
                  &ldquo;I hate AI, but not too much.&rdquo;
                </blockquote>
                <div className="font-sans text-xs text-[#cbd5e1] font-semibold uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  <span>The Creator's Sovereign Axiom &bull; Tactile Authenticity Over Synthetic Slop</span>
                </div>
              </div>

              {/* Creative Disciplines Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="liquid-glass-subcard p-4 flex flex-col gap-1.5">
                  <div className="font-mono text-xs text-[#00f0ff] uppercase tracking-wider font-bold">
                    01 / 3D &amp; Shaders
                  </div>
                  <div className="font-sans text-xs text-white/90 leading-relaxed font-normal">
                    Three.js, WebGL 2.0, procedural GLSL materials, physical light scattering.
                  </div>
                </div>

                <div className="liquid-glass-subcard p-4 flex flex-col gap-1.5">
                  <div className="font-mono text-xs text-[#fcd34d] uppercase tracking-wider font-bold">
                    02 / Spatial Systems
                  </div>
                  <div className="font-sans text-xs text-white/90 leading-relaxed font-normal">
                    MediaPipe computer vision, touchless hand tracking, gesture kinematics.
                  </div>
                </div>

                <div className="liquid-glass-subcard p-4 flex flex-col gap-1.5">
                  <div className="font-mono text-xs text-[#f472b6] uppercase tracking-wider font-bold">
                    03 / Editorial Identity
                  </div>
                  <div className="font-sans text-xs text-white/90 leading-relaxed font-normal">
                    Swiss typography, high-octane HUD design, luxury digital flagships.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: High-Density Studio Codex */}
            <div className="lg:col-span-5">
              <div className="liquid-glass-subcard p-8 flex flex-col gap-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.1]">
                  <div className="flex items-center gap-2 font-sans text-xs text-[#00f0ff] uppercase tracking-wider font-bold">
                    <Cpu className="w-4 h-4" />
                    <span>SANCTUARY TELEMETRY</span>
                  </div>
                  <span className="flex items-center gap-2 font-mono text-[11px] text-[#10b981] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                    SOVEREIGN
                  </span>
                </div>

                {/* Verified Data Rows */}
                <div className="flex flex-col gap-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-white/[0.06]">
                    <span className="font-sans text-[#cbd5e1] font-medium">CREATIVE ALIAS</span>
                    <span className="font-mono text-white font-bold">MK / Jack / LanKuzuMK</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/[0.06]">
                    <span className="font-sans text-[#cbd5e1] font-medium">SPECIALIZATION</span>
                    <span className="font-sans text-[#00f0ff] font-semibold">Spatial 3D &amp; Creative Tech</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/[0.06]">
                    <span className="font-sans text-[#cbd5e1] font-medium">RENDERING PIPELINE</span>
                    <span className="font-mono text-white font-bold">WebGL 2.0 / PBR Shaders</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/[0.06]">
                    <span className="font-sans text-[#cbd5e1] font-medium">PRODUCTION STANDARD</span>
                    <span className="font-mono text-[#fcd34d] font-bold">60-120 FPS / Fluid Lenis</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-sans text-[#cbd5e1] font-medium">STUDIO REALM</span>
                    <span className="font-sans text-[#10b981] font-bold">Sovereign Cloud Archipelago</span>
                  </div>
                </div>

                {/* Direct Verification Links */}
                <div className="pt-4 border-t border-white/[0.1] flex flex-col gap-2.5">
                  <div className="font-sans text-xs uppercase tracking-wider text-[#cbd5e1] mb-1 font-semibold">
                    Official Verification Outposts
                  </div>
                  <a
                    href="https://t.me/TianyiXiong"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/[0.12] transition-all group text-xs font-sans text-white font-semibold"
                  >
                    <span>Direct Telegram &bull; @TianyiXiong</span>
                    <span className="text-[#00f0ff] font-mono text-[11px]">&rarr;</span>
                  </a>
                  <a
                    href="https://github.com/LanKuzuMK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/[0.12] transition-all group text-xs font-sans text-white font-semibold"
                  >
                    <span>GitHub Archive &bull; LanKuzuMK</span>
                    <span className="text-[#00f0ff] font-mono text-[11px]">&rarr;</span>
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
