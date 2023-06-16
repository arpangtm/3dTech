import userInfo from "../../../../mongoose_model/userInfo";
import dbConnection from "@/lib/mongoose/index";



export default async function authLogin(email:String,password:String){
    console.log("Login auth",email,password)
    await dbConnection()
    const res=await userInfo.findOne({email,password})
    console.log(res)
    if(!res){
        console.log("No user")
        return {err:"Invalid Login Creds"}
    }
    return res
}