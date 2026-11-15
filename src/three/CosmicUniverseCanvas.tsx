import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CosmicUniverseCanvasProps {
  currentDimension: string;
  mousePos: { x: number; y: number };
}

export const CosmicUniverseCanvas: React.FC<CosmicUniverseCanvasProps> = ({
  currentDimension,
  mousePos,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  const mousePosRef = useRef(mousePos);
  useEffect(() => {
    mousePosRef.current = mousePos;
  }, [mousePos]);

  const targetCameraPos = useRef(new THREE.Vector3(0, 0, 22));
  const targetCameraLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentCameraLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene with velvety deep atmospheric fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090a0f, 0.025);

    // 2. Camera with cinematic focal length
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 500);
    camera.position.set(0, 0, 22);

    // 3. Renderer with clamped DPR and tone mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      precision: 'mediump',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // 4. Subtle Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(10, 15, 12);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00f0ff, 1.5);
    rimLight.position.set(-12, -8, -10);
    scene.add(rimLight);

    // 5. MASTER SCULPTURE: MINIMALIST ARCHITECTURAL ASTROLABE
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Materials: Brushed champagne gold, obsidian titanium, frosted glass
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xe5b869,
      metalness: 0.9,
      roughness: 0.25,
    });

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x1a1e28,
      metalness: 0.85,
      roughness: 0.35,
    });

    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x090e18,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.25,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.8,
      thickness: 1.5,
      transparent: true,
      opacity: 0.85,
    });

    // Central geometric crystal
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMesh = new THREE.Mesh(coreGeo, crystalMat);
    sculptureGroup.add(coreMesh);

    // Inner wireframe lattice for architectural precision
    const wireGeo = new THREE.IcosahedronGeometry(1.62, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    sculptureGroup.add(wireMesh);

    // Concentric precision rings with varied orbital tilts
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.03, 16, 100), goldMat);
    sculptureGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.025, 16, 100), titaniumMat);
    ring2.rotation.x = Math.PI / 3;
    sculptureGroup.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(5.4, 0.03, 16, 100), goldMat);
    ring3.rotation.y = Math.PI / 3.5;
    sculptureGroup.add(ring3);

    // 6. WHISPER PARTICLES (Soft, non-intrusive ambient stars)
    const particleCount = 600;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const r = 8 + Math.random() * 24;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x8a98b0,
      size: 0.06,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Silky Render Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Kinetic rotation
      coreMesh.rotation.y = t * 0.15;
      coreMesh.rotation.x = t * 0.08;
      wireMesh.rotation.y = t * 0.15;
      wireMesh.rotation.x = t * 0.08;
      
      ring1.rotation.z = t * 0.09;
      ring2.rotation.y = t * -0.11;
      ring3.rotation.x = t * 0.07;

      particles.rotation.y = t * 0.008;

      // Mouse Parallax
      const curMouse = mousePosRef.current;
      const pX = (curMouse.x - 0.5) * 1.5;
      const pY = -(curMouse.y - 0.5) * 1.0;

      camera.position.x += (targetCameraPos.current.x + pX - camera.position.x) * 0.04;
      camera.position.y += (targetCameraPos.current.y + pY - camera.position.y) * 0.04;
      camera.position.z += (targetCameraPos.current.z - camera.position.z) * 0.04;

      currentCameraLookAt.current.lerp(targetCameraLookAt.current, 0.04);
      camera.lookAt(currentCameraLookAt.current);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      crystalMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      goldMat.dispose();
      titaniumMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  // Section-driven camera choreographies
  useEffect(() => {
    switch (currentDimension) {
      case 'threshold':
        targetCameraPos.current.set(0, 0, 22);
        targetCameraLookAt.current.set(0, 0, 0);
        break;
      case 'multiverse':
        targetCameraPos.current.set(4, -1, 18);
        targetCameraLookAt.current.set(-1.0, 0, 0);
        break;
      case 'codex':
        targetCameraPos.current.set(-4, 1.2, 17);
        targetCameraLookAt.current.set(1.2, 0, 0);
        break;
      case 'pillars':
        targetCameraPos.current.set(2, -0.8, 15);
        targetCameraLookAt.current.set(-0.8, 0, 0);
        break;
      case 'singularity':
        targetCameraPos.current.set(0, 1.5, 19);
        targetCameraLookAt.current.set(0, 0, 0);
        break;
      default:
        targetCameraPos.current.set(0, 0, 22);
        targetCameraLookAt.current.set(0, 0, 0);
    }
  }, [currentDimension]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};
