import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../Utils"; // Ensure your baseURL is correctly set

const useGetProductsProductById = (productId) => {
  const [product, setProduct] = useState(null); // Default to `null` for an object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Make the API call to get the product by ID
        const response = await axios.get(`${baseURL}/api/product/${productId}`);

        // Check for a successful response
        if (response.status === 200) {
          // If product is returned as `product` field
          setProduct(response.data.product);
        } else {
          setError("Failed to fetch product");
        }
      } catch (err) {
        console.error("Error fetching product by ID:", err);
        setError(
          err.response?.data?.error ||
            "An error occurred while fetching the product"
        );
      } finally {
        setLoading(false); // Indicate loading is complete
      }
    };

    if (productId) {
      fetchProduct(); // Fetch product if `productId` is provided
    }
  }, [productId]); // Run this effect when `productId` changes

  return { product, loading, error }; // Return the product, loading status, and error
};

export default useGetProductsProductById; // Export the custom hook
