"use client";

import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial } from "@react-three/drei";
import { Button } from "../../components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import * as THREE from "three";
import { Iphone12ProBlue } from "@/JSXModel/iphone";
import { MISmartTV } from "@/JSXModel/MISmartTV";
import { AsusRog } from "@/JSXModel/AsusRog";
import { JBLHeadphones } from "@/JSXModel/JBLHeadphones";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} scale={2}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#8B5CF6"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0}
      />
    </mesh>
  );
}

function FloatingCube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#06B6D4" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

export default function Hero() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Handle scroll position updates
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is a first-time visitor
  useEffect(() => {
    if (typeof window !== "undefined") {
      const clientId = localStorage.getItem("clientId");
      if (!clientId) {
        localStorage.setItem("clientId", `${Math.random()}`);
        setShowWelcomeModal(true);
      }

      if (showWelcomeModal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  }, [showWelcomeModal]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{
            position: [0, 0, 8],
            fov: 60,
            near: 0.1,
            far: 1000,
          }}
          shadows
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          style={{ cursor: "grab" }}
        >
          {/* Improved Lighting Setup */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.5}
            color="#4f46e5"
          />
          <spotLight
            position={[0, 10, 0]}
            intensity={0.8}
            angle={0.6}
            penumbra={0.5}
            castShadow
          />

          {/* Objects with better positioning */}
          <AnimatedSphere position={[0, 0, 0]} />

          {/* iPhone positioned to the right */}
          <Iphone12ProBlue
            position={[4, 1, 1]}
            rotation={[0, -0.3, 0.1]}
            scale={1}
          />

          {/* Smart TV positioned to the left */}
          <MISmartTV position={[-4, -1, 0]} rotation={[0, 0.4, 0]} scale={1} />

          {/* Asus ROG positioned behind and slightly elevated */}
          <AsusRog position={[-2, 2, -2]} rotation={[0, 0.2, 0]} scale={1} />

          <JBLHeadphones
            position={[2, -2, 2]}
            rotation={[90, 0, 0]}
            scale={[8, 8, 8]}
          />

          {/* Enhanced Controls */}
          <OrbitControls
            enableZoom={false}
            enableDamping={true}
            dampingFactor={0.05}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.3}
            minDistance={4}
            maxDistance={12}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            target={[0, 0, 0]}
          />

          {/* Add some atmospheric fog */}
          <fog attach="fog" args={["#1a1a1a", 8, 20]} />
        </Canvas>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="backdrop-blur-md bg-white/20 rounded-3xl p-8 border border-white/30 shadow-2xl shadow-white/10">
          <h1 className="text-4xl md:text-8xl font-extrabold bg-gradient-to-r from-slate-800 via-blue-600 to-cyan-500 bg-clip-text text-transparent mb-8 animate-fade-in tracking-tight drop-shadow-lg">
            3D Tech Shop
          </h1>

          <p className="text-xl md:text-2xl text-dark mb-8 max-w-3xl mx-auto animate-fade-in font-medium">
            Experience technology like never before. Explore, interact, and shop
            in our immersive 3D environment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore in 3D
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-slate-300 text-slate-700 hover:bg-white/50 hover:text-slate-800 px-8 py-4 text-lg rounded-full backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-sm font-bold text-slate-700 flex justify-center mb-2">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.5 16H8M8 16V3.5M8 16L3.5 20.5M3.5 8H16M16 8V20.5M16 8L20.5 3.5M21 15.3373V3.8C21 3.51997 21 3.37996 20.9455 3.273C20.8976 3.17892 20.8211 3.10243 20.727 3.0545C20.62 3 20.48 3 20.2 3H8.66274C8.41815 3 8.29586 3 8.18077 3.02763C8.07873 3.05213 7.98119 3.09253 7.89172 3.14736C7.7908 3.2092 7.70432 3.29568 7.53137 3.46863L3.46863 7.53137C3.29568 7.70432 3.2092 7.7908 3.14736 7.89172C3.09253 7.98119 3.05213 8.07873 3.02763 8.18077C3 8.29586 3 8.41815 3 8.66274V20.2C3 20.48 3 20.62 3.0545 20.727C3.10243 20.8211 3.17892 20.8976 3.273 20.9455C3.37996 21 3.51997 21 3.8 21H15.3373C15.5818 21 15.7041 21 15.8192 20.9724C15.9213 20.9479 16.0188 20.9075 16.1083 20.8526C16.2092 20.7908 16.2957 20.7043 16.4686 20.5314L20.5314 16.4686C20.7043 16.2957 20.7908 16.2092 20.8526 16.1083C20.9075 16.0188 20.9479 15.9213 20.9724 15.8192C21 15.7041 21 15.5818 21 15.3373Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-slate-500 font-medium">3D Products</div>
            </div>
            <div className="animate-fade-in text-dark">
              <div className="text-sm font-bold text-dark flex justify-center mb-2">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 21C20 18.8783 19.1571 16.8434 17.6569 15.3431C16.1566 13.8429 14.1217 13 12 13C9.87827 13 7.84344 13.8429 6.34315 15.3431C4.84285 16.8434 4 18.8783 4 21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-slate-500 font-medium">Happy Customers</div>
            </div>
            <div className="animate-fade-in text-dark">
              <div className="text-sm font-bold text-slate-700 flex justify-center mb-2">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 13C8 13 9.5 15 12 15C14.5 15 16 13 16 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 9H9.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 9H15.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-slate-500 font-medium">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center">
          <div className="w-1 h-3 bg-black rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>

      {/* Info Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <Button
          onClick={() => setShowWelcomeModal(true)}
          className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 px-6 py-3 rounded-full font-bold shadow-md border border-gray-700/30 hover:shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center"
        >
          <span className="mr-2">ℹ️</span> About
        </Button>
      </div>

      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowWelcomeModal(false)}
          ></div>

          <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 rounded-2xl p-6 md:p-8 max-w-lg w-full border border-gray-700/30 shadow-2xl backdrop-blur-md transform transition-all duration-500 animate-fade-in">
            <button
              onClick={() => setShowWelcomeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
            >
              <span className="text-xl">×</span>
            </button>

            <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-400">
              Welcome to 3D Tech Shop
            </h2>

            <div className="space-y-4 text-gray-300/80">
              <p>
                👋 Hi there! I'm{" "}
                <span className="font-semibold text-gray-300">Arpan</span>, the
                creator of this demo e-commerce site built with Next.js and
                Tailwind CSS.
              </p>

              <p>
                This project showcases modern web development techniques
                including:
              </p>

              <ul className="list-disc pl-5 space-y-2">
                <li>Responsive design with Tailwind CSS</li>
                <li>Interactive UI components</li>
                <li>Smooth animations and transitions</li>
                <li>Dark mode with subtle accents</li>
                <li>Product cards with hover effects</li>
                <li>3D models with Three.js and React Three Fiber</li>
              </ul>

              <p>
                Feel free to explore the site and check out the various UI
                elements and interactions!
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                onClick={() => setShowWelcomeModal(false)}
                className="text-gray-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-6 py-3 text-center bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 focus:ring-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              >
                Let's Explore
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
