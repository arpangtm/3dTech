"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Viewer from "../Components/3dViewer";
import { BsFillCartFill } from "react-icons/bs";

function product() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const [productData, setData] = useState({
    productName: "",
    productInfo: "",
    aboutProduct: "",
    productReviews: [{ userId: null, stars: null, review: "" }],
    specs: "",
  });
  console.log(productData.specs);
  console.log(productId);
  useEffect(() => {
    (async function () {
      const response = await fetch(
        `/api/productInfo?id=` + encodeURIComponent(`${productId}`),
        {
          method: "GET",
        }
      );
      const { data } = await response.json();
      console.log(data);
      setData(data);
    })();
  }, []);

  const [active, setActive] = useState("info");
  return (
    <div className="mt-12 mx-2 sm:mx-12 lg:mx-32">
      <h1 className="text-lg sm:text-xl lg:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {productData?.productName}
      </h1>
      <ul className="mt-12 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="mr-2" onClick={() => setActive("info")}>
          <a
            href="#"
            aria-current="page"
            className={`${
              active === "info" ? "text-blue-500 bg-gray-800" : ""
            } inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
          >
            Info
          </a>
        </li>
        <li className="mr-2" onClick={() => setActive("about")}>
          <a
            href="#"
            className={`${
              active === "about" ? "text-blue-500 bg-gray-800" : ""
            } inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
          >
            About Product
          </a>
        </li>
        <li className="mr-2" onClick={() => setActive("reviews")}>
          <a
            href="#"
            className={`${
              active === "reviews" ? "text-blue-500 bg-gray-800" : ""
            } inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
          >
            Reviews
          </a>
        </li>
        <li className="mr-2" onClick={() => setActive("features")}>
          <a
            href="#"
            className={`${
              active === "features" ? "text-blue-500 bg-gray-800" : ""
            } inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
          >
            Specification
          </a>
        </li>
      </ul>

      <div className="flex flex-col-reverse md:flex-row space-x-0 lg:space-x-6">
        <div className="w-1/2">
          <p
            className={`${
              active === "info" ? "block " : "hidden"
            } transition mt-12 whitespace-pre-line`}
          >
            {productData.productInfo}
          </p>
          <p
            className={`${
              active === "about" ? "block " : "hidden"
            } transition mt-12 whitespace-pre-line`}
          >
            {productData.aboutProduct}
          </p>
          <div
            className={`${
              active === "reviews" ? "block " : "hidden"
            } transition mt-12`}
          >
            {productData.productReviews.map((review) => {
              return (
                <div>
                  <h2 className="text-lg font-bold">{review.userId}</h2>
                  <p>Stars:{review.stars}</p>
                  <p>{review.review}</p>
                </div>
              );
            })}
          </div>
          <div
            className={`${
              active === "features" ? "block " : "hidden"
            } transition mt-12 whitespace-pre-line`}
          >
            {`${productData.specs}`}
          </div>
        </div>
        <div className="rounded-r-md">
          <Viewer></Viewer>
          <div className="mt-14 flex space-x-14">
            <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
              {" "}
              Buy Now
            </button>
            <button className="flex space-x-5 items-center spbg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              <span>Add To Cart </span>
              <BsFillCartFill></BsFillCartFill>
            </button>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              {" "}
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default product;
