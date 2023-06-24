import mongoose from "mongoose";

const productReviewSchema = new mongoose.Schema({
  userId: Number,
  stars: Number,
  review: String,
  date: Date,
});

const productSchema = new mongoose.Schema({
  productId: Number,
  productName: String,
  productInfo: String,
  aboutProduct: String,
  productReviews: [productReviewSchema],
  features: String,
});

export default mongoose.models.productInfo ||
  mongoose.model("productInfo", productSchema);
