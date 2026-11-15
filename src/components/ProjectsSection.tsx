import React, { useState } from 'react';
import { PROJECTS } from '../constants/projects';
import type { ProjectItem } from '../types';
import { ArrowUpRight, ArrowRight, Layers } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filters = [
    'All',
    '3D Web & WebGL',
    'Full-Stack Architecture',
    'Avant-Garde Graphic Design',
    'Mobile & Computer Vision',
  ];

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative min-h-screen w-full archipelago-section z-10">
      <div className="dream-container">
        
        {/* Destination Header with Generous Clearance & Segmented Control */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-20 gap-8 pb-8 border-b border-white/[0.12]">
          <div className="max-w-xl">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#00f0ff] mb-2.5 flex items-center gap-2.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] shrink-0" />
              <span>DESTINATION 04 &bull; LIVING ARCHIVE</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              The Project Islands
            </h2>
          </div>

          {/* Liquid Glass Segmented Filter Bar */}
          <div className="p-1.5 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-wrap gap-1.5 self-start lg:self-auto">
            {filters.map((f) => {
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-xl font-sans text-xs font-semibold tracking-wide transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-r from-white via-[#fef08a] to-white text-[#0c0e17] font-bold border-white shadow-md'
                      : 'bg-transparent text-[#cbd5e1] hover:text-white border-transparent hover:bg-white/[0.08]'
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Responsive Transparent Liquid Glass Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="liquid-glass-panel p-8 sm:p-11 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Card Header & Metadata */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-sm text-[#00f0ff] font-bold tracking-tight">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-white/25 text-xs font-sans">/</span>
                    <span className="font-sans text-xs text-[#cbd5e1] font-semibold uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#fcd34d] font-bold bg-white/[0.08] px-3.5 py-1 rounded-full border border-white/[0.14] backdrop-blur-sm whitespace-nowrap shrink-0">
                    {project.year}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 group-hover:text-[#00f0ff] transition-colors">
                  {project.title}
                </h3>

                {/* Role Marker */}
                <div className="font-sans text-xs text-[#10b981] mb-4 flex items-center gap-2 font-semibold tracking-wide">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{project.role}</span>
                </div>

                {/* Narrative Description */}
                <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>

                {/* Telemetry Metrics Bar (Bordered Glass Bar) */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 py-3 px-4 mb-6 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="font-sans text-[10px] text-[#94a3b8] font-semibold uppercase tracking-wider mb-0.5">
                          {m.label}
                        </div>
                        <div className="font-mono text-xs sm:text-sm text-white font-bold tracking-tight">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technology Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="badge-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="flex items-center justify-between pt-5 border-t border-white/[0.08] gap-4">
                <button
                  onClick={() => onSelectProject(project)}
                  className="btn-pill-action cursor-pointer bg-transparent"
                >
                  <span>Explore Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00f0ff] group-hover:translate-x-1 transition-transform" />
                </button>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-floating-primary text-xs py-2 px-5"
                  >
                    <span>Launch Live</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
