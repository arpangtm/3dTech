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
      <div className="border border-gray-300 dark:border-gray-700 mx-4 md:mx-10 lg:mx-4 xl:mx-32 rounded-xl shadow-xl bg-gray-50 dark:bg-gray-900 p-8">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white">
          📝 Wishlist
        </h2>
        <div className="space-y-10">
          {products.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="w-full lg:w-1/3 flex justify-center">
                <Image
                  alt="Product"
                  src={item.img || "/placeholderimg.png"}
                  height={250}
                  width={250}
                  className="rounded-lg object-cover shadow-sm"
                />
              </div>

              <div
                className="flex flex-col gap-3 text-center lg:text-left flex-grow cursor-pointer"
                onClick={() => push(`/product?id=${item.productId}`)}
              >
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  {item.productName}
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  ${item.price}
                </p>
                <div className="flex gap-10 items-center">

                <a
                  href={`/product?id=${item.productId}`}
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-md px-6 py-3 text-sm dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition-all w-fit"
                >
                  Add to cart
                </a>
                <div className="text-red-600 text-2xl font-bold">
                <button
                  onClick={() => deleteProduct(item.productId)}
                  aria-label="Delete item"
                  className="hover:text-red-800 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
                </div>
              </div>

              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Wishlist;
