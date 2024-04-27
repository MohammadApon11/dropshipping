import Category from "../models/categories.mode";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    res.json(categories);
  } catch (error) {
    console.error("Error fetching Categories:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching Categories." });
  }
};
