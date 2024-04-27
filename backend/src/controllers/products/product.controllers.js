import Product from "../models/product.model";

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
    const productId = req.params.productId;
    const product = await Product.findOne({ productId });

    if (product.length === 0) {
      return res
        .status(404)
        .json({ message: "No product found for this product ID" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product by product ID:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching product" });
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
