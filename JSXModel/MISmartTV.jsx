import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function MISmartTV(props) {
  const { nodes, materials } = useGLTF("/3dmodels/MI SMART TV.glb");
  return (
    <group {...props} dispose={null}>
      <group
        position={[0, 0.733, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1, 1, 0.596]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_1.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_2.geometry}
          material={materials["Material.009"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_3.geometry}
          material={materials["Material.010"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_4.geometry}
          material={nodes.Plane_4.material}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials["Material.008"]}
        position={[0.342, 0.735, -0.49]}
        rotation={[0, 0, -1.601]}
        scale={0.148}
      />
      <group
        position={[0.336, 0.811, -0.453]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[-0.012, -0.02, -0.012]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_1.geometry}
          material={materials["YELLOW RUB"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_2.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_3.geometry}
          material={materials["Material.007"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_4.geometry}
          material={materials.metal}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_5.geometry}
          material={materials["Material.002"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={materials["Material.006"]}
        position={[0.329, 0.535, -0.452]}
        scale={[-0.005, -0.018, -0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.STAND}
        position={[0.002, 0.065, -0.37]}
        scale={[0.071, 0.021, 0.313]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane002.geometry}
        material={materials.GLASS}
        position={[0.003, 0.83, -0.223]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.481}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        material={materials["Material.011"]}
        position={[-0.015, 0.145, -0.3]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.035}
      />
    </group>
  );
}

useGLTF.preload("/3dmodels/MI SMART TV.glb");
