"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useSession } from "next-auth/react";
import { BsCart } from "react-icons/bs";

const sample_data = [
  {
    img: "/placeholderimg.png",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 11,
  },
  {
    img: "/placeholderimg.png",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 12,
  },
  {
    img: "/placeholderimg.png",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 13,
  },
];

const Latest = [
  {
    img: "/placeholderimg.png",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 8,
  },
  {
    img: "/placeholderimg.png",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 9,
  },
  {
    img: "/placeholderimg.png",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 10,
  },
];

export default function FrontPage() {
  const [wishlist, setList] = useState<Array<Number>>();
  const [hotpicks, setHotpicks] = useState([]);
  const [toast, createToast] = useState(false);
  const { data: session, status } = useSession();
  // const session = useSession();
  useEffect(() => {
    (async function () {
      if (status === "authenticated") {
        const response = await fetch(
          "/api/wishlist?email=" +
            encodeURIComponent(`${session?.user?.email}`),
          {
            method: "GET",
          }
        );
        try {
          const { list } = await response.json();
          setList(list);
        } catch {}
      }
      const products = await fetch("/api/productInfo?id=1,2,3,5,6,7", {
        method: "GET",
      });
      const { data } = await products.json();
      setHotpicks(data);
    })();
  }, [status]);

  if (status == "loading") {
    return <h1>Loading..</h1>;
  }

  return (
    <section
      id="products"
      className="relative pt-16 pb-24 px-5 sm:px-16 md:px-24 lg:px-28 bg-black min-h-screen"
    >
      {/* Subtle particle overlay for transition */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.random() * 2 + 0.5;
          const speed = Math.random() * 60 + 30;
          const delay = Math.random() * 5;

          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor:
                  i % 3 === 0
                    ? "rgba(40, 40, 45, 0.5)"
                    : i % 3 === 1
                    ? "rgba(30, 30, 35, 0.5)"
                    : "rgba(20, 20, 25, 0.5)",
                boxShadow: `0 0 ${size * 2}px ${size / 2}px ${
                  i % 3 === 0
                    ? "rgba(40, 40, 45, 0.3)"
                    : i % 3 === 1
                    ? "rgba(30, 30, 35, 0.3)"
                    : "rgba(20, 20, 25, 0.3)"
                }`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${speed}s infinite linear ${delay}s`,
                opacity: 0.1 + Math.random() * 0.2,
              }}
            />
          );
        })}
      </div>

      {/* Content with dark theme */}
      <div className="relative z-10">
        <h1 className="font-bold text-3xl mb-6 inline-block bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent shadow-sm">
          Today's Hot Picks🔥
        </h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3">
          {hotpicks.map(
            (item: {
              id: number;
              productId: number;
              img: string;
              productName: string;
              productInfo: string;
              price: number;
            }) => {
              return (
                <Card
                  wish={wishlist?.includes(item.productId) ? true : false}
                  img={item.img || "/placeholderimg.png"}
                  name={item.productName}
                  desc={item.productInfo}
                  stars={5}
                  price={item.price}
                  id={item.productId}
                  toast={createToast}
                  key={item.id}
                ></Card>
              );
            }
          )}
        </div>
      </div>

      <div className="mt-16 relative z-10">
        <h1 className="font-bold text-3xl mb-6 inline-block bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent shadow-sm">
          Latest
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
          {Latest.map((item) => {
            return (
              <Card
                wish={wishlist?.includes(item.id) ? true : false}
                img={item.img}
                name={item.name}
                desc={item.desc}
                stars={item.stars}
                price={item.price}
                id={item.id}
                toast={createToast}
                key={item.id}
              ></Card>
            );
          })}
        </div>
      </div>

      <div className="mt-16 relative z-10">
        <h1 className="font-bold text-3xl mb-6 inline-block bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-transparent shadow-sm">
          You Might Also Like
        </h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
          {sample_data.map((item) => {
            return (
              <Card
                wish={wishlist?.includes(item.id) ? true : false}
                img={item.img}
                name={item.name}
                desc={item.desc}
                stars={item.stars}
                price={item.price}
                id={item.id}
                toast={createToast}
                key={item.id}
              ></Card>
            );
          })}
        </div>
      </div>

      {/* Toast notification with dark theme */}
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
}
