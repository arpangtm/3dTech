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
  console.log("Email,Id,action:", email, id, action);
  await dbConnection();

  if (action === "add") {
    console.log("Adding");
    const user = await wishlist.findOne({ email });
    if (user) {
      const result = await wishlist.findOneAndUpdate(
        { email: email },
        { $push: { wishlist: id } }
      );
      console.log(result);
      return new Response(JSON.stringify(result));
    } else {
      const result = await wishlist.create({ email, wishlist: [id] });
      console.log(result);
      return new Response(JSON.stringify(result));
    }
  } else if (action === "remove") {
    console.log("Removing");
    const result = await wishlist.findOneAndUpdate(
      { email: email },
      { $pull: { wishlist: id } },
      { new: true }
    );
    console.log("Removed result", result);
    return new Response(JSON.stringify(result));
  }

  console.log("Data in server: ", id);
}

export async function GET(req: NextRequest) {
  console.log("Get request");
  const param: string | null = await req.nextUrl.searchParams.get("email");
  console.log("Parameter Queried", param);
  await dbConnection();
  const result = await wishlist.findOne({ email: param });
  console.log(result.wishlist);
  return NextResponse.json({ list: result.wishlist });
}
