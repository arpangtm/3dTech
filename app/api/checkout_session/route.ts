import getStripe from "@/lib/mongoose/Stripe/payment";
import Stripe from "stripe";
import { NextRequest } from "next/server";
import { loadStripe } from "@stripe/stripe-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  const { amount, url, productList } = await req.json();

  const line_items = productList.map((item: any) => {
    return {
      price_data: {
        currency: "usd",

        unit_amount: item.price * 100,
        product_data: {
          name: item.productName,
          description: item.productName,
          images: [item.img],
        },
      },

      quantity: 1,
    };
  });
  try {
    const params: Stripe.Checkout.SessionCreateParams = {
      line_items,
      mode: "payment",
      success_url: `${url}/paymentSuccess`,
      cancel_url: `${url}/checkout`,
    };
    const checkoutSession = stripe.checkout.sessions.create(params);
    const resp = await checkoutSession;
    return new Response(JSON.stringify({ url: resp.url }));
  } catch (err) {
    console.log("Error", err);
  }
}
