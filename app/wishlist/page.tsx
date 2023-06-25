"use client";
import productInfo from "@/mongoose_model/productInfo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

function Wishlist() {
  const [products, setProducts] = useState([]);
  const { data: session, status } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    (async function () {
      if (status == "authenticated") {
        const list = await getWishlist();
        const product = await getProducts(list);
      }
    })();
  }, [status]);

  async function getProducts(list: any) {
    const response = await fetch(`/api/productInfo?id=${list.toString()}`, {
      method: "GET",
    });

    const data = await response.json();
    setProducts(data.data);
    return data;
  }

  async function getWishlist() {
    const response = await fetch(
      `/api/wishlist?email=${session?.user?.email}`,
      {
        method: "GET",
      }
    );
    const { list } = await response.json();
    return list;
  }

  async function deleteProduct(id: Number) {
    const response = await fetch("/api/wishlist", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        email: session?.user?.email,
        action: "remove",
      }),
    });
    const data = await response.json();
    getProducts(data.wishlist);
  }

  if (status == "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <section>
      <div className="border-gray-800 border-2 mx-2 md:mx-10 lg:mx-2 xl:mx-40 rounded-md">
        <div className="text-3xl text-center font-bold">Wishlist</div>
        <div>
          {products.map(
            (item: {
              img: string;
              productId: number;
              productName: string;
              price: number;
            }) => {
              return (
                <div
                  // href={`/product?id=${item.productId}`}
                  className="flex justify-around items-center my-10 p-5 gap-5 bg-gray-800 w-full"
                >
                  <div className="w-80">
                    <Image
                      alt="Product"
                      src={item.img || "/placeholderimg.png"}
                      height={300}
                      width={300}
                      className="h-80 w-auto"
                    ></Image>
                  </div>
                  <div
                    className="flex flex-col gap-5 cursor-pointer"
                    onClick={() => push(`/product?id=${item.productId}`)}
                  >
                    <h1 className="font-bold text-xl md:text-2xl">
                      Item Name: {item.productName}
                    </h1>
                    <h1 className="font-bold text-lg md:text-xl">
                      Price: ${item.price}
                    </h1>
                    <a
                      href={`/product?id=${item.productId}`}
                      className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600  hover:border-2 dark:hover:border-blue-700 hover:bg-transparent dark:focus:ring-blue-800"
                    >
                      Add to cart
                    </a>
                  </div>
                  <div className="text-red-600 text-lg md:text-3xl w-max flex flex-col gap-5 font-bold">
                    <div onClick={() => deleteProduct(item.productId)}>
                      <FaTrash className="cursor-pointer"></FaTrash>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
export default Wishlist;
