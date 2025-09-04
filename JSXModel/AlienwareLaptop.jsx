import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function AlienwareLaptop(props) {
  const { nodes, materials } = useGLTF("/3dmodels/AlienWareLaptop.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[-1.199, 0.096, 0]} rotation={[0, 0, -1.314]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_2.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_3.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_4.geometry}
          material={materials.Wallpaper}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_5.geometry}
          material={materials["Material.005"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_6.geometry}
          material={materials["Material.007"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials["Material.028"]}
        position={[-1.598, 1.323, -0.003]}
        rotation={[Math.PI / 2, 0.256, Math.PI / 2]}
        scale={0.318}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003_1.geometry}
        material={materials["Material.006"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003_2.geometry}
        material={materials["Material.009"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003_3.geometry}
        material={materials["Material.010"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003_4.geometry}
        material={materials["Material.008"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003_5.geometry}
        material={materials["Material.011"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003_6.geometry}
        material={materials["Material.012"]}
      />
    </group>
  );
}

useGLTF.preload("/3dmodels/AlienWareLaptop.glb");
