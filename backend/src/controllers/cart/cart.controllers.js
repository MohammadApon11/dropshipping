import Product from "../models/product.model";
import CartItem from "../models/cart.model";

// add to cart
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
