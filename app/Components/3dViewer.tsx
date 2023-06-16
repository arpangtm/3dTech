import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { isMobile } from "react-device-detect";
import { OrbitControls, Stage } from "@react-three/drei";

import { Iphone12ProBlue } from "../../JSXModel/iphone";
import { AlienwareLaptop } from "../../JSXModel/AlienwareLaptop";
import { Gamingchair } from "../../JSXModel/gamingchair";
import { Macbookpro } from "../../JSXModel/macbookpro";
import { JBLHeadphones } from "../../JSXModel/JBLHeadphones";
import { AsusRog } from "../../JSXModel/AsusRog";
import { MISmarTV } from "../../JSXModel/MISmartTV";

export default function Viewer() {
  const ref = useRef();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    isMobile ? setWidth(window.innerWidth) : setWidth(window.innerWidth / 3);
    isMobile
      ? setHeight(window.innerHeight / 3)
      : setHeight(window.innerHeight / 2);
  }, []);
  return (
    <div>
      <Canvas
        style={{ height, width }}
        shadows
        dpr={[1, 2]}
        camera={{ fov: 50 }}
      >
        <Suspense fallback={null}>
          <Stage
            controls={ref}
            preset="rembrandt"
            intensity={1}
            environment="city"
          >
            false
            {/* <Iphone12ProBlue rotation={[0, Math.PI / 4, 0]} /> */}
            {/* <AlienwareLaptop></AlienwareLaptop> */}
            {/* <Gamingchair></Gamingchair> */}
            {/* <Macbookpro></Macbookpro> */}
            {/* <JBLHeadphones></JBLHeadphones> */}
            {/* <AsusRog></AsusRog> */}
            <MISmarTV></MISmarTV>
            false
          </Stage>
        </Suspense>
        <OrbitControls ref={ref} autoRotate />
      </Canvas>
    </div>
  );
}
