import React from "react";
import { Route, Routes } from "react-router-dom";
import CheckoutPage from "../Pages/CheckoutPage";
import HomePage from "../Pages/HomePage";
import ProductsPage from "../Pages/ProductsPage";
import CartPage from "../Pages/CartPage";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:categoryId" element={<ProductsPage />} />
      <Route path="/product/:productId" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}
