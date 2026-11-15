# The Floating Realm of MK Studio // 3D Dream Archipelago Portfolio

<div align="center">

[![React 19](https://img.shields.io/badge/React-19.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r187-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3.6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3.5-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Lenis Smooth Scroll](https://img.shields.io/badge/Lenis-Smooth_Scroll_120fps-blueviolet?style=for-the-badge)](https://lenis.darkroom.engineering/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<p align="center">
  <strong>An immersive, high-fidelity 3D spatial portfolio floating above a celestial ocean of clouds.</strong><br>
  Engineered with real-time WebGL, procedural terrain displacement, 120 FPS decoupled kinetic choreography, and liquid-glass morphic UI.
</p>

[**Explore Live Demo**](https://surreal-universe-portfolio.vercel.app) • [**Architecture**](#-architectural-highlights) • [**Destinations**](#-the-six-destinations) • [**Quick Start**](#-getting-started)

</div>

---

## ✦ Overview

**The Floating Realm of MK Studio** is a visionary creative technologist portfolio designed to transcend traditional flat interfaces. Grounded in high-fantasy celestial worldbuilding and spatial computing aesthetics, the site suspends visitors inside an interactive, living 3D archipelago where physical graphic design, WebGL shader craftsmanship, and editorial typography coexist in fluid harmony.

Every scroll interaction orchestrates an organic camera flight path, rotating and reframing the central floating sanctuary while transitioning through six dedicated spatial destinations.

---

## ⚡ Architectural Highlights

### 1. 25,600-Vertex Procedural Floating Sanctuary
- **Displaced Volumetric Topography:** Built upon a dense 160×160 vertex subdivision matrix mathematically sculpted using radial falloff, organic trigonometric height offsets, and procedural ledge overhangs.
- **Micro-Relief & PBR Texturing:** Infused with high-resolution roughness and normal distribution maps simulating weathered stone steps, celestial flora, and ancient architectural ruins.
- **Accompanying Satellite Islets:** Secondary levitating terrain fragments counter-balance the main landmass, introducing authentic parallax depth across viewport camera swings.

### 2. Zero-VDOM 120 FPS Kinetic Motion Architecture
- **Decoupled Motion Store:** All scroll and mouse telemetry bypasses React's virtual DOM reconciliation loop. Position, target coordinates, and velocity vectors are streamed directly to an atomic motion buffer (`motionStore.ts`).
- **Exponential Frame-Rate Independent Dampening:** Camera translation and island attitude are interpolated inside the Three.js render loop via $`\text{damp} = 1.0 - e^{-9.0 \times \Delta t}`$, guaranteeing buttery 120 FPS performance across variable refresh monitors without stutter or jitter.
- **GPU-Accelerated Atmospheric Particulates:** 700+ luminous celestial spores and mist matrices are translated via direct buffer matrices without per-frame CPU vertex reallocation.

### 3. 80% Translucent Liquid Glass Morphic Interface
- **Spectral Backdrop Filtering:** Multi-layered CSS backdrop blurs ($`16\text{px}`$ to $`28\text{px}`$) paired with calibrated 80% opacity color foundations allow the celestial 3D world behind each card to refract naturally without impairing text legibility.
- **Precision Specular Rim Insets:** Ultra-subtle inner borders (`rgba(255, 255, 255, 0.12)`) and ambient radial drop shadows cast natural ambient occlusion onto the floating landscape below.
- **Single-Line Milestone Constraints:** Strictly isolated layout pill badges (`whitespace-nowrap shrink-0`) preventing responsive text clipping or date breaks.

### 4. Precision Typography & Design System
- **Curated Font Pairing:** Headings rendered in **Space Grotesk** for modern architectural poise, balanced with **Plus Jakarta Sans** for crisp, uncompromised UI readability at all sizes.
- **Refined Color Palette:** Deep space obsidian bases (`#06090e`), luminous celestial cyan accents (`#22d3ee`), and radiant gold milestone highlights (`#facc15`).

---

## 🌌 The Six Destinations

| # | Destination | Identity | Purpose |
|---|---|---|---|
| **01** | **Origin** | `The Dream Archipelago` | Spatial entrance, hero statement, live telemetry badges, and camera anchor. |
| **02** | **Sanctuary** | `The Architect's Core` | Philosophy, studio principles, creative direction, and technological ethos. |
| **03** | **Skills** | `Multidisciplinary Arsenal` | Interactive skill spheres across 3D/Creative Tech, Full-Stack Architecture, and Design Engineering. |
| **04** | **Projects** | `Selected Island Archives` | Flagship case studies featuring Royal Paper & Pen, MK Vault, and Gesture On Air. |
| **05** | **Experience** | `Trajectory & Milestones` | Chronological career timeline, institutional leadership roles, and client track records. |
| **06** | **Dream Gate** | `Contact & Transmission` | High-security transmission terminal and collaborative inquiry pipeline. |

---

## 🛠️ Tech Stack & Engineering Specifications

- **Framework:** [React 19](https://react.dev/)
- **Core 3D Engine:** [Three.js r187](https://threejs.org/)
- **Build System:** [Vite 8](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with native `@theme` CSS configuration
- **Smooth Scrolling Engine:** [Lenis](https://lenis.darkroom.engineering/)
- **Motion & Easing:** [GSAP](https://gsap.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** [TypeScript 7](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** v18.0.0 or higher
- **Package Manager:** `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/LanKuzuMK/surreal-universe-portfolio.git
   cd surreal-universe-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Generates optimized, minified production assets in the `dist/` directory.

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📁 Repository Directory Structure

```
surreal-universe-portfolio/
├── public/
│   ├── celestial-eden.png         # High-resolution procedural environment map
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── AboutSection.tsx       # Destination 02: Sanctuary
│   │   ├── ContactSection.tsx     # Destination 06: Dream Gate
│   │   ├── ExperienceSection.tsx  # Destination 05: Milestones
│   │   ├── FloatingIslandCanvas.tsx # Core 120 FPS Three.js WebGL Island & Sky
│   │   ├── HeroSection.tsx        # Destination 01: Origin
│   │   ├── Navigation.tsx         # Liquid glass floating HUD
│   │   ├── ProjectsSection.tsx    # Destination 04: Case Studies
│   │   └── SkillsSection.tsx      # Destination 03: Tech Arsenal
│   ├── utils/
│   │   └── motionStore.ts         # Decoupled zero-VDOM kinetic scroll store
│   ├── App.tsx                    # Root orchestrator & Lenis integration
│   ├── index.css                  # Tailwind v4 theme, fonts & liquid glass classes
│   └── main.tsx                   # Application entrypoint
├── index.html                     # Preloaded Google Fonts & viewport metadata
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 👤 Author & Credits

**MK // LanKuzuMK**
- **Studio:** MK Studio & Spatial Media Lab
- **GitHub:** [@LanKuzuMK](https://github.com/LanKuzuMK)
- **Specialization:** Real-Time 3D WebGL, Creative Technology & Spatial Systems Architecture

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
