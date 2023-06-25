import userInfo from "../../../../mongoose_model/userInfo";
import dbConnection from "@/lib/mongoose/index";

export default async function authLogin(email: String, password: String) {
  await dbConnection();
  const res = await userInfo.findOne({ email, password });
  if (!res) {
    return { err: "Invalid Login Creds" };
  }
  return res;
}
