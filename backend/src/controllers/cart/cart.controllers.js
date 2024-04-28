import CartItem from "../../models/cart.model.js";
import Product from "../../models/product.model.js";
import mongoose from "mongoose";
import Wishlist from "../../models/wishlists.model.js";

export const addToCart = async (req, res) => {
  const { productId, userEmail } = req.body;

  if (!productId || !userEmail) {
    return res
      .status(400)
      .json({ error: "productId and userEmail are required" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const newCartItem = new CartItem({
      userEmail,
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      regularPrice: product.regularPrice,
      quantity: 1,
    });

    await newCartItem.save();

    res.status(200).json({ message: newCartItem });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      error: "An error occurred while adding to cart",
      message: error.message,
    });
  }
};

export const getCartProductsByUserEmail = async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    const cartProducts = await CartItem.find({ userEmail });

    if (cartProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "No cart Products found for this user email" });
    }

    res.json(cartProducts);
  } catch (error) {
    console.error("Error fetching cart Products by user email:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching cart Products" });
  }
};

export const deleteCartProduct = async (req, res) => {
  try {
    const { _id } = req.params; // Get productId from URL parameter

    if (!_id) {
      return res
        .status(400)
        .json({ error: "Product ID is required to delete an item" });
    }

    // Validate that productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid Product ID" });
    }

    // Find and delete the cart item by its ObjectId
    const deletedItem = await CartItem.findByIdAndDelete(_id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Successfully deleted the cart item
    res.json({ message: "Cart item deleted successfully", deletedItem });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the cart item" });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { _id } = req.params; // Get the product _id from the route parameter
    const { userEmail } = req.body; // User email from the request body
    if (!_id || !userEmail) {
      return res
        .status(400)
        .json({ error: "Product ID and user email are required" });
    }

    // Get the full product details from the Product collection
    const product = await Product.findById(_id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Find the user's wishlist or create a new one if it doesn't exist
    let wishlist = await Wishlist.findOne({ userEmail });

    if (!wishlist) {
      wishlist = new Wishlist({ userEmail });
    }

    // Check if the product is already in the wishlist
    const itemExists = wishlist.items.some(
      (item) => item.productId.toString() === _id
    );

    if (itemExists) {
      return res
        .status(409)
        .json({ error: "Product is already in the wishlist" });
    }

    // Add the product to the wishlist with full product information
    wishlist.items.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      regularPrice: product.regularPrice,
      quantity: 1, // Default quantity for a wishlist item
    });

    await wishlist.save(); // Save the updated wishlist

    res.status(200).json({ message: "Product added to wishlist", wishlist });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding to wishlist" });
  }
};

export const quantityUpdate = async (req, res) => {
  try {
    const { _id } = req.params; // Get the product ID from the route parameter
    const { action } = req.body; // Expected to be "plus" or "minus"

    if (!_id || !["plus", "minus"].includes(action)) {
      return res.status(400).json({ error: "Invalid ID or action" });
    }

    // Find the cart item by ID
    const cartItem = await CartItem.findById(_id);

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Prevent reducing quantity below 1
    if (action === "minus" && cartItem.quantity <= 1) {
      return res.status(400).json({ error: "Cannot reduce quantity below 1" });
    }

    // Update the quantity
    if (action === "plus") {
      cartItem.quantity += 1; // Increment the quantity
    } else if (action === "minus") {
      cartItem.quantity -= 1; // Decrement the quantity
    }

    // Save the updated cart item
    await cartItem.save();

    res.status(200).json({
      message: "Quantity and price updated",
      cartItem,
    });
  } catch (error) {
    console.error("Error updating quantity and price:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating quantity and price" });
  }
};
