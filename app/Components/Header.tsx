
"use client";

import { useEffect, useState, useRef } from "react";
import { isMobile } from "react-device-detect";
import { FiArrowDown, FiInfo } from "react-icons/fi";
import { RiComputerLine } from "react-icons/ri";
import { MdOutlineSmartphone, MdHeadphones, MdSmartDisplay } from "react-icons/md";
import { GiOfficeChair } from "react-icons/gi";
import { SiAsus } from "react-icons/si";
import { IoClose } from "react-icons/io5";

export default function Header() {
  const [modelState, setmodelState] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const headerRef = useRef(null);

  // Handle scroll position updates
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const clientId = localStorage.getItem("clientId");
      !clientId
        ? localStorage.setItem("clientId", `${Math.random()}`)
        : setmodelState(false);
      
      if (modelState) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }

      // Handle scroll events
      const handleScroll = () => {
        setScrollPosition(window.scrollY);
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [modelState]);

  return (
    <>
      {/* Welcome Modal */}
      <div
        id="defaultModal"
        aria-hidden="true"
        className={`${
          modelState ? `flex` : `hidden`
        } fixed justify-center items-center z-50 w-full h-full p-4 backdrop-blur-sm bg-black/80`}
      >
        <div className="w-full max-w-2xl max-h-full transition-all duration-300 ease-in-out transform">
          <div className="rounded-lg shadow-2xl bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-gray-700/30">
            <div className="flex items-start justify-between p-5 border-b rounded-t border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
              <h3 className="text-2xl font-bold text-gray-300 tracking-wide">
                Note From The Creator
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-700 hover:text-white"
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
              <div className="text-base leading-relaxed text-gray-300/80">
                <p className="text-red-500">
                  **Get the Full Fledged Experience of the site in a desktop or
                  laptop with GPU acceleration enabled**{" "}
                </p>
                Hi👋. I am Arpan, creator of this site. This is one of the
                project from by{" "}
                <a className="text-gray-300 hover:text-gray-100" href="https://arpangtm.com.np">
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
              </div>
              <div className="text-base leading-relaxed text-gray-300/80">
                Features to try out!
                <ul className="list-disc">
                  <li>Authentication(Login SignUp)</li>
                  <li>Google OAuth</li>
                  <li>View Products in 3d</li>
                  <li>Putting products to wishlist and checkout list</li>
                  <li>Checking Out (Payment integration with Stripe)</li>
                </ul>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t rounded-b border-gray-700">
              <button
                data-modal-hide="defaultModal"
                type="button"
                className="text-gray-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-6 py-3 text-center bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 focus:ring-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                onClick={() => setmodelState(!modelState)}
              >
                Let's Explore
              </button>
            </div>
            

          </div>
        </div>
      </div>

      {/* Let's Explore Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button 
          onClick={() => setmodelState(!modelState)}
          className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 px-6 py-3 rounded-full font-bold shadow-md border border-gray-700/30 hover:shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center"
        >
          <FiInfo className="mr-2" /> Let's Explore
        </button>
      </div>

      {/* Main Header */}
      <header 
        ref={headerRef}
        className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden ${modelState ? 'overflow-y-hidden' : ''}`}
      >
        {/* Background with gradient and animated particles */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-950 to-black z-0">
          {/* Animated tech particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => {
              const size = Math.random() * 3 + 1;
              const speed = Math.random() * 50 + 20;
              const delay = Math.random() * 5;
              const depth = 0.3 + Math.random() * 0.7; // Parallax depth factor
              
              return (
                <div 
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: i % 3 === 0 ? 'rgba(30, 30, 35, 0.6)' : i % 3 === 1 ? 'rgba(50, 30, 70, 0.5)' : 'rgba(40, 20, 60, 0.5)',
                    boxShadow: `0 0 ${size * 2}px ${size / 2}px ${i % 3 === 0 ? 'rgba(30, 30, 35, 0.4)' : i % 3 === 1 ? 'rgba(50, 30, 70, 0.3)' : 'rgba(40, 20, 60, 0.3)'}`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    transform: `translateY(${scrollPosition * depth * 0.1}px)`,
                    animation: `float ${speed}s infinite linear ${delay}s`,
                    opacity: 0.3 + Math.random() * 0.4,
                    zIndex: Math.floor(depth * 10)
                  }}
                />
              );
            })}
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wider animate-float">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-500 text-shadow-sm">3D Tech</span>
            <span className="text-white/90 text-shadow-sm"> Shop</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300/80 max-w-2xl mx-auto mb-12 animate-pulse-slow text-shadow-sm">
            Experience technology like never before. Explore, interact, and shop in our immersive 3D environment.
          </p>
          
          {/* Animated gadget icons */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {[
              { icon: <MdOutlineSmartphone className="w-full h-full" />, name: "Smartphones", delay: 0 },
              { icon: <RiComputerLine className="w-full h-full" />, name: "Laptops", delay: 0.1 },
              { icon: <MdHeadphones className="w-full h-full" />, name: "Headphones", delay: 0.2 },
              { icon: <GiOfficeChair className="w-full h-full" />, name: "Gaming Chairs", delay: 0.3 },
              { icon: <SiAsus className="w-full h-full" />, name: "ASUS Products", delay: 0.4 },
              { icon: <MdSmartDisplay className="w-full h-full" />, name: "Smart TVs", delay: 0.5 },
            ].map((item, index) => (
              <div 
                key={index}
                className="flex flex-col items-center group"
                style={{
                  animation: `fadeInUp 0.5s ease-out forwards`,
                  animationDelay: `${item.delay}s`,
                  opacity: 0
                }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-gray-300 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4 rounded-2xl backdrop-blur-sm border border-gray-700/30 mb-3 group-hover:scale-110 group-hover:shadow-sm transition-all duration-300">
                  {item.icon}
                </div>
                <span className="text-gray-400 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">{item.name}</span>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <button 
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-purple-900/80 to-indigo-900/80 text-gray-200 rounded-full font-bold tracking-wide transform transition-all duration-300 hover:scale-105 hover:shadow-md animate-pulse-slow relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center">
              Explore in 3D
              <FiArrowDown className="ml-2 animate-bounce" />
            </span>
            <span className="absolute inset-0 bg-gray-700/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
          </button>
        </div>
        
        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-500/50 animate-pulse-slow"
          style={{ opacity: Math.max(0, 1 - scrollPosition / 300) }}
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <FiArrowDown className="animate-bounce" />
        </div>
      </header>
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
