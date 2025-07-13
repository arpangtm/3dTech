import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton";

interface Card_Prop {
  children?: never[];
  wish: boolean;
  img: string;
  desc: string;
  name: string;
  stars: number;
  price: number;
  toast: any;
  id: number;
}

export default function Card({
  wish,
  img,
  desc,
  name,
  stars,
  price,
  toast,
  id,
}: Card_Prop) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(wish);
  }, [wish]);

  const { data: session, status } = useSession();

  async function setWish() {
    if (status != "authenticated") {
      return alert("You should be logged in!");
    }
    setFav(fav ? false : true);
    const response = await fetch("/api/wishlist", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        email: session?.user?.email,
        action: fav ? "remove" : "add",
      }),
    });
  }

  async function addToCart(email: string, id: number) {
    if (status != "authenticated") {
      return alert("You should be logged in!");
    }
    const res = await fetch("/api/checkoutItems", {
      method: "POST",
      body: JSON.stringify({ email, productId: id }),
    });
    toast(true);
    setTimeout(() => toast(false), 1000);
  }

  return (
    <div className="w-full max-w-sm rounded-xl shadow-md bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/30 hover:translate-y-[-5px]">
      <div className="relative overflow-hidden rounded-t-xl group">
        <a href={`/product?id=${id}`} className="block">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          <img
            height={300}
            width={300}
            className="p-6 h-80 w-full object-contain transition-transform duration-500 group-hover:scale-105"
            src={img}
            alt="product image"
          />
        </a>

        <button
          onClick={() => setWish()}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-110 border border-gray-200 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill={fav ? "#ef4444" : "#6b7280"}
            className="bi bi-heart-fill transition-colors duration-300 hover:fill-red-500"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg>
        </button>
      </div>
      <div className="px-6 py-5">
        <a href={`/product?id=${id}`} className="block group">
          <h5 className="text-xl font-semibold tracking-tight text-gray-800 mb-2 line-clamp-2 group-hover:text-black transition-colors duration-300">
            {name}
          </h5>
        </a>
        <div className="flex items-center mt-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                aria-hidden="true"
                className={`w-5 h-5 ${
                  i < stars ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>{`${i + 1} star`}</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-gradient-to-r from-blue-500 to-cyan-500 text-white ml-3">
            {`${stars}.0`}
          </span>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">{`$${price}`}</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <a
              href={`/product?id=${id}`}
              className="flex-1 text-gray-700 border border-gray-300 focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center transition-all duration-300 hover:bg-gray-50 hover:shadow-md hover:shadow-gray-200/50 focus:ring-blue-300 group"
            >
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 group-hover:animate-pulse"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                See In 3D
              </span>
            </a>

            <button
              onClick={() => {
                session ? addToCart(session?.user?.email!, id): alert("Must Login first!");
              }}
              className="flex-1 text-white focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:shadow-md hover:shadow-blue-200/50 focus:ring-blue-300 border-0"
            >
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to cart
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
