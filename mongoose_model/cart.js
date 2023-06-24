import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  email: String,
  cart: Array,
});

export default mongoose.models.cartCollection ||
  mongoose.model("cartCollection", cartSchema);
