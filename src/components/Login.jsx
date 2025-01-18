import React from 'react';
import { MdFacebook } from "react-icons/md";
import { FaGoogle } from "react-icons/fa6";
 const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen  bg-[#1a1a2e] text-white">
      <div className="bg-[#4C5566] rounded-lg p-8 w-full max-w-md text-center shadow-lg">
        <h1 className="text-2xl font-semibold mb-2">Log in with your Case Account</h1>
        <p className="text-gray-300 text-sm mb-6">
          or create a <a href="#" className="text-blue-400 underline">new account</a> for free
        </p>

        <div className="flex justify-between space-x-4 mb-6">
          <button className="w-1/2 h-12 text-white font-semibold">Log in</button>
          <button className="w-1/2 h-12 text-gray-400 bg-[#000000]">Sign up</button>
        </div>

        <div className="flex flex-col items-center space-y-2 mb-4">
          <button className="btn">
            <MdFacebook className="mr-2 text-2xl" /> Continue with Facebook
          </button>
          <button className="btn">
            <FaGoogle className="-ml-3 mr-3 text-xl" /> Continue with Google
          </button>
        </div>

        <p className="text-gray-400 mb-4">OR</p>

        <form  className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
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

        <p className="text-sm text-gray-400 mt-4">
          <a href="#" className="text-blue-400 underline">Forgot password?</a>
        </p>

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
              <a href="#"><img src="facebook-icon.png" alt="Facebook" className="w-5" /></a>
              <a href="#"><img src="instagram-icon.png" alt="Instagram" className="w-5" /></a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default Login;
