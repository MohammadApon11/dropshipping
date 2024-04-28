import { useState } from "react";
import axios from "axios";
import { baseURL } from "../Utils"; // Ensure this points to your backend URL

const useUpdateQuantity = () => {
  const [loadingQuantity1, setLoading1] = useState(false);
  const [loadingQuantity2, setLoading2] = useState(false);
  const [error, setError] = useState(null);

  const updateQuantity = async (action, _id) => {
    if (!_id || !["plus", "minus"].includes(action)) {
      setError("Invalid action or ID");
      return;
    }

    if (action === "minus") {
      setLoading1(true);
    }

    if (action === "plus") {
      setLoading2(true);
    }

    setError(null);

    try {
      const response = await axios.put(`${baseURL}/api/quantityUpdate/${_id}`, {
        action, 
      });

      if (response.status === 200) {
        return response.data;
      } else {
        setError("Failed to update quantity");
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError(
        err.response?.data?.error || "An error occurred while updating quantity"
      );
    } finally {
      if (action === "minus") {
        setLoading1(false);
      }
      if (action === "plus") {
        setLoading2(false);
      }
    }
  };

  return {
    updateQuantity,
    loadingQuantity1,
    loadingQuantity2,
    error,
  };
};

export default useUpdateQuantity;
