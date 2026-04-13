import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ══════════════════════════════════════════════════════════
   ArchCanvas — 3D Topology Visualization
   ──────────────────────────────────────────────────────────
   3D topo mô phỏng kiến trúc P2P LAN:
   • Thiết bị (MacBook, POS, tablet) = 3D nodes xoay nhẹ
   • Data flow pulse chạy giữa các node
   • Orbit nhẹ, scroll-linked reveal
   • Không có server trung tâm — peer-to-peer
   ══════════════════════════════════════════════════════════ */

const DEVICE_COUNT = 6;
const RING_RADIUS = 3.5;
const PULSE_SPEED = 0.8;

/* Simple rounded-box device shape */
function createDeviceMesh(color: number, w: number, h: number, d: number) {
  const geom = new THREE.BoxGeometry(w, h, d, 2, 2, 2);
  const mat = new THREE.MeshPhongMaterial({
    color,
    transparent: true,
    opacity: 0.92,
    shininess: 80,
    specular: 0x334466,
  });
  return new THREE.Mesh(geom, mat);
}

/* Data pulse particle traveling along an edge */
function createPulse() {
  const geom = new THREE.SphereGeometry(0.06, 8, 8);
  const mat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.9,
  });
  return new THREE.Mesh(geom, mat);
}

export function ArchCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* ── Renderer ─────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 4, 9);
    camera.lookAt(0, 0, 0);

    /* ── Lighting ─────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0x334466, 1.2));
    const dirLight = new THREE.DirectionalLight(0x60a5fa, 1.5);
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    rimLight.position.set(-4, 2, -5);
    scene.add(rimLight);

    /* ── Device nodes on a ring ───────────────────── */
    const devices: THREE.Mesh[] = [];
    const devicePositions: THREE.Vector3[] = [];
    const deviceConfigs = [
      { color: 0x3b82f6, w: 0.9, h: 0.55, d: 0.06 },  /* MacBook */
      { color: 0x6366f1, w: 0.5, h: 0.7, d: 0.05 },   /* Tablet */
      { color: 0x8b5cf6, w: 0.6, h: 0.45, d: 0.35 },  /* POS */
      { color: 0x3b82f6, w: 0.9, h: 0.55, d: 0.06 },  /* MacBook */
      { color: 0x6366f1, w: 0.5, h: 0.7, d: 0.05 },   /* Tablet */
      { color: 0x0ea5e9, w: 0.45, h: 0.65, d: 0.05 }, /* Phone */
    ];

    for (let i = 0; i < DEVICE_COUNT; i++) {
      const angle = (i / DEVICE_COUNT) * Math.PI * 2;
      const x = Math.cos(angle) * RING_RADIUS;
      const z = Math.sin(angle) * RING_RADIUS;
      const cfg = deviceConfigs[i];
      const mesh = createDeviceMesh(cfg.color, cfg.w, cfg.h, cfg.d);
      mesh.position.set(x, 0, z);
      mesh.lookAt(0, 0, 0);
      scene.add(mesh);
      devices.push(mesh);
      devicePositions.push(new THREE.Vector3(x, 0, z));

      /* Screen glow plane */
      const screenGeom = new THREE.PlaneGeometry(cfg.w * 0.8, cfg.h * 0.7);
      const screenMat = new THREE.MeshBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.3,
        side: THREE.FrontSide,
      });
      const screen = new THREE.Mesh(screenGeom, screenMat);
      screen.position.set(0, 0, cfg.d * 0.51);
      mesh.add(screen);
    }

    /* ── Connection lines (peer-to-peer mesh) ─────── */
    const edgePairs: [number, number][] = [];
    for (let i = 0; i < DEVICE_COUNT; i++) {
      /* Connect to neighbors + skip-1 for mesh density */
      edgePairs.push([i, (i + 1) % DEVICE_COUNT]);
      edgePairs.push([i, (i + 2) % DEVICE_COUNT]);
    }

    const edgeGeom = new THREE.BufferGeometry();
    const edgeVerts = new Float32Array(edgePairs.length * 6);
    edgePairs.forEach(([a, b], idx) => {
      const off = idx * 6;
      edgeVerts[off] = devicePositions[a].x;
      edgeVerts[off + 1] = devicePositions[a].y;
      edgeVerts[off + 2] = devicePositions[a].z;
      edgeVerts[off + 3] = devicePositions[b].x;
      edgeVerts[off + 4] = devicePositions[b].y;
      edgeVerts[off + 5] = devicePositions[b].z;
    });
    edgeGeom.setAttribute("position", new THREE.BufferAttribute(edgeVerts, 3));
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.25,
    });
    scene.add(new THREE.LineSegments(edgeGeom, edgeMat));

    /* ── Data pulses traveling along edges ──────── */
    const pulses: { mesh: THREE.Mesh; from: THREE.Vector3; to: THREE.Vector3; t: number; speed: number }[] = [];
    for (const [a, b] of edgePairs) {
      if (Math.random() > 0.5) continue; /* only some edges active */
      const pulse = createPulse();
      scene.add(pulse);
      pulses.push({
        mesh: pulse,
        from: devicePositions[a],
        to: devicePositions[b],
        t: Math.random(),
        speed: PULSE_SPEED + Math.random() * 0.4,
      });
    }

    /* ── Center glow (no central server — just ambient) ── */
    const coreGlowGeom = new THREE.SphereGeometry(0.8, 24, 24);
    const coreGlowMat = new THREE.MeshBasicMaterial({
      color: 0x1d4ed8,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
    });
    const coreGlow = new THREE.Mesh(coreGlowGeom, coreGlowMat);
    scene.add(coreGlow);

    /* ── Ring floor ───────────────────────────────── */
    const ringGeom = new THREE.RingGeometry(RING_RADIUS - 0.05, RING_RADIUS + 0.05, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.01;
    scene.add(ring);

    /* ── State ────────────────────────────────────── */
    let animId = 0;
    let sectionProgress = 0;

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const onScroll = () => {
      const section = container.closest(".lv-section");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      sectionProgress = Math.max(0, Math.min(1, (viewH - rect.top) / (viewH + rect.height)));
    };

    /* ── Animation loop ───────────────────────────── */
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      /* Rotate ring slowly */
      devices.forEach((dev, i) => {
        const baseAngle = (i / DEVICE_COUNT) * Math.PI * 2;
        const angle = baseAngle + elapsed * 0.08;
        dev.position.x = Math.cos(angle) * RING_RADIUS;
        dev.position.z = Math.sin(angle) * RING_RADIUS;
        dev.position.y = Math.sin(elapsed * 0.5 + i) * 0.15;
        dev.lookAt(0, 0, 0);
        devicePositions[i].copy(dev.position);
      });

      /* Update edge positions */
      const ep = edgeGeom.attributes.position as THREE.BufferAttribute;
      edgePairs.forEach(([a, b], idx) => {
        const off = idx * 6;
        ep.array[off] = devicePositions[a].x;
        ep.array[off + 1] = devicePositions[a].y;
        ep.array[off + 2] = devicePositions[a].z;
        ep.array[off + 3] = devicePositions[b].x;
        ep.array[off + 4] = devicePositions[b].y;
        ep.array[off + 5] = devicePositions[b].z;
      });
      ep.needsUpdate = true;

      /* Animate pulses */
      for (const p of pulses) {
        p.t += clock.getDelta() * p.speed * 0.5;
        if (p.t > 1) {
          p.t = 0;
          /* Randomly reverse direction */
          const tmp = p.from;
          p.from = p.to;
          p.to = tmp;
        }
        p.mesh.position.lerpVectors(p.from, p.to, p.t);
        p.mesh.scale.setScalar(0.8 + Math.sin(p.t * Math.PI) * 0.6);
      }

      /* Core glow pulse */
      coreGlow.scale.setScalar(1 + Math.sin(elapsed * 1.5) * 0.15);
      coreGlowMat.opacity = 0.08 + Math.sin(elapsed * 2) * 0.04;

      /* Camera orbit */
      const camAngle = elapsed * 0.1;
      camera.position.x = Math.sin(camAngle) * 2;
      camera.position.z = 9 + Math.cos(camAngle) * 1.5;
      camera.position.y = 4 + Math.sin(elapsed * 0.15) * 0.5;
      camera.lookAt(0, 0, 0);

      /* Scroll-linked reveal — fade in as section enters */
      const reveal = Math.min(1, sectionProgress * 3);
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material as THREE.Material;
          mat.opacity = (mat.userData.baseOpacity ?? mat.opacity) * reveal;
        }
      });

      renderer.render(scene, camera);
    };

    /* Store base opacities */
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).material) {
        const mat = (obj as THREE.Mesh).material as THREE.Material;
        mat.userData.baseOpacity = mat.opacity;
      }
    });

    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
      /* Dispose geometries and materials */
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
        if ((obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else (mat as THREE.Material).dispose();
        }
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="lv-arch-canvas"
      aria-hidden="true"
    />
  );
}
