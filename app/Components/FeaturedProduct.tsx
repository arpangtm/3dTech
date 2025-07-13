import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text, Center } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye, Heart } from "lucide-react";
import * as THREE from "three";
import { AlienwareLaptop } from "@/JSXModel/AlienwareLaptop";
import { Iphone12ProBlue } from "@/JSXModel/iphone";
import { JBLHeadphones } from "@/JSXModel/JBLHeadphones";
import { useSession } from "next-auth/react";
import { BsCart } from "react-icons/bs";

function ProductModel({
  color = "#8B5CF6",
  position = [0, 0, 0],
}: {
  color?: string;
  position?: [number, number, number];
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Laptop Model */}
      <group>
        {/* Laptop Base */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[2, 0.2, 1.5]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Laptop Screen */}
        <mesh position={[0, 0.6, -0.75]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[1.8, 1.2, 0.1]} />
          <meshStandardMaterial
            color="#1F2937"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Screen Display */}
        <mesh position={[0, 0.6, -0.7]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[1.6, 1, 0.01]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#0066FF"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}

function SmartphoneModel({
  color = "#06B6D4",
  position = [0, 0, 0],
}: {
  color?: string;
  position?: [number, number, number];
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Phone Body */}
      <mesh>
        <boxGeometry args={[0.8, 1.6, 0.1]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.051]}>
        <boxGeometry args={[0.7, 1.4, 0.01]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#00FF88"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

function HeadphonesModel({
  color = "#EF4444",
  position = [0, 0, 0],
}: {
  color?: string;
  position?: [number, number, number];
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Headband */}
      <mesh>
        <torusGeometry args={[1, 0.1, 8, 20, Math.PI]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Left Ear Cup */}
      <mesh position={[-0.8, -0.3, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Right Ear Cup */}
      <mesh position={[0.8, -0.3, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

const products = [
  {
    id: 2,
    name: "MacBook Pro M3",
    price: "$2,499",
    rating: 4.9,
    category: "Laptops",
    model: "laptop",
    color: "#8B5CF6",
  },
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: "$999",
    rating: 4.8,
    category: "Smartphones",
    model: "smartphone",
    color: "#06B6D4",
  },
  {
    id: 5,
    name: "AirPods Max",
    price: "$549",
    rating: 4.7,
    category: "Audio",
    model: "headphones",
    color: "#EF4444",
  },
];

export const ProductShowcase = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const { data: session, status } = useSession();
  const [toast, setToast] = useState(false);
  const userEmail = session?.user?.email;
  const renderModel = (product: any) => {
    switch (product.model) {
      case "laptop":
        return <AlienwareLaptop scale={1} position={[0, -2, 0]} />;
      case "smartphone":
        return <Iphone12ProBlue scale={5} position={[0, -2, 0]} />;
      case "headphones":
        return <JBLHeadphones scale={10} position={[0, -2, 0]} />;
      default:
        return <ProductModel color={product.color} />;
    }
  };
  async function setWish() {
    if (status != "authenticated") {
      return alert("You should be logged in!");
    }
    const response = await fetch("/api/wishlist", {
      method: "POST",
      body: JSON.stringify({
        id: products[selectedProduct].id,
        email: session?.user?.email,
        action: "add",
      }),
    });
  }

  async function addToCart(email: string) {
    if (status != "authenticated") {
      return alert("You should be logged in!");
    }
    const res = await fetch("/api/checkoutItems", {
      method: "POST",
      body: JSON.stringify({ email, productId: products[selectedProduct].id }),
    });
    setToast(true);
    setTimeout(() => setToast(false), 1000);
  }

  return (
    <section className="py-20 bg-black px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Featured Products
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our latest tech products in immersive 3D. Rotate, zoom, and
            interact with every detail.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Viewer */}
          <div className="relative">
            <div className="h-96 rounded-2xl overflow-hidden bg-white backdrop-blur-md border border-white/40 shadow-xl shadow-slate-200/20">
              <Canvas
                camera={{ position: [0, 0, 5] }}
                shadows
                gl={{ alpha: true, antialias: true }}
                style={{ cursor: "grab" }}
              >
                <ambientLight intensity={0.7} color="#f8fafc" />
                <directionalLight
                  position={[10, 10, 10]}
                  intensity={1.2}
                  color="#ffffff"
                  castShadow
                />
                <pointLight
                  position={[-8, 8, 8]}
                  intensity={0.5}
                  color="#e0f2fe"
                />
                <pointLight
                  position={[8, -8, -8]}
                  intensity={0.3}
                  color="#fef3c7"
                />

                {renderModel(products[selectedProduct])}

                <OrbitControls
                  enableZoom={true}
                  autoRotate
                  autoRotateSpeed={0.8}
                  enableDamping={true}
                  dampingFactor={0.05}
                />

                <fog attach="fog" args={["#f8fafc", 8, 15]} />
              </Canvas>
            </div>

            <div className="absolute top-4 left-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Interactive 3D
              </Badge>
            </div>

            <div className="absolute bottom-4 right-4 text-dark text-sm">
              Click and drag to rotate
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="flex gap-2 mb-6">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedProduct(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    selectedProduct === index
                      ? "bg-blue-500 w-8"
                      : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            <div className="space-y-4">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                {products[selectedProduct].category}
              </Badge>

              <h3 className="text-4xl font-bold text-white">
                {products[selectedProduct].name}
              </h3>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-white">
                  {products[selectedProduct].price}
                </span>
                <div className="flex items-center text-yellow-400">
                  <span className="text-lg">★</span>
                  <span className="ml-1 text-white">
                    {products[selectedProduct].rating}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                Experience cutting-edge technology with premium build quality
                and innovative features. Every detail crafted for perfection.
              </p>

              <div className="flex-row md:flex gap-4 pt-6">
                <Button
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 w-auto  mb-4 md:mb-0 "
                  onClick={() =>
                    userEmail
                      ? addToCart(userEmail)
                      : alert("Please login first!")
                  }
                >
                  <ShoppingCart className="mr-2 h-5 md:w-5" />
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  className="border-white/30 hover:text-white hover:bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm mr-4 md:mr-0"
                >
                  <Eye className="mr-2 h-5 w-5" />
                  Quick View
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="border-white/30 hover:text-white hover:bg-white/10 rounded-full backdrop-blur-sm"
                  onClick={() =>
                    userEmail ? setWish() : alert("Please login first!")
                  }
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="toast-simple"
        className={`fixed ${
          toast ? "bottom-[5%]" : "-bottom-[10%]"
        } left-1/2 transform -translate-x-1/2 transition-all ease-in-out duration-300 flex items-center whitespace-nowrap w-full max-w-min p-4 space-x-4 divide-x rounded-lg shadow-md text-gray-300 divide-gray-700 space-x bg-gradient-to-r from-gray-900 to-black border border-gray-800 backdrop-blur-sm z-50`}
        role="alert"
      >
        <BsCart className="text-gray-400" />
        <div className="pl-4 text-sm font-normal">Item added to cart.</div>
      </div>
    </section>
  );
};

export default ProductShowcase;
