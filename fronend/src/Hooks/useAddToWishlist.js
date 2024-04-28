import { useState } from "react";
import axios from "axios";
import { baseURL } from "../Utils";
import Swal from "sweetalert2";

const useAddToWishlist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToWishlist = async (_id, userEmail) => {
    if (!_id || !userEmail) {
      setError("Product ID and user email are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${baseURL}/api/addToWishlist/${_id}`, {
        userEmail,
      });

      if (response.status === 200) {
        return response.data;
      } else {
        setError("Failed to add to wishlist");
      }
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      console.log(err.response);
      if (err.response.data.error === "Product is already in the wishlist") {
        Swal.fire({
          title: "The Error?",
          text: "Product is already in the wishlist",
          icon: "question",
        });
      }

      setError(
        err.response?.data?.error ||
          "An error occurred while adding to wishlist"
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return {
    addToWishlist,
    loading,
    error,
  };
};

export default useAddToWishlist;
