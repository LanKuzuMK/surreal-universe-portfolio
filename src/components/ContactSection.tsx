import React, { useState } from 'react';
import { Send, Check, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  onBackToTop?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onBackToTop }) => {
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);

    const text = encodeURIComponent(
      `Hello MK! I'm ${senderName || 'Anonymous'}. Project Vision: ${message}`
    );
    setTimeout(() => {
      window.open(`https://t.me/TianyiXiong?text=${text}`, '_blank');
      setSent(false);
      setSenderName('');
      setMessage('');
    }, 800);
  };

  return (
    <footer id="gate" className="relative min-h-[125vh] w-full archipelago-section z-10 flex flex-col justify-between pb-40">
      <div className="dream-container w-full">
        
        {/* Destination Header */}
        <div className="mb-14 pb-6 border-b border-white/[0.12]">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#00f0ff] mb-2.5 flex items-center gap-2.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] shrink-0" />
            <span>DESTINATION 06 &bull; DREAM GATE</span>
          </div>
          <div className="filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
            <h2 className="font-sans text-3xl sm:text-5xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[1.05]">
              Ready to Manifest <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f0ff] to-[#fcd34d]">
                A New Dimension?
              </span>
            </h2>
          </div>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-24">
          
          {/* Left Column: Direct Transmission Form */}
          <div className="lg:col-span-7 liquid-glass-panel p-8 sm:p-12">
            <form onSubmit={handleTransmit} className="flex flex-col gap-6">
              <div>
                <label className="block font-sans text-xs text-[#cbd5e1] font-semibold uppercase tracking-wider mb-2">
                  Your Name or Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Elena Vance / Spatial Media Lab"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-white/[0.06] border border-white/20 focus:border-[#00f0ff] focus:outline-none text-white font-sans text-sm transition-colors backdrop-blur-md"
                />
              </div>

              <div>
                <label className="block font-sans text-xs text-[#cbd5e1] font-semibold uppercase tracking-wider mb-2">
                  Project Vision &amp; Scope
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your 3D interactive dreamscape, spatial computing vision, or luxury brand architecture..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-white/[0.06] border border-white/20 focus:border-[#00f0ff] focus:outline-none text-white font-sans text-sm transition-colors resize-none backdrop-blur-md"
                />
              </div>

              <button
                type="submit"
                disabled={sent}
                className="btn-floating-primary w-full sm:w-auto self-start mt-2"
              >
                {sent ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Connecting Telegram...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Direct Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Outposts & Verification */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="liquid-glass-panel p-8 sm:p-10 flex flex-col gap-6">
              
              <div>
                <div className="font-sans text-xs text-[#00f0ff] uppercase tracking-wider mb-2 font-bold flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>DIRECT CHANNELS</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
                  Available for selective creative direction, real-time 3D web systems, and high-impact digital flagships.
                </p>
              </div>

              <div className="flex flex-col gap-3 font-sans text-xs">
                <a
                  href="https://t.me/TianyiXiong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.12] border border-white/[0.1] transition-all group font-semibold text-white"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
                    Telegram // @TianyiXiong
                  </span>
                  <span className="font-mono text-[#00f0ff] text-[11px]">&rarr;</span>
                </a>

                <a
                  href="https://github.com/LanKuzuMK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.12] border border-white/[0.1] transition-all group font-semibold text-white"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#cbd5e1]" />
                    GitHub // LanKuzuMK
                  </span>
                  <span className="font-mono text-[#00f0ff] text-[11px]">&rarr;</span>
                </a>

                <a
                  href="https://youtube.com/@jackmp3fx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.12] border border-white/[0.1] transition-all group font-semibold text-white"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#fcd34d]" />
                    YouTube // @jackmp3fx
                  </span>
                  <span className="font-mono text-[#00f0ff] text-[11px]">&rarr;</span>
                </a>
              </div>

              {/* Quality Seal */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <div className="font-sans text-xs text-white font-bold uppercase tracking-wide">
                    MK STUDIO QUALITY SEAL
                  </div>
                  <div className="font-sans text-[11px] text-[#cbd5e1] mt-0.5 font-normal">
                    Engineered to world-class standards of visual fidelity and interactive fluidity.
                  </div>
                </div>
              </div>

            </div>

            {/* Sovereign Signature */}
            <div className="liquid-glass-subcard p-6 flex items-center justify-between">
              <div>
                <div className="font-sans text-xs text-white font-bold uppercase">ARCHIPELAGO CORE</div>
                <div className="font-sans text-[11px] text-[#cbd5e1]">MK (Jack) &bull; Creative Technologist</div>
              </div>
              <button
                onClick={onBackToTop}
                className="font-sans text-xs text-[#00f0ff] hover:underline font-semibold flex items-center gap-1.5 cursor-pointer bg-transparent border-0"
              >
                <span>Ascend to Top</span>
                <span className="font-mono text-sm">&uarr;</span>
              </button>
            </div>
          </div>

        </div>

        {/* Global Footer Copyright Line */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-[#cbd5e1]">
          <div>
            &copy; {new Date().getFullYear()} MK / Lan Kuzu Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            <span>The Dream Archipelago &bull; Real-Time 3D Volumetric World</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
