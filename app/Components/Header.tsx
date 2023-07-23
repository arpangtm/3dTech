import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { ThreeDText } from "../../JSXModel/3dText.jsx";
import { isMobile, isBrowser } from "react-device-detect";

export default function Header() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [modelState, setmodelState] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      const clientId = localStorage.getItem("clientId");
      !clientId
        ? localStorage.setItem("clientId", `${Math.random()}`)
        : setmodelState(false);
      if (modelState) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  }, [modelState]);

  return (
    <>
      <div
        id="defaultModal"
        aria-hidden="true"
        className={`${
          modelState ? `flex` : `hidden`
        } fixed justify-center items-center z-50 w-full h-full p-4`}
      >
        <div className=" w-full max-w-2xl max-h-full">
          <div className=" rounded-lg shadow bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600">
              <h3 className="text-xl font-semibold text-white">
                Note From The Creator
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                data-modal-hide="defaultModal"
                onClick={() => setmodelState(!modelState)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-gray-400">
                <p className="text-red-700">
                  **Get the Full Fledged Experience of the site in a desktop or
                  laptop with GPU acceleration enabled**{" "}
                </p>
                Hi👋. I am Arpan, creator of this site. This is one of the
                project from by{" "}
                <a className="text-blue-700" href="https://arpangtm.com.np">
                  portfolio
                </a>
                . The datas and informations about the tech devices in this
                website are fake. I make this site to show my familiarity with
                different technologies and frameworks. Below are the frameworks
                and tech I used to build this:
                <ul className="flex flex-wrap justify-between list-disc">
                  <li className="basis-1/2">NextJS (A ReactJS framework)</li>
                  <li className="basis-1/2">MongoDB with Mongoose</li>
                  <li className="basis-1/2">Tailwind</li>
                  <li className="basis-1/2">
                    NextJS Route Handlers For Backend
                  </li>
                  <li className="basis-1/2">Three JS</li>
                  <li className="basis-1/2">Stripe Payment Integration</li>
                </ul>
              </p>
              <p className="text-base leading-relaxed text-gray-400">
                Features to try out!
                <ul className="list-disc">
                  <li>Authentication(Login SignUp)</li>
                  <li>Google OAuth</li>
                  <li>View Products in 3d</li>
                  <li>Putting products to wishlist and checkout list</li>
                  <li>Checking Out (Payment integration with Stripe)</li>
                </ul>
              </p>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t rounded-b border-gray-600">
              <button
                data-modal-hide="defaultModal"
                type="button"
                className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                onClick={() => setmodelState(!modelState)}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex items-center overflow-x-hidden ${
          modelState ? `overflow-y-hidden` : ``
        }`}
      >
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

// export function getServerSideProps() {
//   if (cookies().has("clientId")) {
//     return {
//       props: {
//         clientId: true,
//       },
//     };
//   }
// }
