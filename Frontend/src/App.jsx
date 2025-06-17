import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Store from "./components/Store";
import CartPage from "./components/CartPage";
import DesignPage from "./components/DesignPage";
import { setUser, setLoading } from "./redux/slice/authSlice";
import axios from "axios";
import { base_url } from "./base_url";
import ProductDetail from "./components/ProductDetail";
import { getCart, removeCartItem } from "./redux/slice/cartSlice";
import CheckoutPage from "./components/CheckoutPage";
import AdminPage  from "./adimPage/AdminPage";
import ProductPage from "./adimPage/Product"; // adjust if needed
import OrderList from "./adimPage/OrderList";
import CustomersPage from "./adimPage/CustomersPage";
import ReportsPage from "./adimPage/ReportsPage";
import SettingsPage from "./adimPage/SettingsPage";
import AddProductPage from "./adimPage/AddProductPage";

import { checkAuth } from "./utils/authUtils";
import MainRouteHandler from "./routes/MainRouteHandler";


const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    checkAuth(dispatch);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        <div className="spinner" />
        <p className="ml-4">Loading...</p>
      </div>
    );
  }

  return (
    <Router>

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="spinner" />
          <p>Loading...</p>
        </div>
      ) : user ? (
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Admin Routes with AdminNavbar */}
            <Route
              path="/admin"
              element={
                <>
                  <main className="bg-white h-screen">
                    <Routes>
                      <Route path="/" element={<AdminPage />} />
                     

                      <Route path="*" element={<p>Admin Page Not Found</p>} />
                    </Routes>
                  </main>
                </>
              }
            />

            {/* User Routes with Navbar */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <main className="flex-1 pt-20">
                    <Routes>
                      <Route path="/" element={<Hero />} />
                      <Route path="/store" element={<Store />} />
                      <Route path="/admin/product" element={<ProductPage />} />
                      <Route path="/admin/dashboard" element={<AdminPage />} />
                      <Route path="/admin/orders" element={<OrderList />} />
                      <Route path="/admin/customers" element={<CustomersPage />} />
                      <Route path="/admin/reports" element={<ReportsPage />} />
                      <Route path="/admin/settings" element={<SettingsPage />} />
                      <Route path="/admin/product/add" element={<AddProductPage />} />
                      <Route path="/design" element={<DesignPage />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route
                        path="/cart"
                        element={
                          <CartPage
                          addCartItem={cartItems}
                          handleRomoveCart={handleRemoveCart}
                          />
                        }
                      />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="*" element={<p>Page Not Found</p>} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      )}

      <Routes>
        <Route path="*" element={<MainRouteHandler />} />
      </Routes>

    </Router>
  );
};

export default App;
