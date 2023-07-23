import dbConnection from "@/lib/mongoose";
import productInfo from "../../../mongoose_model/productInfo";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
export async function GET(req: NextRequest) {
  const productId = await req.nextUrl.searchParams.get("id");
  await dbConnection();
  try {
    const productArray = productId?.split(",").map((item) => Number(item));
    const result = await productInfo.find({ productId: productArray });
    if (!result) {
      throw Error("No product found");
    }
    return new Response(JSON.stringify({ data: result }));
  } catch (err) {
    throw Error("Product not found!");
  }
}
