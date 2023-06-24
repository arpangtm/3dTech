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
  console.log(session);
  useEffect(() => {
    // console.log("Useeffect")
    (async function () {
      console.log("Self Exec Func");
      if (status === "authenticated") {
        console.log(
          "/api/wishlist?email=" + encodeURIComponent(`${session?.user?.email}`)
        );
        const response = await fetch(
          "/api/wishlist?email=" +
            encodeURIComponent(`${session?.user?.email}`),
          {
            method: "GET",
          }
        );
        const products = await fetch("/api/productInfo?id=1,2,3,5,6,7", {
          method: "GET",
        });
        const { data } = await products.json();
        setHotpicks(data);

        try {
          const { list } = await response.json();
          setList(list);
          console.log(list);
        } catch {
          console.log("User has no list");
        }
      }
    })();
  }, [status]);

  if (status == "loading") {
    return <h1>Loading..</h1>;
  }

  return (
    <section className="mx-5 sm:mx-16 md:mx-24 lg:mx-28">
      <div>
        <h1 className="font-bold text-3xl">Today's Hot Picks🔥 </h1>
        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3">
          {hotpicks.map(
            (item: {
              id: number;
              productId: number;
              img: string;
              productName: string;
              productInfo: string;
              price: number;
            }) => {
              console.log(item.id);
              console.log(wishlist);

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
      <div></div>
      <div className="mt-9">
        <h1 className="font-bold text-3xl">Latest</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 ">
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
      <div className="mt-9">
        <h1 className="font-bold text-3xl">You Might Also Like</h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
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
      <div></div>
      <div
        id="toast-simple"
        className={`fixed ${
          toast ? "bottom-[5%]" : "-bottom-[10%]"
        } left-1/2 transition-all ease-in-out duration-300 flex items-center whitespace-nowrap w-full max-w-min p-4 space-x-4 text-gray-900 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-900 dark:divide-gray-700 space-x dark:bg-white`}
        role="alert"
      >
        <BsCart></BsCart>
        <div className="pl-4 text-sm font-normal">Item added to cart.</div>
      </div>
    </section>
  );
}
