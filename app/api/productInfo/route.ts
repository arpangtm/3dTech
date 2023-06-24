import dbConnection from "@/lib/mongoose";
import productInfo from "../../../mongoose_model/productInfo";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const productId = await req.nextUrl.searchParams.get("id");
  console.log("DB connecting...", productId);
  await dbConnection();
  try {
    const productArray = productId?.split(",").map((item) => Number(item));
    console.log("Agg", productArray);
    const result = await productInfo.find({ productId: productArray });
    console.log("Product array data: ", result);
    if (!result) {
      throw Error("No product found");
    }
    return new Response(JSON.stringify({ data: result }));
  } catch (err) {
    throw Error("Product not found!");
  }
}
