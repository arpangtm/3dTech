import { NextRequest } from "next/server";
import cartCollection from "@/mongoose_model/cart";
export async function POST(req: NextRequest) {
  const { email, productId, action } = await req.json();
  const dbaction = action == "remove" ? "$pull" : "$push";
  const res = await cartCollection
    .findOneAndUpdate(
      { email, cart: { $exists: true } },
      { [dbaction]: { cart: productId } },
      { upsert: true, new: true }
    )
    .exec();
  return new Response(JSON.stringify({ data: res }));
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const response = await cartCollection.findOne({ email });
  return new Response(JSON.stringify({ data: response }));
}
