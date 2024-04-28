import { useState } from "react";
import axios from "axios";
import { baseURL } from "../Utils";

const useDeleteCartProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteCartProduct = async (productId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        `${baseURL}/api/deleteCartProduct/${productId}`
      );

      if (response.status === 200) {
        return response.data;
      } else {
        setError("Failed to delete cart item");
      }
    } catch (err) {
      console.error("Error deleting cart item:", err);
      setError(
        err.response?.data?.error ||
          "An error occurred while deleting the cart item"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteCartProduct,
    loading,
    error,
  };
};

export default useDeleteCartProduct;
