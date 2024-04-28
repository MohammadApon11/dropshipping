import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Contexts/AuthContext";
import { baseURL } from "../Utils";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async ({
    fullName,
    userEmail,
    password,
    confirmPassword,
    userMobile,
    shopName,
    shopAddress,
    url,
    gender,
  }) => {
    const success = handleInputError({
      fullName,
      userEmail,
      password,
      confirmPassword,
      userMobile,
      shopName,
      shopAddress,
      url,
      gender,
    });
    if (!success) return;
    try {
      const res = await fetch(`${baseURL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          userEmail,
          password,
          confirmPassword,
          userMobile,
          shopName,
          shopAddress,
          url,
          gender,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("current-user", JSON.stringify(data));
      setAuthUser(data);
      console.log("data user", data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;

function handleInputError({
  fullName,
  userEmail,
  password,
  confirmPassword,
  userMobile,
  shopName,
  shopAddress,
  url,
  gender,
}) {
  if (
    !fullName ||
    !userEmail ||
    !password ||
    !confirmPassword ||
    !gender ||
    !userMobile ||
    !shopName ||
    !shopAddress ||
    !url
  ) {
    toast.error("Please fill in all field");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Password do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}
