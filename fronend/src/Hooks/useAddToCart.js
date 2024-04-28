import { useState } from "react";
import axios from "axios";
import { baseURL } from "../Utils";
import Swal from "sweetalert2";

const useAddToCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartItem, setCartItem] = useState(null);

  const addToCart = async (productId, userEmail) => {
    setLoading(true); // Start loading
    setError(null); // Clear previous errors

    try {
      const response = await axios.post(`${baseURL}/api/addToCart`, {
        productId,
        userEmail,
      });

      if (response.status === 200) {
        setCartItem(response.data.message);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added to Cart",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setError("Failed to add to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      setError(
        err.response?.data?.error || "An error occurred while adding to cart"
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return {
    addToCart,
    loading,
    error,
    cartItem,
  };
};

export default useAddToCart;
