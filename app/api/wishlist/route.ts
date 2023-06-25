import { NextRequest, NextResponse } from "next/server";
import dbConnection from "../../../lib/mongoose/index";
import wishlist from "../../../mongoose_model/wishlist";
import { Result } from "postcss";

interface waitlist_post {
  email: String;
  id: Number;
  action: "add" | "remove";
}

export async function POST(req: NextRequest) {
  const { email, id, action }: waitlist_post = await req.json();
  await dbConnection();

  if (action === "add") {
    const user = await wishlist.findOne({ email });
    if (user) {
      const result = await wishlist.findOneAndUpdate(
        { email: email },
        { $push: { wishlist: id } }
      );
      return new Response(JSON.stringify(result));
    } else {
      const result = await wishlist.create({ email, wishlist: [id] });
      return new Response(JSON.stringify(result));
    }
  } else if (action === "remove") {
    const result = await wishlist.findOneAndUpdate(
      { email: email },
      { $pull: { wishlist: id } },
      { new: true }
    );
    return new Response(JSON.stringify(result));
  }
}

export async function GET(req: NextRequest) {
  const param: string | null = await req.nextUrl.searchParams.get("email");
  await dbConnection();
  const result = await wishlist.findOne({ email: param });
  return NextResponse.json({ list: result.wishlist });
}
