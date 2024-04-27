import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../Utils";

const useGetProductsProductById = (productId) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/product/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  return { product, loading, error };
};

export default useGetProductsProductById;
