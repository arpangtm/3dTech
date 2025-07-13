import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { isMobile } from "react-device-detect";
import { OrbitControls, Stage } from "@react-three/drei";

import { extend } from "@react-three/fiber";
import { Iphone12ProBlue } from "../../JSXModel/iphone";
import { AlienwareLaptop } from "../../JSXModel/AlienwareLaptop";
import { Gamingchair } from "../../JSXModel/gamingchair";
import { JBLHeadphones } from "../../JSXModel/JBLHeadphones";
import { AsusRog } from "../../JSXModel/AsusRog";
import { MISmarTV } from "../../JSXModel/MISmartTV";
import Loading from "../Components/Loading";
import { Badge } from "@/components/ui/badge";

const productIdMap: any = {
  1: <Iphone12ProBlue />,
  2: <AlienwareLaptop />,
  3: <Gamingchair />,
  4: <AlienwareLaptop />,
  5: <MISmarTV />,
  6: <JBLHeadphones />,
  7: <AsusRog />,
};

export default function Viewer({ productId }: { productId: any }) {
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
      <Suspense fallback={<Loading />}>
        <div className="mt-9 left-4">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 z-50">
            Interactive 3D
          </Badge>
        </div>
        <Canvas
          style={{ height, width, cursor: "grab" }}
          shadows
          dpr={[1, 2]}
          camera={{ fov: 50 }}
        >
          <Stage
            controls={ref}
            preset="rembrandt"
            intensity={1}
            environment="city"
          >
            false
            {productIdMap[productId]}
            false
          </Stage>

          <OrbitControls autoRotate />
        </Canvas>
      </Suspense>
    </div>
  );
}
