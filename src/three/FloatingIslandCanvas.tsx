import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motionStore } from '../utils/motionStore';

interface FloatingIslandCanvasProps {
  currentDestination: string;
}

// Ultra-Sensitive, Dynamic 3D Camera Waypoints across the 6 Destinations
// Progressive Storytelling: UPPER PART unzoomed at top; CRAGGY BOTTOM PART showcased at bottom
function getCameraPath(p: number) {
  const clamped = Math.max(0, Math.min(1, p));
  const waypoints = [
    // 01 / Origin (Upper part): Unzoomed, elevated vista framing the lush UPPER PART (ancient temple, archway, willow grove, bridge, golden sky)
    { t: 0.00, radius: 29.5, angleX:  0.00, camY:  4.5, lx:  0.0, ly:  1.5, lz: 0.0 },
    // 02 / Sanctuary: Dynamic descent banking into ancient colonnade & weeping willow
    { t: 0.20, radius: 20.0, angleX: -0.55, camY:  2.8, lx: -2.0, ly:  0.8, lz: 0.8 },
    // 03 / Skills: Sweeping transit across the island to right flank, framing ancient colonnade & upper falls
    { t: 0.40, radius: 21.0, angleX:  0.65, camY:  1.2, lx:  2.0, ly: -0.2, lz: 1.0 },
    // 04 / Projects: Mid-cliff overlook following cascading waterfall plunge into cloud ocean
    { t: 0.60, radius: 23.0, angleX:  0.30, camY: -0.8, lx:  0.8, ly: -1.6, lz: 0.5 },
    // 05 / Experience: Monumental low-angle ascent looking up at craggy limestone strata & hanging roots
    { t: 0.80, radius: 22.0, angleX: -0.38, camY: -3.6, lx:  0.0, ly: -2.4, lz: 0.0 },
    // 06 / Gate (Bottom part): Showcasing the massive craggy BOTTOM PART & rocky underside plunging into cloud ocean
    { t: 1.00, radius: 26.5, angleX:  0.05, camY: -4.5, lx:  0.0, ly: -3.2, lz: 0.0 },
  ];

  let i = 0;
  while (i < waypoints.length - 2 && clamped > waypoints[i + 1].t) {
    i++;
  }
  const w1 = waypoints[i];
  const w2 = waypoints[i + 1];
  const span = w2.t - w1.t || 1;
  const localT = (clamped - w1.t) / span;
  // Smooth cubic hermite curve for silky camera interpolation
  const smooth = localT * localT * (3 - 2 * localT);

  return {
    radius: w1.radius + (w2.radius - w1.radius) * smooth,
    angleX: w1.angleX + (w2.angleX - w1.angleX) * smooth,
    camY: w1.camY + (w2.camY - w1.camY) * smooth,
    lookAt: new THREE.Vector3(
      w1.lx + (w2.lx - w1.lx) * smooth,
      w1.ly + (w2.ly - w1.ly) * smooth,
      w1.lz + (w2.lz - w1.lz) * smooth
    ),
  };
}

// Procedural 360° Celestial Dream Sky Texture (Zero Black Void)
function createDreamSkyTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Harmonized celestial atmosphere gradient matching Eden palette
  const grad = ctx.createLinearGradient(0, 0, 0, 1024);
  grad.addColorStop(0.00, '#10142b'); // Zenith: Deep Celestial Twilight
  grad.addColorStop(0.18, '#241c3e'); // Royal Twilight Violet
  grad.addColorStop(0.35, '#503565'); // Soft Lavender Dusk
  grad.addColorStop(0.48, '#8c4e74'); // Warm Rose Amethyst
  grad.addColorStop(0.60, '#c76288'); // Sunset Rose Glow
  grad.addColorStop(0.70, '#e89098'); // Soft Ethereal Pink
  grad.addColorStop(0.78, '#f5b18f'); // Warm Golden Peach
  grad.addColorStop(0.86, '#fed37f'); // Brilliant Golden Sunlight
  grad.addColorStop(0.92, '#7dd3fc'); // Glacial Turquoise Horizon Bounce
  grad.addColorStop(1.00, '#e8eef8'); // Pearlescent Cloud Ocean Floor
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Soft atmospheric cloud bands near horizon
  for (let i = 0; i < 45; i++) {
    const x = Math.random() * 1024;
    const y = 620 + Math.random() * 320;
    const w = 180 + Math.random() * 260;
    const h = 25 + Math.random() * 45;

    const cGrad = ctx.createRadialGradient(x, y, 4, x, y, w * 0.5);
    const alpha = 0.08 + Math.random() * 0.14;
    cGrad.addColorStop(0, `rgba(254, 240, 138, ${alpha})`);
    cGrad.addColorStop(0.6, `rgba(244, 114, 182, ${alpha * 0.5})`);
    cGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = cGrad;
    ctx.beginPath();
    ctx.ellipse(x, y, w * 0.5, h * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Wrap around for seamless equirectangular sphere mapping
    if (x - w * 0.5 < 0) {
      ctx.beginPath();
      ctx.ellipse(x + 1024, y, w * 0.5, h * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (x + w * 0.5 > 1024) {
      ctx.beginPath();
      ctx.ellipse(x - 1024, y, w * 0.5, h * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Distant glowing fantasy stars in upper celestial dome
  for (let s = 0; s < 180; s++) {
    const sx = Math.random() * 1024;
    const sy = Math.random() * 420;
    const sr = Math.random() * 1.5 + 0.5;
    const sAlpha = 0.4 + Math.random() * 0.6;
    ctx.fillStyle = `rgba(255, 255, 255, ${sAlpha})`;
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

// Procedural Organic Alpha Feathering Mask (Eliminates all rectangular sharp plane edges)
function createIslandAlphaMask(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 1024, 1024);

  // Soft organic radial mask with smooth cubic hermite falloff
  const grad = ctx.createRadialGradient(512, 512, 330, 512, 512, 495);
  grad.addColorStop(0.00, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.65, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.85, 'rgba(255, 255, 255, 0.7)');
  grad.addColorStop(0.96, 'rgba(255, 255, 255, 0.2)');
  grad.addColorStop(1.00, 'rgba(255, 255, 255, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

// Procedural 1024x1024 High-Frequency Micro-Detail Bump Map for 4K Crispness
function createMicroDetailBumpMap(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 1024, 1024);

  // Micro-crevice high frequency noise
  for (let i = 0; i < 8000; i++) {
    const px = Math.random() * 1024;
    const py = Math.random() * 1024;
    const val = Math.random() < 0.5 ? Math.random() * 80 : 175 + Math.random() * 80;
    ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
    ctx.fillRect(px, py, Math.random() * 2 + 1, Math.random() * 2 + 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  return texture;
}

// Soft Circular Radial Glow Texture for Spores & Mist (Zero Square Pixel Artifacts)
function createSoftCircleParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
  grad.addColorStop(0.00, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.85)');
  grad.addColorStop(0.70, 'rgba(255, 255, 255, 0.25)');
  grad.addColorStop(1.00, 'rgba(255, 255, 255, 0.0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(32, 32, 30, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

// Distant Satellite Floating Rock Landmass (Adds true archipelago depth without visual clutter)
function createDistantFloatingIslet(scale: number = 1.0) {
  const group = new THREE.Group();

  const rockMat = new THREE.MeshStandardMaterial({
    color: 0x475569, // Weathered slate limestone
    roughness: 0.90,
    metalness: 0.05,
    flatShading: true,
  });

  const turfMat = new THREE.MeshStandardMaterial({
    color: 0x15803d, // Lush emerald moss / turf
    roughness: 0.75,
    metalness: 0.02,
  });

  // Craggy inverted rock underbelly
  const coneGeo = new THREE.ConeGeometry(2.0 * scale, 3.8 * scale, 10);
  coneGeo.rotateX(Math.PI);
  const underbelly = new THREE.Mesh(coneGeo, rockMat);
  underbelly.position.y = -1.9 * scale;
  underbelly.castShadow = true;
  group.add(underbelly);

  // Turf plateau
  const plateauGeo = new THREE.CylinderGeometry(2.1 * scale, 1.9 * scale, 0.6 * scale, 12);
  const plateau = new THREE.Mesh(plateauGeo, turfMat);
  plateau.position.y = 0.3 * scale;
  plateau.castShadow = true;
  group.add(plateau);

  return {
    group,
    dispose: () => {
      coneGeo.dispose();
      plateauGeo.dispose();
      rockMat.dispose();
      turfMat.dispose();
    },
  };
}

export const FloatingIslandCanvas: React.FC<FloatingIslandCanvasProps> = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & 360° Celestial Dream Sky Atmosphere (Zero Black Void)
    const scene = new THREE.Scene();
    const skyTexture = createDreamSkyTexture();
    scene.background = skyTexture;
    scene.environment = skyTexture;
    scene.fog = new THREE.FogExp2(0x281e46, 0.0035);

    // 1B. 360° Infinite Sky Dome Sphere
    const skyGeo = new THREE.SphereGeometry(380, 48, 32);
    const skyMat = new THREE.MeshBasicMaterial({
      map: skyTexture,
      side: THREE.BackSide,
      fog: false,
    });
    const skyDome = new THREE.Mesh(skyGeo, skyMat);
    scene.add(skyDome);

    // 1C. Endless 3D Volumetric Cloud Ocean Floor
    const cloudOceanGeo = new THREE.PlaneGeometry(420, 420, 48, 48);
    cloudOceanGeo.rotateX(-Math.PI / 2);
    const cloudOceanMat = new THREE.MeshStandardMaterial({
      color: 0xfff1f2, // Pearlescent rose-white
      roughness: 0.92,
      metalness: 0.0,
      transparent: true,
      opacity: 0.68,
    });
    const cloudOcean = new THREE.Mesh(cloudOceanGeo, cloudOceanMat);
    cloudOcean.position.y = -16.5;
    scene.add(cloudOcean);

    // 2. Camera Setup
    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 800);
    camera.position.set(0, 2.0, 24);

    // 3. High-Performance High-DPI PBR Renderer (True 4K Sharpness, 120 FPS Uncapped)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      precision: 'highp',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Studio Cinematic Golden Hour Illumination
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 1.45);
    scene.add(ambientLight);

    // Primary warm directional sun
    const sunLight = new THREE.DirectionalLight(0xfff3d6, 3.8);
    sunLight.position.set(22, 28, 16);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // Sunset rose / lavender fill
    const rimLight = new THREE.DirectionalLight(0xf472b6, 2.2);
    rimLight.position.set(-22, -8, -14);
    scene.add(rimLight);

    // Glacial turquoise water bounce
    const waterBounce = new THREE.DirectionalLight(0x00f0ff, 1.8);
    waterBounce.position.set(8, -12, 10);
    scene.add(waterBounce);

    // Dynamic mouse-following point light
    const mouseLight = new THREE.PointLight(0x00f0ff, 2.2, 26);
    mouseLight.position.set(0, 0, 10);
    scene.add(mouseLight);

    // 4K Ultra-High-Definition Texture with 16x Anisotropic Filtering
    const textureLoader = new THREE.TextureLoader();
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    const islandTexture = textureLoader.load('/island_celestial_eden_4k.jpg');
    islandTexture.colorSpace = THREE.SRGBColorSpace;
    islandTexture.anisotropy = maxAnisotropy;
    islandTexture.minFilter = THREE.LinearMipmapLinearFilter;
    islandTexture.magFilter = THREE.LinearFilter;
    islandTexture.generateMipmaps = true;

    const microBumpMap = createMicroDetailBumpMap();
    microBumpMap.anisotropy = maxAnisotropy;

    // ==========================================
    // 5. MASTER 3D DISPLACED SCULPTURAL ISLAND
    // ==========================================
    const masterIslandGroup = new THREE.Group();
    scene.add(masterIslandGroup);

    // 5A. 3D DISPLACED RELIEF MESH (160x160 subdivision = 25,600 vertices)
    const islandWidth = 46;
    const islandHeight = 26;
    const islandGeo = new THREE.PlaneGeometry(islandWidth, islandHeight, 160, 160);

    const pos = islandGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = islandGeo.attributes.uv.getX(i);
      const v = islandGeo.attributes.uv.getY(i);
      const x = pos.getX(i);
      const y = pos.getY(i);

      // Radial island core mask
      const dx = (u - 0.5) * 2.0;
      const dy = (v - 0.46) * 2.0;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const isIsland = Math.max(0, 1.0 - dist * 1.25);

      // Real 3D curvature pushing the island towards the camera
      let zDisp = isIsland * 4.6;

      // 1. Craggy underbelly rock relief
      if (v < 0.55 && v > 0.12 && Math.abs(u - 0.5) < 0.36) {
        zDisp += Math.sin(x * 1.6) * Math.cos(y * 1.4) * 0.9;
        zDisp += Math.sin(x * 3.8 + y * 2.6) * 0.45;
        zDisp += Math.sin(y * 6.0) * 0.25;
      }

      // 2. Lush sanctuary plateau & ancient temple terrace
      if (v >= 0.52 && v <= 0.88 && Math.abs(u - 0.5) < 0.42) {
        zDisp += Math.sin(x * 0.75) * 0.7 + 0.6;
        zDisp += Math.cos(y * 1.8) * 0.3;
      }

      // 3. Cascading waterfall plunge
      if (v < 0.55 && v > 0.22 && ((u > 0.24 && u < 0.36) || (u > 0.56 && u < 0.72))) {
        zDisp += 1.1 + Math.sin(y * 4.0) * 0.2;
      }

      if (dist > 0.7) {
        zDisp -= (dist - 0.7) * 2.5;
      }

      pos.setZ(i, zDisp);
    }
    islandGeo.computeVertexNormals();

    const islandAlphaMask = createIslandAlphaMask();
    islandAlphaMask.anisotropy = maxAnisotropy;

    const islandMat = new THREE.MeshStandardMaterial({
      map: islandTexture,
      bumpMap: microBumpMap,
      bumpScale: 0.08,
      roughness: 0.52,
      metalness: 0.1,
      side: THREE.DoubleSide,
      transparent: true,
      alphaMap: islandAlphaMask,
      alphaTest: 0.005,
      flatShading: false,
    });

    const islandMesh = new THREE.Mesh(islandGeo, islandMat);
    islandMesh.castShadow = true;
    islandMesh.receiveShadow = true;
    masterIslandGroup.add(islandMesh);

    // ==========================================
    // 5B. DISTANT ARCHIPELAGO SATELLITE ISLETS
    // ==========================================
    const satelliteGroup = new THREE.Group();
    scene.add(satelliteGroup);

    const distantIsletLeft = createDistantFloatingIslet(1.4);
    distantIsletLeft.group.position.set(-26.0, 5.0, -8.0);
    satelliteGroup.add(distantIsletLeft.group);

    const distantIsletRight = createDistantFloatingIslet(1.1);
    distantIsletRight.group.position.set(28.0, -3.5, -10.0);
    satelliteGroup.add(distantIsletRight.group);

    const distantIsletFar = createDistantFloatingIslet(0.85);
    distantIsletFar.group.position.set(-18.0, -7.0, -14.0);
    satelliteGroup.add(distantIsletFar.group);

    // ==========================================
    // 5C. 3D CASCADING WATERFALL MIST PARTICLES
    // ==========================================
    const circleParticleTex = createSoftCircleParticleTexture();

    const mistCount = 380;
    const mistGeo = new THREE.BufferGeometry();
    const mistPos = new Float32Array(mistCount * 3);

    for (let i = 0; i < mistCount; i++) {
      const isRight = Math.random() < 0.6;
      const startX = isRight ? 4.8 + (Math.random() - 0.5) * 1.8 : -4.8 + (Math.random() - 0.5) * 1.6;
      const startY = 0.5 - Math.random() * 8.5;
      const startZ = 2.4 + Math.random() * 1.8;

      mistPos[i * 3] = startX;
      mistPos[i * 3 + 1] = startY;
      mistPos[i * 3 + 2] = startZ;
    }
    mistGeo.setAttribute('position', new THREE.BufferAttribute(mistPos, 3));

    const mistMat = new THREE.PointsMaterial({
      map: circleParticleTex,
      color: 0xa5f3fc,
      size: 0.35,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const mistPoints = new THREE.Points(mistGeo, mistMat);
    scene.add(mistPoints);

    // ==========================================
    // 5D. 3D GOLDEN SPORE & DUST FIELD (SOFT CIRCULAR MOTES)
    // ==========================================
    const sporeCount = 550;
    const sporeGeo = new THREE.BufferGeometry();
    const sporePositions = new Float32Array(sporeCount * 3);
    const sporeColors = new Float32Array(sporeCount * 3);

    const colGold = new THREE.Color(0xfde047);
    const colCyan = new THREE.Color(0x38bdf8);
    const colRose = new THREE.Color(0xf472b6);

    for (let i = 0; i < sporeCount; i++) {
      sporePositions[i * 3] = (Math.random() - 0.5) * 48;
      sporePositions[i * 3 + 1] = -10 + Math.random() * 26;
      sporePositions[i * 3 + 2] = -12 + Math.random() * 28;

      const pick = Math.random();
      const c = pick < 0.5 ? colGold : pick < 0.85 ? colCyan : colRose;
      sporeColors[i * 3] = c.r;
      sporeColors[i * 3 + 1] = c.g;
      sporeColors[i * 3 + 2] = c.b;
    }
    sporeGeo.setAttribute('position', new THREE.BufferAttribute(sporePositions, 3));
    sporeGeo.setAttribute('color', new THREE.BufferAttribute(sporeColors, 3));

    const sporeMat = new THREE.PointsMaterial({
      map: circleParticleTex,
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sporePoints = new THREE.Points(sporeGeo, sporeMat);
    scene.add(sporePoints);

    // ==========================================
    // 6. CONTINUOUS, 120 FPS FRAME-RATE INDEPENDENT RENDER LOOP
    // Zero CPU buffer mutations • Pure GPU transformation pipeline
    // ==========================================
    const clock = new THREE.Clock();

    let smoothP = 0;
    let smoothMouseX = 0.5;
    let smoothMouseY = 0.5;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.08); // Safety clamped delta time
      const t = clock.getElapsedTime();

      // Read high-frequency shared motion store (0 React VDOM re-renders!)
      const targetP = Math.max(0, Math.min(1, motionStore.scrollProgress));
      const targetMouseX = motionStore.mouseX;
      const targetMouseY = motionStore.mouseY;

      // 120Hz-aware exponential decay dampening
      const scrollDamp = 1.0 - Math.exp(-12.0 * delta);
      const mouseDamp = 1.0 - Math.exp(-8.5 * delta);
      const camDamp = 1.0 - Math.exp(-9.0 * delta);

      smoothP += (targetP - smoothP) * scrollDamp;
      smoothMouseX += (targetMouseX - smoothMouseX) * mouseDamp;
      smoothMouseY += (targetMouseY - smoothMouseY) * mouseDamp;

      const p = smoothP;

      // Progressive 3D Altitude Choreography
      masterIslandGroup.position.y = Math.sin(t * 0.6) * 0.35 - 3.2 + (p * 8.2);
      masterIslandGroup.rotation.y = Math.sin(t * 0.2) * 0.04 + (p - 0.5) * 0.70;
      masterIslandGroup.rotation.x = -0.12 + (p * 0.28);
      masterIslandGroup.position.z = Math.sin(p * Math.PI) * 2.0;

      // Rotate Celestial Sky Dome & Cloud Ocean Floor
      skyDome.rotation.y = t * 0.003 + (p - 0.5) * 0.25;
      cloudOcean.position.y = -16.5 + Math.sin(t * 0.8) * 0.25 + (p - 0.5) * -2.0;

      // Distant archipelago islets subtle floating physics & parallax
      distantIsletLeft.group.position.y = 5.0 + Math.sin(t * 0.5) * 0.5 + (p - 0.5) * 2.5;
      distantIsletRight.group.position.y = -3.5 + Math.sin(t * 0.6 + 1.5) * 0.4 + (p - 0.5) * -3.0;
      distantIsletFar.group.position.y = -7.0 + Math.sin(t * 0.4 + 3.0) * 0.6 + (p - 0.5) * -2.0;

      // Waterfall mist downward rush (GPU translation — zero CPU buffer uploads!)
      mistPoints.position.y = -((t * 2.6) % 9.0);
      mistPoints.position.x = Math.sin(t * 1.8) * 0.25;

      // Golden spores upward drift (GPU translation — zero CPU buffer uploads!)
      sporePoints.position.y = ((t * 0.8) % 20.0) - 10.0;
      sporePoints.rotation.y = t * 0.015;

      // ==========================================
      // ULTRA-SENSITIVE 120 FPS CAMERA KINEMATICS
      // ==========================================
      const path = getCameraPath(p);

      const orbitAngleX = path.angleX + (smoothMouseX - 0.5) * 0.42;
      const targetCamY = path.camY - (smoothMouseY - 0.5) * 3.0;

      const targetX = Math.sin(orbitAngleX) * path.radius;
      const targetZ = Math.cos(orbitAngleX) * path.radius;

      // Frame-rate independent camera position & lookAt interpolation
      camera.position.x += (targetX - camera.position.x) * camDamp;
      camera.position.y += (targetCamY - camera.position.y) * camDamp;
      camera.position.z += (targetZ - camera.position.z) * camDamp;

      currentLookAt.current.lerp(path.lookAt, camDamp);
      camera.lookAt(currentLookAt.current);

      // Mouse light follows cursor in 3D
      mouseLight.position.set((smoothMouseX - 0.5) * 18, -(smoothMouseY - 0.5) * 12 + 2, 8);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      skyGeo.dispose();
      skyMat.dispose();
      skyTexture.dispose();
      cloudOceanGeo.dispose();
      cloudOceanMat.dispose();
      islandGeo.dispose();
      islandMat.dispose();
      islandAlphaMask.dispose();
      microBumpMap.dispose();
      circleParticleTex.dispose();

      distantIsletLeft.dispose();
      distantIsletRight.dispose();
      distantIsletFar.dispose();

      mistGeo.dispose();
      mistMat.dispose();
      sporeGeo.dispose();
      sporeMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};
