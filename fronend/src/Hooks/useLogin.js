import { useState } from "react";
import toast from "react-hot-toast";
import { baseURL } from "../Utils";
import { useAuthContext } from "../Contexts/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (userEmail, password) => {
    const success = handleInputErrors(userEmail, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("current-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(userEmail, password) {
  if (!userEmail || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
