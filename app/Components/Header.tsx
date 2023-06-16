"use client";
import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { ThreeDText } from "../../JSXModel/3dText.jsx";
import { isMobile, isBrowser } from "react-device-detect";

export default function Header() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  });
  return (
    <>
      <div className="flex items-center overflow-x-hidden">
        <div>
          <Canvas
            style={{
              width,
              height,
            }}
            shadows
            dpr={[1, 2]}
            camera={{ fov: 30 }}
          >
            <Suspense fallback={null}>
              <Stage
                preset="rembrandt"
                intensity={1}
                environment="city"
                position={[0, 0, 0]}
              >
                false
                <ThreeDText position={[0, 0, 0]} scale={1} />
                false
              </Stage>
            </Suspense>
            {isBrowser ? (
              <OrbitControls
                enablePan={false}
                enableRotate={true}
                autoRotate={true}
                autoRotateSpeed={0.8}
                rotateSpeed={0.5}
                enableZoom={false}
              />
            ) : null}
          </Canvas>
        </div>
      </div>
    </>
  );
}
