import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Payment from "./pages/Payment/Payment";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import Results from "./pages/Results/Results";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// ✅ Move outside component
const stripePromise = loadStripe("pk_test_51RU4f7FVVEyN5Qp6M9ygO7fQh9GDaJaLsgAnAiY0evFdQ0KvWgeSPdrbr284tWOpjgats4ZXiCQlDhFDy78NEs4E00UeR07ylJ"); 

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />

      {/* Stripe-protected Payment route */}
      <Route
        path="/payments"
        element={
          <ProtectedRoute msg="You must login to pay" redirect="/payments">
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </ProtectedRoute>
        }
      />

      {/* Orders - no need for Elements */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute
            msg="You must login to access your orders"
            redirect="/orders"
          >
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route path="/category/:categoryName" element={<Results />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default Routing;
