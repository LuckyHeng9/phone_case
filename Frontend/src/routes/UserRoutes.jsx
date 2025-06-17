import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Store from "../components/Store";
import CartPage from "../components/CartPage";
import ProductDetail from "../components/ProductDetail";
import CasePhone from "../components/CasePhone";
import DesignPage from "../components/DesignPage";
import CheckoutPage from "../components/CheckoutPage";
import Login from "../components/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import GuestRoute from "../components/GuestRoute";
import { useSelector } from "react-redux";
import { getCart, removeCartItem } from "../redux/slice/cartSlice";

const UserRoutes = () => {
  const cartItems = useSelector(getCart);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Hero />
          </Layout>
        }
      />
      <Route
        path="/store"
        element={
          <Layout>
            <Store />
          </Layout>
        }
      />
      <Route
        path="/product/:_id"
        element={
          <Layout>
            <ProductDetail />
          </Layout>
        }
      />
      <Route
        path="/cart"
        element={
          <Layout>
            <CartPage addCartItem={cartItems} />
          </Layout>
        }
      />
      <Route
        path="/design"
        element={
          <ProtectedRoute>
            <Layout>
              <DesignPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/case-phone"
        element={
          <ProtectedRoute>
            <Layout>
              <CasePhone />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Layout>
              <CheckoutPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Layout>
              <Login />
            </Layout>
          </GuestRoute>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <div className="text-white text-center py-10 text-3xl">
              404 - Page Not Found
            </div>
          </Layout>
        }
      />
    </Routes>
  );
};

export default UserRoutes;
