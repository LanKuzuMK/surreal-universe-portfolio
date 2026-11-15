import React, { useEffect } from 'react';
import type { ProjectItem } from '../types';
import { X, ArrowUpRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Modal Dialog Window in Liquid Glass */}
      <div className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto liquid-glass-panel p-8 sm:p-12 shadow-2xl flex flex-col gap-8 bg-[#0c101d]/85 border border-white/[0.2]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Case Study"
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/[0.08] border border-white/20 hover:border-[#00f0ff] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Metadata Header */}
        <div>
          <div className="font-mono text-xs text-[#00f0ff] uppercase tracking-[0.2em] mb-2.5 flex items-center gap-2 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>{project.category} &bull; {project.year}</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
            {project.title}
          </h2>
          <div className="font-sans text-xs text-[#10b981] mt-3 flex items-center gap-2 font-semibold tracking-wide">
            <Layers className="w-3.5 h-3.5" />
            <span>Role: {project.role}</span>
          </div>
        </div>

        {/* Overview */}
        <div className="flex flex-col gap-3">
          <div className="font-sans text-xs uppercase tracking-wider text-[#cbd5e1] font-semibold">
            Architectural Narrative
          </div>
          <p className="font-sans text-base text-white/90 leading-relaxed font-normal">
            {project.longDescription}
          </p>
        </div>

        {/* Philosophical Context */}
        {project.philosophicalContext && (
          <div className="liquid-glass-subcard p-6 border-l-4 border-l-[#fcd34d]">
            <div className="font-sans text-xs text-[#fcd34d] uppercase tracking-wider mb-2 font-bold">
              Philosophical Context
            </div>
            <p className="font-sans text-sm sm:text-base text-white italic">
              &ldquo;{project.philosophicalContext}&rdquo;
            </p>
          </div>
        )}

        {/* Engineering Highlights */}
        <div className="flex flex-col gap-4">
          <div className="font-sans text-xs uppercase tracking-wider text-[#cbd5e1] font-semibold">
            Engineering Highlights &amp; Breakthroughs
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.features.map((feat, fIdx) => (
              <div
                key={fIdx}
                className="liquid-glass-subcard p-4 font-sans text-xs sm:text-sm text-white/90 flex items-start gap-3 font-normal"
              >
                <ShieldCheck className="w-4 h-4 text-[#10b981] mt-0.5 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Telemetry Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-4 py-5 border-y border-white/[0.12]">
            {project.metrics.map((m) => (
              <div key={m.label} className="text-center font-mono">
                <div className="font-sans text-[11px] text-[#cbd5e1] uppercase mb-1 font-semibold">
                  {m.label}
                </div>
                <div className="text-sm sm:text-base text-white font-bold tracking-tight">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="badge-tag">
                {tag}
              </span>
            ))}
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-floating-primary text-xs py-2.5 px-6 self-stretch sm:self-auto text-center"
            >
              <span>Launch Live Deployment</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
