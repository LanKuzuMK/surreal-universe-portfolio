import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate for mouse/pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;
    let isClicked = false;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${isClicked ? 0.6 : isHovered ? 1.4 : 1})`;
      }
    };

    const handleMouseDown = () => {
      isClicked = true;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(0.6)`;
      }
    };

    const handleMouseUp = () => {
      isClicked = false;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${isHovered ? 1.4 : 1})`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        isHovered = true;
        if (ringRef.current) {
          ringRef.current.style.borderColor = '#00f0ff';
          ringRef.current.style.backgroundColor = 'rgba(0, 240, 255, 0.08)';
          ringRef.current.style.width = '42px';
          ringRef.current.style.height = '42px';
        }
      } else {
        isHovered = false;
        if (ringRef.current) {
          ringRef.current.style.borderColor = 'rgba(255, 255, 255, 0.25)';
          ringRef.current.style.backgroundColor = 'transparent';
          ringRef.current.style.width = '24px';
          ringRef.current.style.height = '24px';
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Ultra-lightweight lerp loop for the trailing ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[1000] w-1.5 h-1.5 rounded-full bg-[#00f0ff] hidden md:block will-change-transform shadow-[0_0_10px_#00f0ff]"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[999] rounded-full border border-white/20 hidden md:block will-change-transform transition-[width,height,background-color,border-color] duration-150 ease-out"
        style={{ width: '24px', height: '24px' }}
      />
    </>
  );
};
