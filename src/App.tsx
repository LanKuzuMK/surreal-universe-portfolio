import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { FloatingIslandCanvas } from './three/FloatingIslandCanvas';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { motionStore } from './utils/motionStore';
import type { ProjectItem } from './types';

export const App: React.FC = () => {
  const [currentDestination, setCurrentDestination] = useState<string>('origin');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const lenisRef = useRef<Lenis | null>(null);

  // High-Performance 120 FPS Lenis Kinetic Engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.8,
      infinite: false,
    });
    lenisRef.current = lenis;

    // Writes directly to high-frequency motionStore (0 React VDOM re-renders during scrolling!)
    lenis.on('scroll', (e: { progress: number; velocity: number }) => {
      motionStore.scrollProgress = e.progress;
      motionStore.scrollVelocity = e.velocity;
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Track mouse coordinates directly into motionStore (0 React VDOM re-renders during mouse movement!)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      motionStore.mouseX = e.clientX / window.innerWidth;
      motionStore.mouseY = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Active section observer across the 6 Destinations
  useEffect(() => {
    const destinations = ['origin', 'sanctuary', 'skills', 'projects', 'experience', 'gate'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentDestination(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: '-20% 0px -40% 0px', threshold: 0.1 }
    );

    destinations.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToDestination = (destId: string) => {
    const el = document.getElementById(destId);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0, duration: 1.15 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setCurrentDestination(destId);
  };

  return (
    <div className="relative w-full min-h-screen bg-transparent text-[#f8fafc] selection:bg-[#00f0ff] selection:text-[#0c0e17]">
      
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Atmospheric Dream Mist Overlay */}
      <div className="mist-overlay" />

      {/* Photorealistic 3D Floating Island Canvas (Direct 120 FPS Shared Memory Motion) */}
      <FloatingIslandCanvas currentDestination={currentDestination} />

      {/* Minimalist Archipelago Navigation */}
      <Navigation
        currentDestination={currentDestination}
        onSelectDestination={scrollToDestination}
      />

      {/* Expansive Full-Bleed Destinations Flow */}
      <main className="relative z-10 flex flex-col w-full">
        <HeroSection
          onExploreProjects={() => scrollToDestination('projects')}
          onExploreSanctuary={() => scrollToDestination('sanctuary')}
        />
        <AboutSection />
        <ExpertiseSection />
        <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />
        <ExperienceSection />
        <ContactSection onBackToTop={() => scrollToDestination('origin')} />
      </main>

      {/* Project Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
};

export default App;
