import mongoose from "mongoose";

const userInfoSchema = mongoose.Schema({
  email: {
    type: String,
    unique: [true, "User Exists"],
    required: [true, "Email required!"],
    validate: [
      function (v) {
        var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return !v || !v.trim().length || re.test(v);
      },
      "Provided email is invalid.",
    ],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  username: {
    type: String,
    required: [true, "Username can't be empty"],
  },
  password: {
    type: String,
    required: [true, "Password can't be empty"],
    minlength: [4, "Password must be at least six characters"],
  },
  imgURL: {
    type: String,
    default:
      "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
    required: true,
  },
});

export default mongoose.models.userInfo ||
  mongoose.model("userInfo", userInfoSchema);
