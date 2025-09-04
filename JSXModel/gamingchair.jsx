import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function GamingChair(props) {
  const { nodes, materials } = useGLTF("/3dmodels/gamingchair.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[-0.279, -0.726, -1]} scale={0.001}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_0.geometry}
          material={materials["black skin"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_0_1.geometry}
          material={materials.outline}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_2.geometry}
        material={materials["black plactic"]}
        position={[-0.279, -0.726, -1]}
        scale={0.001}
      />
      <group position={[-0.279, -0.726, -1]} scale={0.001}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_4.geometry}
          material={materials.metal}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_4_1.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_4_2.geometry}
          material={materials["Material.001"]}
        />
      </group>
      <group
        position={[0.033, 0.079, 0.051]}
        rotation={[0, -0.712, 0]}
        scale={[0.02, 0.02, 0.018]}
      >
        <group position={[-0.279, -0.726, -1]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1.geometry}
            material={materials["black plactic"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_1.geometry}
            material={materials.outline}
          />
        </group>
      </group>
      <group
        position={[0.039, 0.078, -0.005]}
        rotation={[0, 0.389, 0]}
        scale={[0.02, 0.02, 0.018]}
      >
        <group position={[-0.279, -0.726, -1]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1.geometry}
            material={materials["black plactic"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_1.geometry}
            material={materials.outline}
          />
        </group>
      </group>
      <group
        position={[-0.051, 0.078, 0]}
        rotation={[Math.PI, 0.328, 0]}
        scale={[-0.02, -0.02, -0.018]}
      >
        <group position={[-0.279, -0.726, -1]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1.geometry}
            material={materials["black plactic"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_1.geometry}
            material={materials.outline}
          />
        </group>
      </group>
      <group
        position={[-0.006, 0.078, -0.036]}
        rotation={[-Math.PI, 1.571, 0]}
        scale={[-0.02, -0.02, -0.018]}
      >
        <group position={[-0.279, -0.726, -1]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1.geometry}
            material={materials["black plactic"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_1.geometry}
            material={materials.outline}
          />
        </group>
      </group>
      <group
        position={[-0.04, 0.078, 0.054]}
        rotation={[Math.PI, -0.882, Math.PI]}
        scale={[0.02, 0.02, 0.018]}
      >
        <group position={[-0.279, -0.726, -1]} scale={0.001}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1.geometry}
            material={materials["black plactic"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_1.geometry}
            material={materials.outline}
          />
        </group>
      </group>
      <group
        position={[-0.191, 0.016, 0.238]}
        rotation={[Math.PI / 2, 0, -0.876]}
        scale={0.283}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_3_instance_0.geometry}
          material={materials["black plactic"]}
          position={[-0.279, -0.726, -1]}
          scale={0.001}
        />
      </group>
      <group
        position={[0.214, 0.018, 0.206]}
        rotation={[-Math.PI / 2, 0, -0.73]}
        scale={-0.283}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_3_instance_1.geometry}
          material={materials["black plactic"]}
          position={[-0.279, -0.726, -1]}
          scale={0.001}
        />
      </group>
      <group
        position={[0.265, 0.016, -0.098]}
        rotation={[-Math.PI / 2, 0, 0.435]}
        scale={-0.283}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_3_instance_2.geometry}
          material={materials["black plactic"]}
          position={[-0.279, -0.726, -1]}
          scale={0.001}
        />
      </group>
      <group
        position={[-0.006, 0.016, -0.276]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={-0.283}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_3_instance_3.geometry}
          material={materials["black plactic"]}
          position={[-0.279, -0.726, -1]}
          scale={0.001}
        />
      </group>
      <group
        position={[-0.275, 0.016, -0.077]}
        rotation={[Math.PI / 2, 0, 0.315]}
        scale={0.283}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_3_instance_4.geometry}
          material={materials["black plactic"]}
          position={[-0.279, -0.726, -1]}
          scale={0.001}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/3dmodels/gamingchair.glb");
