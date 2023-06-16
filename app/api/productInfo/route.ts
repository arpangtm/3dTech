import dbConnection from "@/lib/mongoose";
import productInfo from "../../../mongoose_model/productInfo";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const productId = await req.nextUrl.searchParams.get("id");
  console.log("DB connecting...", productId);
  await dbConnection();
  const result: any = await productInfo.findOne({ productId });
  console.log(result.specs);
  return new Response(JSON.stringify({ data: result }));
}
