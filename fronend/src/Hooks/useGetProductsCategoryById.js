import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../Utils";

const useGetProductsCategoryById = (categoryId) => {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/products/${categoryId}`
        );
        setProductsByCategory(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  return { productsByCategory, loading, error };
};

export default useGetProductsCategoryById;
