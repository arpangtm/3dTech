/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Gamingchair(props) {
  const { nodes, materials } = useGLTF("/3dmodels/gamingchair.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.53, 0.04]} scale={[0.15, 0.2, 0.25]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004_1.geometry}
          material={materials["black skin"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004_2.geometry}
          material={materials.outline}
        />
      </group>
      <group
        position={[0.17, 0.36, -0.06]}
        rotation={[-0.12, 0.05, -0.4]}
        scale={0.25}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_1.geometry}
          material={materials["black skin"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_2.geometry}
          material={materials.outline}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials["black skin"]}
        position={[-0.01, 0.57, -0.13]}
        rotation={[-0.21, 0, 0]}
        scale={[0.12, 0.11, 0.09]}
      />
      <group
        position={[0.03, 0.08, 0.05]}
        rotation={[0, -0.71, 0]}
        scale={0.02}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube010.geometry}
          material={materials["black plactic"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube010_1.geometry}
          material={materials.outline}
        />
      </group>
      <group
        position={[0.04, 0.08, -0.01]}
        rotation={[0, 0.39, 0]}
        scale={0.02}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube010.geometry}
          material={materials["black plactic"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube010_1.geometry}
          material={materials.outline}
        />
      </group>
      <group
        position={[-0.05, 0.08, 0]}
        rotation={[Math.PI, 0.33, 0]}
        scale={-0.02}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube010.geometry}
          material={materials["black plactic"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube010_1.geometry}
          material={materials.outline}
        />
      </group>
      <group
        position={[-0.01, 0.08, -0.04]}
        rotation={[-Math.PI, 1.57, 0]}
        scale={-0.02}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube010.geometry}
          material={materials["black plactic"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube010_1.geometry}
          material={materials.outline}
        />
      </group>
      <group
        position={[-0.04, 0.08, 0.05]}
        rotation={[Math.PI, -0.88, Math.PI]}
        scale={0.02}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube010.geometry}
          material={materials["black plactic"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube010_1.geometry}
          material={materials.outline}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={materials["black plactic"]}
        position={[0, 0.08, 0.02]}
        rotation={[0, -0.34, 0]}
        scale={[0.06, 0.03, 0.06]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube009.geometry}
        material={materials["black plactic"]}
        position={[-0.13, 0.29, 0.07]}
        rotation={[Math.PI, -0.45, Math.PI]}
        scale={[0.36, 0.41, 0.36]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials["black plactic"]}
        position={[0, 0.14, 0.02]}
        scale={0.03}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={materials["black plactic"]}
        position={[-0.19, 0.02, 0.24]}
        rotation={[Math.PI / 2, 0, -0.88]}
        scale={0.28}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002.geometry}
        material={materials["black plactic"]}
        position={[0.21, 0.02, 0.21]}
        rotation={[-Math.PI / 2, 0, -0.73]}
        scale={-0.28}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder003.geometry}
        material={materials["black plactic"]}
        position={[0.27, 0.02, -0.1]}
        rotation={[-Math.PI / 2, 0, 0.43]}
        scale={-0.28}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder004.geometry}
        material={materials["black plactic"]}
        position={[-0.01, 0.02, -0.28]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={-0.28}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder005.geometry}
        material={materials["black plactic"]}
        position={[-0.28, 0.02, -0.08]}
        rotation={[Math.PI / 2, 0, 0.31]}
        scale={0.28}
      />
      <group position={[0.25, 0.34, 0.15]} scale={[0.012, 0.006, 0.02]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder006_1.geometry}
          material={materials["black skin"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder006_2.geometry}
          material={materials.metal}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object.geometry}
        material={materials["black plactic"]}
        position={[0, 0.28, 0.18]}
        rotation={[3.13, 0, Math.PI]}
        scale={[1.06, 0.91, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object001.geometry}
        material={materials["black plactic"]}
        position={[0, 0.31, 0.12]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[1.64, 1.06, 1.06]}
      />
      <group
        position={[-0.01, 0.77, -0.18]}
        rotation={[1.61, 0, 0]}
        scale={[0.13, 0.14, 0.1]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001_1.geometry}
          material={materials["black skin"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001_2.geometry}
          material={materials.outline}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials["black skin"]}
        position={[0.06, 0.92, -0.22]}
        rotation={[1.53, 0, 0]}
        scale={[0.04, 0.03, 0.04]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane002.geometry}
        material={materials["Material.002"]}
        position={[0, 0.88, -0.19]}
        rotation={[1.38, 0, 0]}
        scale={[0.12, 0.09, 0.08]}
      />
      <group position={[0.25, 0.58, 0.17]} scale={[0.17, 0.25, 0.27]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane003_1.geometry}
          material={materials["black skin"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane003_2.geometry}
          material={materials.outline}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane004.geometry}
        material={materials["Material.001"]}
        position={[0.19, 0.36, -0.11]}
        rotation={[-0.12, 0.18, -1.53]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane005.geometry}
        material={materials["Material.001"]}
        position={[0.19, 0.36, -0.11]}
        rotation={[-0.12, 0.18, -1.55]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={materials["Material.001"]}
        position={[0.19, 0.36, -0.11]}
        rotation={[-0.12, 0.18, -1.55]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007.geometry}
        material={materials["Material.001"]}
        position={[0.115, 0.37, -0.11]}
        rotation={[-0.12, 0.18, -1.55]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane008.geometry}
        material={materials["Material.001"]}
        position={[-0.19, 0.53, -0.13]}
        rotation={[-0.13, 0.07, -1.48]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane009.geometry}
        material={materials["Material.001"]}
        position={[0.2, 0.36, -0.11]}
        rotation={[-0.12, 0.18, -1.55]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane010.geometry}
        material={materials.outline}
        position={[0.07, 0.58, -0.07]}
        rotation={[1.29, 0, 0]}
        scale={[0.02, 0.08, 0.08]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane012.geometry}
        material={materials["black skin"]}
        position={[-0.01, 0.88, -0.24]}
        rotation={[1.5, 0, 0]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane013.geometry}
        material={materials.outline}
        position={[0, 0.88, -0.19]}
        rotation={[1.38, 0, 0]}
        scale={[0.12, 0.09, 0.08]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        material={materials.outline}
        position={[-0.07, 1.04, -0.2]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.02}
      />
    </group>
  );
}

useGLTF.preload("/3dmodels/gamingchair.glb");
