import { NextRequest, NextResponse } from "next/server";
import dbConnection from "../../../lib/mongoose/index";
import wishlist from "../../../mongoose_model/wishlist";

interface waitlist_post {
  email: String;
  id: Number;
  action:"add" | "remove"
}

export async function POST(req: NextRequest) {
  const { email, id, action }: waitlist_post = await req.json();

  await dbConnection();

  if(action==="add"){
    console.log("Adding")
    const result = await wishlist.findOneAndUpdate(
      { email: email },
      { $push: { wishlist: id } }
    );
    console.log(result);
  }
  else if(action==="remove"){
    console.log("Removing")
    const result = await wishlist.findOneAndUpdate(
      { email: email },
      { $pull: { wishlist: id } }
    );
    console.log(result);  
  }



  console.log("Data in server: ", id);
  return new Response(`${email} ${id}`);
}

export async function GET(req: NextRequest) {
  console.log("Get request");
  const param:string |null = await req.nextUrl.searchParams.get("email");
  console.log("Parameter Queried", param);
  await dbConnection();
  const result = await wishlist.findOne({ email: param });
  console.log(result.wishlist);
  return NextResponse.json({ list: result.wishlist });
}
