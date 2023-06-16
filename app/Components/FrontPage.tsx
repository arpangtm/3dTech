// "use client"

import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useSession, getSession } from "next-auth/react";

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../api/auth/[...nextauth]/route";

const sample_data = [
  {
    img: "/myfuto.jpg",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 1,
  },
  {
    img: "/myfuto.jpg",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 2,
  },
  {
    img: "/myfuto.jpg",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 3,
  },
  {
    img: "/myfuto.jpg",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 4,
  },
  {
    img: "/myfuto.jpg",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 5,
  },
  {
    img: "/myfuto.jpg",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 5,
  },
  {
    img: "/myfuto.jpg",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 7,
  },
  {
    img: "/myfuto.jpg",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 8,
  },
  {
    img: "/myfuto.jpg",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 9,
  },
  {
    img: "/myfuto.jpg",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 10,
  },
];

const hot_picks = [
  {
    img: "/myfuto.jpg",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 1,
  },
  {
    img: "/myfuto.jpg",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 2,
  },
  {
    img: "/myfuto.jpg",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 3,
  },
];

const Latest = [
  {
    img: "/myfuto.jpg",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 1,
  },
  {
    img: "/myfuto.jpg",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 2,
  },
  {
    img: "/myfuto.jpg",
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eum nulla consectetur quaerat ab id vel atque tempora necessitatibus corporis ea, dolorem soluta velit non est iste tenetur distinctio enim! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur dicta error voluptates molestias cupiditate quis quam delectus neque! Vel et voluptas ex totam, ipsa sapiente facere assumenda corporis inventore!Nemo aut velit quisquam iure id nobis explicabo fugit sit voluptatum, esse pariatur minima saepe dolor aspernatur unde architecto repellendus eveniet. Ea totam sint sit, quae aut quo cum beatae.At sapiente sequi, natus quas, ducimus tempora unde illo atque praesentium fugit porro omnis. Expedita ratione cum, est distinctio vitae debitis non quam impedit commodi voluptate nesciunt maiores, fugiat odit!Eligendi numquam dolorum velit sed recusandae nihil itaque excepturi necessitatibus quisquam similique culpa voluptatibus animi veniam delectus pariatur tempore odio ratione non, incidunt possimus voluptate vero? Quis dolorem rem iusto!",
    stars: 5,
    price: 300,
    id: 3,
  },
];

export default function FrontPage() {
  const [wishlist, setList] = useState<Array<Number>>();
  // const session = await getServerSession(authOptions);
  const { data: session, status } = useSession();
  console.log(session)
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
        const { list } = await response.json();
        setList(list);
        console.log(list);
      }
    })();
  }, [status]);

  return (
    <section className="mx-5 sm:mx-16 md:mx-24 lg:mx-28">
      <div>
        <h1 className="font-bold text-3xl">Today's Hot Picks🔥 </h1>
        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3">
          {hot_picks.map((item) => {
            console.log(item.id);
            console.log(wishlist);

            return (
              <Card
                wish={wishlist?.includes(item.id) ? true : false}
                img={item.img}
                name={item.name}
                desc={item.desc}
                stars={item.stars}
                price={item.price}
                id={item.id}
                key={item.id}
              ></Card>
            );
          })}
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
                key={item.id}
              ></Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
