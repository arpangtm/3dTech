"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import getStripe from "@/lib/mongoose/Stripe/payment";
import { useRouter } from "next/navigation";

const sumPrices = (list: any) => {
  let total = 0;
  list.forEach((element: { price: number }) => {
    total += element.price;
  });
  return total;
};

function checkout() {
  const { push } = useRouter();
  const [productList, setProducts] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [totalCost, setCost] = useState(Number);
  const [checkoutState, setcheckoutState] = useState("static");
  const { data: session, status } = useSession();

  async function handleSubmit() {
    setcheckoutState("loading");
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      body: JSON.stringify({
        amount: totalCost,
        productList,
        url: window.origin,
      }),
    });
    const data = await checkoutSession.json();
    setcheckoutState("static");
    push(data.url);
  }

  const removeFromCart = async (
    email: string | null | undefined,
    productId: number
  ) => {
    const response = await fetch("/api/checkoutItems?email=", {
      method: "POST",
      body: JSON.stringify({
        email,
        productId,
        action: "remove",
      }),
    });
    const { data } = await response.json();
    const list = await fetchItemsFromId(data.cart);
    setProducts(list);
    setCost(sumPrices(list));
  };

  const fetchItemsFromId = async (productIds: Array<Number>) => {
    const response = await fetch(`/api/productInfo?id=${productIds}`);
    const list = await response.json();
    return list.data;
  };

  useEffect(() => {
    (async function () {
      if (status == "authenticated") {
        let response = await fetch(
          `/api/checkoutItems?email=${session.user?.email}`,
          {
            method: "GET",
          }
        );
        const { data } = await response.json();

        const list = await fetchItemsFromId(data.cart);
        setProducts(list);
        setCost(sumPrices(list));
        setDataFetched(true);
      }
    })();
  }, [status]);
  if (status == "loading" || !dataFetched) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Checkout</h1>
      <div className="flex flex-1 flex-col md:flex-row justify-center gap-8 mt-10">
        <div className="border-gray-800 border-2 p-5 mb-36">
          {productList.map(
            (item: {
              img: string;
              productName: string;
              price: number;
              productId: number;
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
                      className="h-36 w-auto"
                    ></Image>
                  </div>
                  <div
                    className="flex flex-col gap-5 cursor-pointer"
                    //   onClick={() => push(`/product?id=${item.productId}`)}
                  >
                    <h1 className="font-bold text-xl md:text-2xl">
                      Item Name: {item.productName}
                    </h1>
                    <h1 className="font-bold text-lg md:text-xl">
                      Price: ${item.price}
                    </h1>
                  </div>
                  <div className="text-red-600 text-lg md:text-3xl w-max flex flex-col gap-5 font-bold">
                    {/* <div onClick={() => deleteProduct(item.productId)}> */}
                    <div
                      onClick={() =>
                        removeFromCart(session?.user?.email, item.productId)
                      }
                    >
                      <FaTrash className="cursor-pointer"></FaTrash>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        <div className=" max-h-min">
          <div className="max-h-min fixed bottom-0 bg-black w-full md:relative border-gray-800 border-2 p-5 flex justify-center items-center flex-col gap-5">
            <h1 className="text-2xl font-bold">
              Total Items:{productList.length}
            </h1>
            <h1 className="text-2xl font-bold">Total Cost: ${totalCost}</h1>
            <button
              type="submit"
              onClick={() => handleSubmit()}
              className="bg-orange-500 py-2 px-3 max-w-min rounded-lg flex text-center items-center disabled:opacity-25"
              disabled={!productList.length ? true : false}
            >
              {checkoutState == "loading" ? (
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                ""
              )}
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkout;
