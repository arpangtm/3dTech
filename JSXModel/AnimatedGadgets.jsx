import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, MeshDistortMaterial, MeshWobbleMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';

// Preload all models
const modelPaths = [
  '/3dmodels/IPhone12PRO.glb',
  '/3dmodels/AleanWareLaptop.glb',
  '/3dmodels/JBLHeadphone.glb',
  '/3dmodels/gamingchair.glb',
  '/3dmodels/ASUS Rog.glb',
  '/3dmodels/MI SMART TV.glb'
];

// Preload all models
modelPaths.forEach(path => useGLTF.preload(path));

// Individual gadget component
function Gadget({ modelPath, position, rotation, scale, scrollY, index }) {
  const ref = useRef();
  const { nodes, materials } = useGLTF(modelPath);
  const { viewport } = useThree();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  
  // Get model name from path
  const modelName = modelPath.split('/').pop().replace('.glb', '');
  
  // Calculate responsive scale based on viewport
  const responsiveScale = Math.min(1, viewport.width / 10) * (scale || 1);
  
  // Handle pointer events
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    
    // Show label after a short delay when hovered
    let timeout;
    if (hovered) {
      timeout = setTimeout(() => setShowLabel(true), 300);
    } else {
      setShowLabel(false);
    }
    
    return () => clearTimeout(timeout);
  }, [hovered]);
  
  // Use scroll position to affect the model
  useFrame((state) => {
    if (!ref.current) return;
    
    // Base animation - gentle floating
    const t = state.clock.getElapsedTime();
    
    // Enhanced animations when hovered or clicked
    const hoverFactor = hovered ? 2 : 1;
    const clickFactor = clicked ? 3 : 1;
    
    // Scroll-based effects
    const scrollFactor = scrollY.current / 1000;
    
    // Different effects based on index to create variety
    switch (index % 6) {
      case 0: // Rotate around Y axis based on scroll with enhanced hover effect
        ref.current.rotation.y = (rotation?.y || 0) + scrollFactor * Math.PI * 2 + Math.sin(t * hoverFactor) * 0.3;
        ref.current.position.z = position?.z || 0 + (hovered ? Math.sin(t * 2) * 0.2 : 0);
        break;
      case 1: // Move up/down based on scroll with hover bounce
        ref.current.position.y = (position?.y || 0) + Math.sin(scrollFactor * 3) * 0.5 + (hovered ? Math.abs(Math.sin(t * 3)) * 0.3 : 0);
        ref.current.rotation.z = (rotation?.z || 0) + (hovered ? Math.sin(t) * 0.1 : 0);
        break;
      case 2: // Scale based on scroll with pulse on hover
        const baseScaleFactor = 1 + Math.sin(scrollFactor) * 0.2;
        const hoverScaleFactor = hovered ? 1 + Math.sin(t * 5) * 0.1 : 1;
        ref.current.scale.set(
          responsiveScale * baseScaleFactor * hoverScaleFactor,
          responsiveScale * baseScaleFactor * hoverScaleFactor,
          responsiveScale * baseScaleFactor * hoverScaleFactor
        );
        break;
      case 3: // Rotate around X axis based on scroll with wobble on hover
        ref.current.rotation.x = (rotation?.x || 0) + scrollFactor * Math.PI + (hovered ? Math.sin(t * 4) * 0.2 : 0);
        ref.current.rotation.z = (rotation?.z || 0) + (hovered ? Math.cos(t * 3) * 0.1 : 0);
        break;
      case 4: // Spiral movement
        ref.current.position.x = (position?.x || 0) + Math.sin(scrollFactor * 2 + t) * (0.3 + (hovered ? 0.2 : 0));
        ref.current.position.z = (position?.z || 0) + Math.cos(scrollFactor * 2 + t) * (0.3 + (hovered ? 0.2 : 0));
        ref.current.rotation.y = (rotation?.y || 0) + t * 0.5 + (hovered ? t : 0);
        break;
      case 5: // Orbit around center
        const orbitRadius = 0.5 + (hovered ? Math.sin(t * 2) * 0.2 : 0);
        ref.current.position.x = (position?.x || 0) + Math.sin(scrollFactor + t * 0.5) * orbitRadius;
        ref.current.position.z = (position?.z || 0) + Math.cos(scrollFactor + t * 0.5) * orbitRadius;
        ref.current.rotation.y = -scrollFactor - t * 0.5;
        break;
    }
    
    // Add a subtle floating effect to all gadgets
    ref.current.position.y += Math.sin(t + index) * 0.01;
  });

  // Create a group to hold the model
  return (
    <group 
      ref={ref} 
      position={[position?.x || 0, position?.y || 0, position?.z || 0]}
      rotation={[rotation?.x || 0, rotation?.y || 0, rotation?.z || 0]}
      scale={[responsiveScale, responsiveScale, responsiveScale]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      <primitive 
        object={nodes.Scene || Object.values(nodes)[0]} 
        material-emissive={hovered ? new THREE.Color(0x2255ff) : undefined}
        material-emissiveIntensity={hovered ? 0.3 : 0}
      />
      
      {/* Product label that appears on hover */}
      {showLabel && (
        <Html
          position={[0, 1.2, 0]}
          className="pointer-events-none"
          center
          distanceFactor={8}
        >
          <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-900/90 to-purple-900/90 backdrop-blur-sm text-white text-sm font-medium shadow-lg border border-blue-500/30 transform transition-all duration-300 animate-float">
            {modelName.replace(/_/g, ' ')}
          </div>
        </Html>
      )}
    </group>
  );
}

export function AnimatedGadgets({ scrollY }) {
  const group = useRef();
  const { viewport } = useThree();
  
  // Responsive positioning based on viewport size
  const getPositions = () => {
    const isMobile = viewport.width < 5;
    
    if (isMobile) {
      // Mobile layout - vertical arrangement
      return [
        { x: 0, y: 2, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: -2, z: 0 },
        { x: 1, y: 1, z: -1 },
        { x: -1, y: -1, z: -1 },
        { x: 0, y: -3, z: -2 }
      ];
    } else {
      // Desktop layout - circular arrangement
      return [
        { x: 2, y: 0, z: 0 },
        { x: -2, y: 0, z: 0 },
        { x: 0, y: 1.5, z: 0 },
        { x: 0, y: -1.5, z: 0 },
        { x: 1.5, y: 1.5, z: -1 },
        { x: -1.5, y: -1.5, z: -1 }
      ];
    }
  };
  
  // Global animation for the entire group
  useFrame((state) => {
    if (!group.current) return;
    
    const t = state.clock.getElapsedTime();
    const scrollFactor = scrollY.current / 2000;
    
    // Enhanced group animations based on scroll
    // Rotate the entire group based on scroll with a smooth damping effect
    const targetRotationY = Math.sin(t / 10) * 0.2 + scrollFactor * Math.PI;
    group.current.rotation.y += (targetRotationY - group.current.rotation.y) * 0.05;
    
    // Add subtle movement in other axes for more dynamic feel
    group.current.rotation.x = Math.sin(t / 15) * 0.05 + Math.sin(scrollFactor * 0.5) * 0.1;
    group.current.position.y = Math.sin(t / 8) * 0.1 + Math.sin(scrollFactor) * 0.2;
  });

  const positions = getPositions();
  const scales = [0.5, 0.4, 0.3, 0.4, 0.4, 0.5];
  
  // Add a light that follows the scroll position
  const lightRef = useRef();
  useFrame((state) => {
    if (lightRef.current) {
      const scrollFactor = scrollY.current / 1000;
      lightRef.current.position.x = Math.sin(scrollFactor) * 5;
      lightRef.current.position.z = Math.cos(scrollFactor) * 5;
    }
  });
  
  return (
    <group ref={group}>
      {/* Dynamic light that follows scroll */}
      <pointLight
        ref={lightRef}
        position={[3, 3, 3]}
        intensity={1.5}
        color="#4da6ff"
        distance={10}
      />
      
      {/* Ambient glow for all models */}
      <ambientLight intensity={0.3} />
      
      {/* Gadget models */}
      {modelPaths.map((path, index) => (
        <Gadget
          key={path}
          modelPath={path}
          position={positions[index]}
          rotation={{ x: 0, y: Math.PI * 2 * (index / modelPaths.length), z: 0 }}
          scale={scales[index]}
          scrollY={scrollY}
          index={index}
        />
      ))}
    </group>
  );
}