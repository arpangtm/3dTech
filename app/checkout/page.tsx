"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import getStripe from "@/lib/mongoose/Stripe/payment";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CreditCard,
  Lock,
  ShoppingCart,
  Trash2,
} from "lucide-react";

const sumPrices = (list: any) => {
  let total = 0;
  list.forEach((element: { price: number }) => {
    total += element.price;
  });
  return total;
};

function Checkout() {
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
    const addedPrice = sumPrices(list);
    setProducts(list);
    setCost(addedPrice + 0.07 * addedPrice);
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
          `/api/checkoutItems?email=${session?.user?.email}`,
          {
            method: "GET",
          }
        );
        const { data } = await response.json();

        const list = await fetchItemsFromId(data.cart);
        const addedPrice = sumPrices(list);
        setProducts(list);
        setCost(addedPrice + 0.07 * addedPrice);
        setDataFetched(true);
      }
    })();
  }, [status]);
  if (status == "loading" || !dataFetched) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-2">
            Checkout
          </h1>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Your Items ({productList.length})
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {productList.map((item) => (
                  <div
                    key={item.productId}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.img || "/placeholderimg.png"}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                          {item.productName}
                        </h3>
                        <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() =>
                          removeFromCart(session?.user?.email, item.productId)
                        }
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}

                {productList.length === 0 && (
                  <div className="p-12 text-center">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Order Summary
                </h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ${sumPrices(productList)}
                  </span>
                </div>

                {/* Tax */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold text-gray-900">
                    ${(sumPrices(productList) * 0.07).toFixed(2)}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-900">{"Free"}</span>
                </div>

                <hr className="border-gray-200" />

                {/* Total */}
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-2xl bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    ${totalCost.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!productList.length || checkoutState === "loading"}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {checkoutState === "loading" ? (
                    <>
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : checkoutState === "success" ? (
                    <>
                      <div className="w-5 h-5 text-green-400">✓</div>
                      Order Placed!
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Secure Checkout
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Security Badge */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                    <Lock className="w-4 h-4" />
                    Your payment info is secure and encrypted
                  </p>
                </div>
              </div>
            </div>

            {/* Free Shipping Notice */}
            {totalCost < 100 && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>💡 Tip:</strong> Add ${(100 - totalCost).toFixed(2)}{" "}
                  more to qualify for free shipping!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
