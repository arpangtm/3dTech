import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ThreeDText(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/3dmodels/f_3d.glb");
  const { actions, names } = useAnimations(animations, group);
  const [hovered, setHovered] = useState(false);
  
  // Create custom materials with enhanced visual effects
  const textMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#4da6ff"),
    metalness: 0.8,
    roughness: 0.2,
    emissive: new THREE.Color("#0066cc"),
    emissiveIntensity: 0.5,
  });
  
  const accentMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#cc33ff"),
    metalness: 0.9,
    roughness: 0.1,
    emissive: new THREE.Color("#9900cc"),
    emissiveIntensity: 0.6,
  });
  
  // Animation effect
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 4) / 8;
    group.current.position.y = Math.sin(t / 2) / 10;
  });
  
  useEffect(() => {
    // Attempt to play animation if available
    if (actions && actions.TextAnimation) {
      actions.TextAnimation.play();
    }
    
    // Change cursor on hover
    document.body.style.cursor = hovered ? "pointer" : "auto";
    
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [actions, hovered]);
  return (
    <group 
      ref={group} 
      {...props} 
      dispose={null}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <group name="Scene">
        <mesh
          name="Text"
          castShadow
          receiveShadow
          geometry={nodes.Text.geometry}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <MeshWobbleMaterial 
            factor={0.15} 
            speed={0.5} 
            color={"#4da6ff"} 
            metalness={0.8} 
            roughness={0.2} 
            emissive={"#0066cc"} 
            emissiveIntensity={hovered ? 0.8 : 0.5}
          />
        </mesh>
        <mesh
          name="Text001"
          castShadow
          receiveShadow
          geometry={nodes.Text001.geometry}
          position={[0.59, 0.03, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.37}
        >
          <MeshDistortMaterial
            distort={0.2}
            speed={2}
            color={"#cc33ff"}
            metalness={0.9}
            roughness={0.1}
            emissive={"#9900cc"}
            emissiveIntensity={hovered ? 0.9 : 0.6}
          />
        </mesh>
        <mesh
          name="Text002"
          castShadow
          receiveShadow
          geometry={nodes.Text002.geometry}
          position={[0.57, -0.25, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.36}
        >
          <meshStandardMaterial
            color={"#ff6600"}
            metalness={0.7}
            roughness={0.3}
            emissive={"#cc3300"}
            emissiveIntensity={hovered ? 0.7 : 0.4}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/3dmodels//f_3d.glb");
