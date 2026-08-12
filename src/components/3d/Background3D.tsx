import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Background3DProps {
  interactive?: boolean;
}

export const Background3D: React.FC<Background3DProps> = ({ interactive = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [fpsLow, setFpsLow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || isDisabled) return;

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsDisabled(true);
      return;
    }

    let animationFrameId: number;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let particleSystem: THREE.Points;
    let lineMesh: THREE.LineSegments;
    let geometryGroup: THREE.Group;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf8f9fa, 0.0018);

    // 2. Camera
    camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 250;
    camera.position.y = 20;

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Create Neural / Agentic Network Particles & Nodes
    const particleCount = window.innerWidth < 768 ? 120 : 250;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const particleData: { velocity: THREE.Vector3; numConnections: number }[] = [];

    const colorBlue = new THREE.Color(0x2563eb);
    const colorDarkAccent = new THREE.Color(0x0f172a);
    const colorSlate = new THREE.Color(0x64748b);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 450;
      const y = (Math.random() - 0.5) * 350;
      const z = (Math.random() - 0.5) * 350;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color variation - Light Theme palette
      const rand = Math.random();
      const mixedColor = rand < 0.6 ? colorBlue : (rand < 0.85 ? colorDarkAccent : colorSlate);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      particleData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.35,
          (Math.random() - 0.5) * 0.35,
          (Math.random() - 0.5) * 0.35
        ),
        numConnections: 0
      });
    }

    const pGeometry = new THREE.BufferGeometry();
    pGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture canvas
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(37, 99, 235, 1)');
      grad.addColorStop(0.4, 'rgba(15, 23, 42, 0.7)');
      grad.addColorStop(1, 'rgba(248, 249, 250, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(8, 8, 8, 0, Math.PI * 2);
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);

    const pMaterial = new THREE.PointsMaterial({
      size: 5,
      vertexColors: true,
      map: texture,
      transparent: true,
      depthWrite: false
    });

    particleSystem = new THREE.Points(pGeometry, pMaterial);

    // 5. Lines connecting close neural nodes
    const maxConnections = particleCount * 6;
    const linePositions = new Float32Array(maxConnections * 3);
    const lineColors = new Float32Array(maxConnections * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35
    });

    lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);

    // 6. Floating Agentic Abstract Polyhedron Mesh in Center
    geometryGroup = new THREE.Group();
    const icoGeo = new THREE.IcosahedronGeometry(40, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    geometryGroup.add(icoMesh);

    scene.add(particleSystem);
    scene.add(lineMesh);
    scene.add(geometryGroup);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      mouseX = (e.clientX - window.innerWidth / 2) * 0.08;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.08;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let lastTime = performance.now();
    let frameCount = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Simple FPS check
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 2000) {
        const fps = (frameCount * 1000) / (now - lastTime);
        if (fps < 20 && !fpsLow) {
          setFpsLow(true);
        }
        frameCount = 0;
        lastTime = now;
      }

      // Smooth camera tilt
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX;
      camera.position.y = -targetY + 20;
      camera.lookAt(scene.position);

      // Rotate central agentic mesh
      if (geometryGroup) {
        geometryGroup.rotation.x += 0.002;
        geometryGroup.rotation.y += 0.003;
      }

      // Update particle positions & connections
      const posAttr = pGeometry.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      let vertexIdx = 0;
      let colorIdx = 0;
      let numConnected = 0;

      for (let i = 0; i < particleCount; i++) {
        particleData[i].numConnections = 0;
      }

      const connectionDist = 75;

      for (let i = 0; i < particleCount; i++) {
        const pData = particleData[i];

        posArr[i * 3] += pData.velocity.x;
        posArr[i * 3 + 1] += pData.velocity.y;
        posArr[i * 3 + 2] += pData.velocity.z;

        // Bounce boundaries
        if (Math.abs(posArr[i * 3]) > 225) pData.velocity.x *= -1;
        if (Math.abs(posArr[i * 3 + 1]) > 175) pData.velocity.y *= -1;
        if (Math.abs(posArr[i * 3 + 2]) > 175) pData.velocity.z *= -1;

        // Lines to neighbors
        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArr[i * 3] - posArr[j * 3];
          const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
          const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDist) {
            if (pData.numConnections >= 5 || particleData[j].numConnections >= 5) continue;

            pData.numConnections++;
            particleData[j].numConnections++;

            const alpha = 1.0 - dist / connectionDist;

            linePositions[vertexIdx++] = posArr[i * 3];
            linePositions[vertexIdx++] = posArr[i * 3 + 1];
            linePositions[vertexIdx++] = posArr[i * 3 + 2];

            linePositions[vertexIdx++] = posArr[j * 3];
            linePositions[vertexIdx++] = posArr[j * 3 + 1];
            linePositions[vertexIdx++] = posArr[j * 3 + 2];

            // Color gradient for connection lines
            lineColors[colorIdx++] = 0.02 * alpha;
            lineColors[colorIdx++] = 0.7 * alpha;
            lineColors[colorIdx++] = 0.85 * alpha;

            lineColors[colorIdx++] = 0.2 * alpha;
            lineColors[colorIdx++] = 0.5 * alpha;
            lineColors[colorIdx++] = 0.9 * alpha;

            numConnected++;
          }
        }
      }

      posAttr.needsUpdate = true;

      const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const lineColAttr = lineGeometry.attributes.color as THREE.BufferAttribute;

      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      lineGeometry.setDrawRange(0, numConnected * 2);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      pGeometry.dispose();
      pMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      renderer.dispose();
    };
  }, [interactive, isDisabled]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Fallback subtle dark ambient mesh if 3D disabled */}
      {isDisabled ? (
        <div className="absolute inset-0 bg-radial from-cyan-950/20 via-[#0b0f19] to-[#0b0f19]" />
      ) : (
        <div ref={mountRef} className="absolute inset-0 w-full h-full opacity-70" />
      )}

      {/* Grid line background overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" 
      />

      {/* Subtle top glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 3D Background Toggle Button */}
      <button
        onClick={() => setIsDisabled(!isDisabled)}
        className="pointer-events-auto fixed bottom-4 right-4 z-50 text-[11px] px-3.5 py-2 rounded-full bg-[#111827]/90 backdrop-blur-md text-white border border-[#374151] hover:bg-[#111827] hover:border-[#2563EB] transition-all shadow-lg font-mono font-medium"
      >
        {isDisabled ? 'Enable 3D Background' : 'Disable 3D Background (Boost Speed)'}
      </button>
    </div>
  );
};
