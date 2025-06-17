import React, { useState } from "react";
import { MdFacebook } from "react-icons/md";
import { FaGoogle } from "react-icons/fa6";
import axios from "axios";
import { base_url } from "../base_url";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice/authSlice";
import Signup from "./Signup";
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await axios.post(base_url + "/auth/login", data);

      if (response.status === 200 && response.data.token) {
        dispatch(setUser(response.data.user));
        localStorage.setItem("token", response.data.token);

        // 🔥 Redirect based on role
        const role = response.data.user.role;
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/store"); // or wherever your normal user should go
        }
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div className="flex justify-center items-center min-h-screen  text-white">
      <div className="bg-[#303848] rounded-lg p-8 w-full max-w-md text-center shadow-lg">
        <h1 className="text-2xl font-semibold mb-2">
          {isLoginForm
            ? "Log in with your Case Account"
            : "Create a New Account"}
        </h1>
        <p className="text-gray-300 text-sm mb-6">
          {isLoginForm ? "or create a " : "Already have an account? "}
          <button onClick={toggleForm} className="text-blue-400 underline">
            {isLoginForm ? "new account" : "Log in"}
          </button>
        </p>

        {isLoginForm ? (
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center justify-start text-sm text-gray-400">
              <input type="checkbox" id="rememberMe" className="mr-2" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition font-semibold"
            >
              Log In
            </button>
          </form>
        ) : (
          <Signup />
        )}

        <div className="flex flex-col items-center space-y-2 my-4">
          <button className="btn">
            <MdFacebook className="mr-2 text-2xl" /> Continue with Facebook
          </button>
          <button className="btn">
            <FaGoogle className="-ml-3 mr-3 text-xl" /> Continue with Google
          </button>
        </div>

        <footer className="flex justify-between mt-6 text-xs text-gray-400">
          <div>
            <p>Need Help?</p>
            <p>Contact us</p>
          </div>
          <div className="text-center">
            <p>Contact us</p>
            <p>email@example.com</p>
          </div>
          <div className="text-right">
            <p>Follow us</p>
            <div className="flex space-x-2 mt-1">
              <a href="#">
                <img src="facebook-icon.png" alt="Facebook" className="w-5" />
              </a>
              <a href="#">
                <img src="instagram-icon.png" alt="Instagram" className="w-5" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;
