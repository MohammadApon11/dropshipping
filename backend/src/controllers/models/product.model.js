import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    subImages: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    flashSale: {
      type: Boolean,
      default: false,
    },
    forYou: {
      type: Boolean,
      default: false,
    },
    shop: {
      type: String,
      required: true,
    },
    shopEmail: {
      type: String,
      required: true,
    },
    available_quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    sells: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    brand: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
