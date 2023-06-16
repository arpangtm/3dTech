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

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  console.log("Signup api");

  //Parsing Formdata
  const request = await req.formData();
  const userData = {
    username: request.get("username"),
    email: request.get("email"),
    password: request.get("password"),
  };

  //Empty Field Validation
  // if (!userData.username)
  //   return new Response(
  //     JSON.stringify({ type: "username", err: "Enter a username" }),
  //     { status: 500 }
  //   );
  // if (!userData.email)
  //   return new Response(
  //     JSON.stringify({ type: "email", err: "Email field is empty" }),
  //     { status: 500 }
  //   );
  await dbConnection();

  // const user = await userInfo.findOne({ email:userData.email });
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
    console.log(result);
    //If new user is created then only put the image in cloudinary and
    const data = request.get("file");
    console.log("Data: ", data);
    const formData = new FormData();
    formData.append("file", data!);
    formData.append("folder", "3dTech");
    formData.append("upload_preset", "3dtechstore");

    const URL = process.env.CLOUDINARY_URL;
    console.log(URL);
    const res = await fetch(URL! + "/image/upload", {
      method: "POST",
      body: formData,
    }).then(async (res) => res.json());
    console.log("Cloudinary ko resp:", res);
    try {
      console.log(res.url);
      const uploadImg = await userInfo.updateOne(
        { email: userData.email },
        { $set: { imgURL: res.url } },
        { new: true }
      );
      console.log("User Data with image: ", uploadImg);
    } catch (err) {
      console.log(err);
    }

    return new Response(JSON.stringify({ res: result }));
  } catch (err) {
    console.log("Err", err.name);
    if (err.name === "ValidationError") {
      const errs = Object.values(err.errors).map((val: any) => val.message);
      return new Response(
        JSON.stringify({ type: Object.keys(err.errors)[0], err: errs[0] }),
        {
          status: 400,
        }
      );
    } else if (err.name === "MongoServerError" && err.code === 11000) {
      console.log("User Exists");
      return new Response(
        JSON.stringify({ type: "email", err: "User Exists with this email" }),
        { status: 400 }
      );
    }
    console.log(err.name, err.code);
  }
}
