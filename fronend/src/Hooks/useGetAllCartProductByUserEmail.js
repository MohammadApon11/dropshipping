import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../Utils";

const useGetAllCartProductByUserEmail = (userEmail) => {
  const [allCartProduct, setAllCartProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/addToCart/${userEmail}`
        );
        setAllCartProduct(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchCarts();
    }
  }, [userEmail]);

  return { allCartProduct, loading, error };
};

export default useGetAllCartProductByUserEmail;
