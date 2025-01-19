import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/Narbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Store from "./components/Store";
import DesignPage from "./components/DesignPage";
import { getAuth, setUser, setLoading } from "./redux/slice/authSlice";
import axios from "axios";
import { base_url } from "./base_url";
import ProductDetail from "./components/ProductDetail";

const App = () => {
  const { user, loading } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();
  const checkAuth = async () => {
    dispatch(setLoading(true)); // Dispatch the setLoading action to set loading to true
  
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
  
    if (token) {
      try {
        const response = await axios.get(`${base_url}/auth/check-auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          dispatch(setUser(response.data)); // Save user data in Redux
        } else {
          localStorage.removeItem("token"); // Remove invalid token
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        localStorage.removeItem("token");
      }
    }
  
    dispatch(setLoading(false)); // Dispatch setLoading to set loading to false
  };
  
  
  useEffect(() => {
    checkAuth();
  }, [dispatch]);

  return (
    <Router>
      {loading ? ( // Show loader if the app is loading
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      ) : user ? ( // Render authenticated content if the user is logged in
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 pt-[10rem]">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/store" element={<Store />} />
              <Route path="/design" element={<DesignPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      ) : (
        <Login /> // Render login page if the user is not logged in
      )}
    </Router>
  );
  
};

export default App;
