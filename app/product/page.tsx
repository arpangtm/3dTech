"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Viewer from "../Components/3dViewer";
import { BsFillCartFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { BsCart } from "react-icons/bs";
import ProductSkeletonDemo from "./loading";

async function addToWishList(
  email: any,
  id: number | null,
  createToast: Function,
  status: string
) {
  if (status != "authenticated") {
    return alert("You should be logged in!");
  }
  const response = await fetch("/api/wishlist", {
    method: "POST",
    body: JSON.stringify({
      id: id,
      email,
      action: "add",
    }),
  });
  if (response) {
    createToast({ visible: true, type: "wishlist" });
    setTimeout(() => createToast({ visible: false }), 1000);
  }
}

async function addToCart(
  email: any,
  id: number | null,
  createToast: Function,
  status: string
) {
  if (status != "authenticated") {
    return alert("You should be logged in!");
  }
  const res = await fetch("/api/checkoutItems", {
    method: "POST",
    body: JSON.stringify({ email, productId: id }),
  });
  if (res) {
    createToast({ visible: true, type: "cart" });
    setTimeout(() => createToast({ visible: false }), 1000);
  }
}

function Product() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [toast, createToast] = useState({ visible: false, type: undefined });
  const [fetched, setFetch] = useState(false);
  const [active, setActive] = useState("info");
  const { push } = useRouter();
  const productId = searchParams.get("id");

  const [productData, setData] = useState({
    productName: "",
    productInfo: "",
    aboutProduct: "",
    productReviews: [{ userId: null, stars: null, review: "" }],
    specs: "",
  });

  useEffect(() => {
    (async function () {
      const response = await fetch(
        `/api/productInfo?id=` + encodeURIComponent(`${productId}`),
        {
          method: "GET",
        }
      );
      const { data } = await response.json();
      if (data.length == 0) {
        alert("This product is currently unavailable!");
        push("/");
      } else {
        setData(data[0]);
        setFetch(true);
      }
    })();
  }, []);

  if (!fetched) {
    return <ProductSkeletonDemo />;
  }
  return (
    <div className="mt-12 mx-2 sm:mx-12 lg:mx-32">
      <h1 className="text-lg sm:text-xl lg:text-5xl font-semibold tracking-tight text-slate-800">
        {productData?.productName}
      </h1>

      <ul className="mt-12 flex flex-wrap text-sm font-medium text-center border-b border-slate-200 text-slate-600">
        <li className="mr-2" onClick={() => setActive("info")}>
          <a
            href="#"
            aria-current="page"
            className={`${
              active === "info"
                ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                : ""
            } inline-block p-4 rounded-t-lg hover:bg-slate-50 hover:text-slate-800 transition-all duration-200`}
          >
            Info
          </a>
        </li>
        <li className="mr-2" onClick={() => setActive("about")}>
          <a
            href="#"
            className={`${
              active === "about"
                ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                : ""
            } inline-block p-4 rounded-t-lg hover:bg-slate-50 hover:text-slate-800 transition-all duration-200`}
          >
            About Product
          </a>
        </li>
        <li className="mr-2" onClick={() => setActive("reviews")}>
          <a
            href="#"
            className={`${
              active === "reviews"
                ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                : ""
            } inline-block p-4 rounded-t-lg hover:bg-slate-50 hover:text-slate-800 transition-all duration-200`}
          >
            Reviews
          </a>
        </li>
        <li className="mr-2" onClick={() => setActive("features")}>
          <a
            href="#"
            className={`${
              active === "features"
                ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                : ""
            } inline-block p-4 rounded-t-lg hover:bg-slate-50 hover:text-slate-800 transition-all duration-200`}
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
            } transition mt-12 whitespace-pre-line text-slate-700 leading-relaxed`}
          >
            {productData.productInfo}
          </p>
          <p
            className={`${
              active === "about" ? "block " : "hidden"
            } transition mt-12 whitespace-pre-line text-slate-700 leading-relaxed`}
          >
            {productData.aboutProduct}
          </p>
          <div
            className={`${
              active === "reviews" ? "block " : "hidden"
            } transition mt-12 space-y-6`}
          >
            {productData.productReviews.map((review) => {
              return (
                <div
                  key={review.userId}
                  className="p-4 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <h2 className="text-lg font-bold text-slate-800">
                    {review.userId}
                  </h2>
                  <p className="text-slate-600 font-medium">
                    Stars: {review.stars}
                  </p>
                  <p className="text-slate-700 mt-2">{review.review}</p>
                </div>
              );
            })}
          </div>
          <div
            className={`${
              active === "features" ? "block " : "hidden"
            } transition mt-12 whitespace-pre-line text-slate-700 leading-relaxed`}
          >
            {`${productData.specs}`}
          </div>
        </div>

        <div className="rounded-r-md">
          <Viewer productId={Number(productId)}></Viewer>
          <div className="mt-14 flex space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
              Buy Now
            </button>
            <button
              onClick={() =>
                addToCart(
                  session?.user?.email,
                  Number(productId),
                  createToast,
                  status
                )
              }
              className="flex space-x-2 items-center bg-transparent hover:bg-blue-600 text-blue-600 font-semibold hover:text-white py-3 px-6 border border-blue-600 hover:border-transparent rounded-lg transition-all duration-200"
            >
              <span>Add To Cart</span>
              <BsFillCartFill />
            </button>
            <button
              onClick={() =>
                addToWishList(
                  session?.user?.email,
                  Number(productId),
                  createToast,
                  status
                )
              }
              className="bg-transparent hover:bg-blue-600 text-blue-600 font-semibold hover:text-white py-3 px-6 border border-blue-600 hover:border-transparent rounded-lg transition-all duration-200"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      <div
        id="toast-simple"
        className={`fixed ${
          toast.visible ? "bottom-[5%]" : "-bottom-[10%]"
        } left-1/2 transition-all ease-in-out duration-300 flex items-center whitespace-nowrap w-full max-w-min p-4 space-x-4 rounded-lg shadow-lg text-slate-700 bg-white border border-slate-200`}
        role="alert"
      >
        {toast.visible && toast.type == "cart" ? (
          <BsCart className="text-blue-600" />
        ) : (
          <AiFillHeart className="text-red-500" />
        )}
        <div className="pl-4 text-sm font-normal">
          Item added to {toast.type}.
        </div>
      </div>
    </div>
  );
}

export default Product;
