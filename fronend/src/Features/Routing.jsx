import React from "react";
import { Route, Routes } from "react-router-dom";
import CheckoutPage from "../Pages/CheckoutPage";
import Home from "../Pages/Home";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}
