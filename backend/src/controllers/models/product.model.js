import mongoose from "mongoose";

// Define the product schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Product name is required
    },
    categoryId: {
      type: String,
      required: true, // Product category
    },
    image: {
      type: String, // Main product image
      required: true,
    },
    subImages: {
      type: [String], // Array of additional product images
      default: [], // Empty array by default
    },
    price: {
      type: Number,
      required: true, // Product price
    },
    regularPrice: {
      type: Number, // Regular price (before any discount)
      required: true,
    },
    flashSale: {
      type: Boolean, // Whether the product is on flash sale
      default: false,
    },
    forYou: {
      type: Boolean, // Whether the product is recommended
      default: false,
    },
    shop: {
      type: String, // Shop name
      required: true,
    },
    shopEmail: {
      type: String, // Shop's email
      required: true,
    },
    available_quantity: {
      type: Number, // Stock quantity
      required: true,
      default: 0,
    },
    sells: {
      type: Number, // Number of units sold
      default: 0,
    },
    status: {
      type: String, // Status (e.g., approved, pending)
      required: true,
    },
    description: {
      type: String, // Product description
      default: "",
    },
    brand: {
      type: String, // Brand name
      default: "",
    },
  },
  { timestamps: true } // To track when the product was created or updated
);

// Create the product model
const Product = mongoose.model("Product", productSchema);

export default Product;
