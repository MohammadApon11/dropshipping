import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../Utils";

const useGetAllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/categories`);
        setCategories(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  return { categories, loading, error };
};

export default useGetAllCategories;
