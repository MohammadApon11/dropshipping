import mongoose from "mongoose";
import User from "./user.model";
import Product from "./product.model";

// Define a schema for the cart item
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the product
    ref: Product, // Assuming there's a Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1, // Default quantity
  },
  price: {
    type: Number, // The price at the time of adding to the cart
    required: true,
  },
  productName: {
    type: String, // Storing the product name for easier lookup
    required: true,
  },
  productImage: {
    type: String, // Image of the product
  },
});

// Define the cart schema
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the user
      ref: User, // Assuming you have a User model
      required: true,
    },
    items: [cartItemSchema], // List of items in the cart
  },
  { timestamps: true } // To track when the cart was created or updated
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
