import mongoose from "mongoose";
import Product from "./product.model";

const wishlistItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: false,
    ref: Product, // Reference to the Product model
  },
  name: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  brand: {
    type: String,
  },
  regularPrice: {
    type: Number,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  addedAt: {
    type: Date,
    default: Date.now, // Automatically set to the current timestamp
  },
});

const wishlistSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true, // The email of the user who owns the wishlist
  },
  items: [wishlistItemSchema], // Array of wishlist items
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
