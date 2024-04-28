import React from "react";
import { Route, Routes } from "react-router-dom";
import CheckoutPage from "../Pages/CheckoutPage";
import HomePage from "../Pages/HomePage";
import ProductsPage from "../Pages/ProductsPage";
import CartPage from "../Pages/CartPage";
import { useAuthContext } from "../Contexts/AuthContext";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import Success from "../Components/Success/Success";
import Fail from "../Components/Fail/Fail";
import CartDetailPage from "../Pages/CartDetailPage";
import WishlistPage from "../Pages/WishlistPage";

export default function Routing() {
  const { authUser } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:categoryId" element={<ProductsPage />} />
      <Route path="/product/:productId" element={<CartPage />} />
      <Route path="/cart" element={<CartDetailPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/success" element={<Success />} />
      <Route path="/fail?" element={<Fail />} />
      <Route
        path="/signup"
        element={authUser ? <HomePage /> : <SignupPage />}
      />
      <Route path="/login" element={authUser ? <HomePage /> : <LoginPage />} />
    </Routes>
  );
}
