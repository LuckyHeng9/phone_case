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

const App = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cartItems = useSelector(getCart);

  const checkAuth = async () => {
    dispatch(setLoading(true));

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(`${base_url}/auth/check-auth`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          dispatch(setUser(response.data));
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        localStorage.removeItem("token");
      }
    }

    dispatch(setLoading(false));
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleRemoveCart = (id) => {
    dispatch(removeCartItem(id));
  };

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
    </Router>
  );
};

export default App;
