import { NextRequest, NextResponse } from "next/server";
import userInfo from "../../../../mongoose_model/userInfo";
import wishlist from "@/mongoose_model/wishlist";
import dbConnection from "@/lib/mongoose/index";
import { redirect } from "next/navigation";
import multiparty from "multiparty";
import { NextApiRequest } from "next";

interface signupData {
  email: string;
  password: string;
  username: string;
  photo: File;
}

export async function POST(req: NextRequest) {
  //Parsing Formdata
  const request = await req.formData();
  const userData = {
    username: request.get("username"),
    email: request.get("email"),
    password: request.get("password"),
  };

  await dbConnection();

  try {
    const result = await userInfo.create({
      email: userData.email,
      password: userData.password,
      username: userData.username,
    });
    await wishlist.create({
      email: userData.email,
      wishlist: [],
    });
    //If new user is created then only put the image in cloudinary and
    const data = request.get("file");
    const formData = new FormData();
    formData.append("file", data!);
    formData.append("folder", "3dTech");
    formData.append("upload_preset", "3dtechstore");

    const URL = process.env.CLOUDINARY_URL;
    const res = await fetch(URL! + "/image/upload", {
      method: "POST",
      body: formData,
    }).then(async (res) => res.json());
    try {
      const uploadImg = await userInfo.updateOne(
        { email: userData.email },
        { $set: { imgURL: res.url } },
        { new: true }
      );
    } catch (err) {
      console.log(err);
    }

    return new Response(JSON.stringify({ res: result }));
  } catch (err) {
    if (err.name === "ValidationError") {
      const errs = Object.values(err.errors).map((val: any) => val.message);
      return new Response(
        JSON.stringify({ type: Object.keys(err.errors)[0], err: errs[0] }),
        {
          status: 400,
        }
      );
    } else if (err.name === "MongoServerError" && err.code === 11000) {
      return new Response(
        JSON.stringify({ type: "email", err: "User Exists with this email" }),
        { status: 400 }
      );
    }
  }
}
