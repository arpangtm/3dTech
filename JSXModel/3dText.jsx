import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function ThreeDText(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/3dmodels/f_3d.glb");
  const { actions, names } = useAnimations(animations, group);
  console.log(names);
  useEffect(() => {
    // actions.TextAnimation.play();
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Text"
          castShadow
          receiveShadow
          geometry={nodes.Text.geometry}
          material={materials["Material.001"]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          name="Text001"
          castShadow
          receiveShadow
          geometry={nodes.Text001.geometry}
          material={materials["Material.001"]}
          position={[0.59, 0.03, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.37}
        />
        <mesh
          name="Text002"
          castShadow
          receiveShadow
          geometry={nodes.Text002.geometry}
          material={materials["Material.001"]}
          position={[0.57, -0.25, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.36}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/3dmodels//f_3d.glb");
