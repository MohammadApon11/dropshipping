import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true, // User's email associated with this cart item
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the Product model
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
