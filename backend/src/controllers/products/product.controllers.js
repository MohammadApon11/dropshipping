import Product from "../models/product.model";

export const getProducts = async (req, res) => {
  try {
    // Fetch all products from the Product collection
    const products = await Product.find({}); // Empty object means no filtering, get all products

    // Return the list of products as a JSON response
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return an error response with a 500 status code
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
};
