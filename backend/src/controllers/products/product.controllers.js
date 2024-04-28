import Product from "../../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
};
export const getProductsByProductId = async (req, res) => {
  try {
    const productId = req.params.productId; // Get the productId from the route params

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    // Find the product by its ObjectId
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Return the product details
    res.json({ product });
  } catch (error) {
    console.error("Error fetching product by product ID:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the product" });
  }
};

export const addReview = async (req, res) => {
  try {
    const productId = req.params.productId; // Get product ID from URL params
    const newReview = req.body; // Assuming the review details are in the request body
    console.log("newReview", newReview);
    // Find the product by its ID
    const product = await Product.findById(productId);

    if (!product) {
      // Return 404 if the product doesn't exist
      return res.status(404).json({ message: "Product not found" });
    }

    // Add the new review to the "reviews" array
    product.reviews.push(newReview);

    // Save the updated product document
    await product.save();

    res.json({
      success: true,
      message: "Review added successfully",
      product, // Optionally return the updated product
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the review" });
  }
};

export const getProductsByCategoriesId = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Product.find({ categoryId });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this category ID" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products by category ID:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
};
