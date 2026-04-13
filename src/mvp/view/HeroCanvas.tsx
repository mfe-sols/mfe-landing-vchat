import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ══════════════════════════════════════════════════════════
   HeroCanvas — 3D Particle Network
   ──────────────────────────────────────────────────────────
   Mô phỏng mạng LAN phi tập trung:
   • Particle nodes = thiết bị trên mạng
   • Lines giữa particle gần nhau = kết nối LAN
   • Camera orbit nhẹ + parallax theo scroll
   • Scroll xuống → particles tan dần (dissolve)
   • Respects prefers-reduced-motion
   ══════════════════════════════════════════════════════════ */

const NODE_COUNT = 80;
const LINK_DISTANCE = 2.8;
const FIELD_SIZE = 12;

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* a11y: skip if reduced-motion */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* ── Renderer ─────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 0, 14);

    /* ── Particles ────────────────────────────────── */
    const positions = new Float32Array(NODE_COUNT * 3);
    const velocities = new Float32Array(NODE_COUNT * 3);
    const sizes = new Float32Array(NODE_COUNT);

    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * FIELD_SIZE;
      positions[i3 + 1] = (Math.random() - 0.5) * FIELD_SIZE;
      positions[i3 + 2] = (Math.random() - 0.5) * FIELD_SIZE * 0.6;
      velocities[i3] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;
      sizes[i] = 0.06 + Math.random() * 0.08;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.12,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    /* ── "Hub" nodes — larger, brighter ───────────── */
    const hubCount = 5;
    const hubPositions = new Float32Array(hubCount * 3);
    for (let i = 0; i < hubCount; i++) {
      const i3 = i * 3;
      hubPositions[i3] = (Math.random() - 0.5) * FIELD_SIZE * 0.6;
      hubPositions[i3 + 1] = (Math.random() - 0.5) * FIELD_SIZE * 0.6;
      hubPositions[i3 + 2] = (Math.random() - 0.5) * 2;
    }
    const hubGeom = new THREE.BufferGeometry();
    hubGeom.setAttribute("position", new THREE.BufferAttribute(hubPositions, 3));
    const hubMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.28,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(hubGeom, hubMat));

    /* ── Lines between nearby particles ───────────── */
    const lineGeom = new THREE.BufferGeometry();
    const maxLines = NODE_COUNT * 6;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    lineGeom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeom.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(lines);

    /* ── Ambient glow sphere ──────────────────────── */
    const glowGeom = new THREE.SphereGeometry(6, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x1e3a5f,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(glowGeom, glowMat));

    /* ── State ────────────────────────────────────── */
    let scrollProgress = 0;
    let animId = 0;
    let mouseX = 0;
    let mouseY = 0;
    let width = container.clientWidth;
    let height = container.clientHeight;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();

    const onScroll = () => {
      const heroEl = container.closest(".lv-hero");
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      scrollProgress = Math.max(0, Math.min(1, -rect.top / rect.height));
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    /* ── Animation loop ───────────────────────────── */
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      /* Move particles */
      const pos = particleGeom.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < NODE_COUNT; i++) {
        const i3 = i * 3;
        pos.array[i3] += velocities[i3];
        pos.array[i3 + 1] += velocities[i3 + 1];
        pos.array[i3 + 2] += velocities[i3 + 2];

        /* Bounce off boundaries */
        const half = FIELD_SIZE * 0.5;
        for (let axis = 0; axis < 3; axis++) {
          if (Math.abs(pos.array[i3 + axis]) > half) {
            velocities[i3 + axis] *= -1;
          }
        }
      }
      pos.needsUpdate = true;

      /* Rebuild links */
      let lineIdx = 0;
      const lp = lineGeom.attributes.position as THREE.BufferAttribute;
      const lc = lineGeom.attributes.color as THREE.BufferAttribute;
      for (let i = 0; i < NODE_COUNT && lineIdx < maxLines; i++) {
        for (let j = i + 1; j < NODE_COUNT && lineIdx < maxLines; j++) {
          const dx = pos.array[i * 3] - pos.array[j * 3];
          const dy = pos.array[i * 3 + 1] - pos.array[j * 3 + 1];
          const dz = pos.array[i * 3 + 2] - pos.array[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < LINK_DISTANCE) {
            const alpha = 1 - dist / LINK_DISTANCE;
            const off = lineIdx * 6;
            lp.array[off] = pos.array[i * 3];
            lp.array[off + 1] = pos.array[i * 3 + 1];
            lp.array[off + 2] = pos.array[i * 3 + 2];
            lp.array[off + 3] = pos.array[j * 3];
            lp.array[off + 4] = pos.array[j * 3 + 1];
            lp.array[off + 5] = pos.array[j * 3 + 2];
            /* cyan → blue gradient */
            lc.array[off] = 0.376 * alpha;
            lc.array[off + 1] = 0.741 * alpha;
            lc.array[off + 2] = 0.976 * alpha;
            lc.array[off + 3] = 0.235 * alpha;
            lc.array[off + 4] = 0.647 * alpha;
            lc.array[off + 5] = 0.965 * alpha;
            lineIdx++;
          }
        }
      }
      lineGeom.setDrawRange(0, lineIdx * 2);
      lp.needsUpdate = true;
      lc.needsUpdate = true;

      /* Camera gentle orbit + mouse parallax */
      camera.position.x = Math.sin(t * 0.15) * 1.5 + mouseX * 0.8;
      camera.position.y = Math.cos(t * 0.12) * 1.0 - mouseY * 0.6;
      camera.lookAt(0, 0, 0);

      /* Scroll dissolve — push particles outward + fade */
      const dissolve = scrollProgress;
      particleMat.opacity = 0.9 * (1 - dissolve * 0.8);
      lineMat.opacity = 0.35 * (1 - dissolve);
      particles.position.y = dissolve * -3;
      camera.position.z = 14 + dissolve * 6;

      renderer.render(scene, camera);
    };

    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      hubGeom.dispose();
      hubMat.dispose();
      lineGeom.dispose();
      lineMat.dispose();
      glowGeom.dispose();
      glowMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="lv-hero-canvas"
      aria-hidden="true"
    />
  );
}
