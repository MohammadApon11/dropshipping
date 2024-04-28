import mongoose from "mongoose";
import Product from "./product.model";

const cartItemSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true, // User's email associated with this cart item
    },
    productId: {
      type: String,
      ref: Product, // Reference to the Product model
      required: true,
    },
    name: {
      type: String,
      required: true, // Product name
    },
    price: {
      type: Number,
      required: true, // Product price
    },
    brand: {
      type: String,
      required: true, // Product Brand
    },
    regularPrice: {
      type: Number,
      required: true, // Product Regular Price
    },
    image: {
      type: String, // Product image
    },
    quantity: {
      type: Number,
      required: true,
      default: 1, // Default quantity
    },
  },
  { timestamps: true } // To track when the cart item was added
);

const CartItem = mongoose.model("Cart", cartItemSchema);

export default CartItem;
