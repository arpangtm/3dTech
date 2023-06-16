import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  wishlist: {
    type: Array,
  },
});

export default mongoose.models.wishList ||
  mongoose.model("wishList", wishlistSchema);
