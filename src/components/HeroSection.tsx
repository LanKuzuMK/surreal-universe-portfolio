import React from 'react';
import { ArrowDown, Compass } from 'lucide-react';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onExploreSanctuary: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onExploreSanctuary,
}) => {
  return (
    <section id="origin" className="relative min-h-screen w-full flex flex-col justify-between items-center px-6 pt-32 pb-12 z-10 pointer-events-none">
      <div />

      <div className="dream-container flex flex-col items-center text-center my-auto relative">
        
        {/* Sovereign Telemetry Pill (Clean Minimal Marker - No Sparkle Emoji) */}
        <div className="font-mono text-xs tracking-wider text-[#cbd5e1] uppercase mb-6 pointer-events-auto inline-flex items-center gap-2.5 bg-white/[0.08] px-6 py-2 rounded-full border border-white/[0.18] backdrop-blur-md shadow-xl whitespace-nowrap font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] shrink-0" />
          <span>DESTINATION 01 &bull; THE DREAM ARCHIPELAGO</span>
          <span className="text-white/30">&bull;</span>
          <span className="text-[#fcd34d] font-bold">ALT 4,200M</span>
        </div>

        {/* Grand Cinematic Typography (Drop Shadow Filter - Radiant Gradient Never Blackened) */}
        <h1 className="font-sans text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.08] mb-6 pointer-events-auto filter drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)]">
          THE FLOATING REALM <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#38bdf8] to-[#fef08a]">
            OF MK STUDIO
          </span>
        </h1>

        {/* Expansive Narrative Subtitle */}
        <p className="max-w-2xl font-sans text-sm sm:text-lg text-[#f1f5f9] font-normal leading-relaxed mb-10 pointer-events-auto filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          An immersive 3D dream universe where physical graphic design, real-time spatial computing, and living fantasy architecture float peacefully above an endless ocean of clouds.
        </p>

        {/* Kinetic Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto mb-10">
          <button
            onClick={onExploreProjects}
            className="btn-floating-primary"
          >
            <span>Explore Project Islands</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onExploreSanctuary}
            className="btn-floating-secondary"
          >
            <Compass className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>The Creator's Sanctuary</span>
          </button>
        </div>

        {/* Coordinates Telemetry Bar (Responsive & Whitespace-Protected) */}
        <div className="flex lg:hidden items-center justify-center gap-3 font-mono text-[10px] text-[#e2e8f0] bg-black/40 backdrop-blur-md px-5 py-2 rounded-full border border-white/[0.18] pointer-events-auto shadow-xl whitespace-nowrap font-medium">
          <span>22&deg;14&prime;N // 104&deg;52&prime;E</span>
          <span className="text-white/30">&bull;</span>
          <span className="text-[#00f0ff] font-bold">4,200M ALTITUDE</span>
        </div>

        <div className="hidden lg:flex items-center justify-center gap-6 font-mono text-[11px] text-[#e2e8f0] bg-black/40 backdrop-blur-md px-7 py-2.5 rounded-full border border-white/[0.18] pointer-events-auto shadow-xl whitespace-nowrap font-medium">
          <span>COORDINATES: 22&deg;14&prime;N // 104&deg;52&prime;E</span>
          <span className="text-white/30">&bull;</span>
          <span>ATMOSPHERE: VOLUMETRIC GOLDEN HOUR</span>
          <span className="text-white/30">&bull;</span>
          <span>GRAVITY: EQUILIBRIUM FLOAT</span>
        </div>

      </div>

      {/* Understated Scroll Hint */}
      <button
        onClick={onExploreProjects}
        aria-label="Scroll to descend through archipelago"
        className="pointer-events-auto flex flex-col items-center gap-1.5 text-[#cbd5e1] hover:text-[#00f0ff] transition-colors focus:outline-none cursor-pointer bg-transparent border-0"
      >
        <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#cbd5e1] font-semibold">
          Explore Destinations
        </span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#00f0ff]" />
      </button>
    </section>
  );
};
