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
import OrderPage from "../Pages/OrderPage";

export default function Routing() {
  const { authUser } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:categoryId" element={<ProductsPage />} />
      <Route path="/product/:productId" element={authUser && <CartPage />} />
      <Route path="/cart" element={authUser && <CartDetailPage />} />
      <Route path="/wishlist" element={authUser && <WishlistPage />} />
      <Route path="/checkout" element={authUser && <CheckoutPage />} />
      <Route path="/order" element={authUser && <OrderPage />} />
      <Route path="/success?" element={authUser && <Success />} />
      <Route path="/fail?" element={authUser && <Fail />} />
      <Route
        path="/signup"
        element={authUser ? <HomePage /> : <SignupPage />}
      />
      <Route path="/login" element={authUser ? <HomePage /> : <LoginPage />} />
    </Routes>
  );
}
