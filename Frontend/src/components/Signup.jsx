import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slice/authSlice';
import { base_url } from '../base_url';
import { useNavigate } from 'react-router-dom';

const Signup = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = { username, email, password };
  
    try {
      const response = await axios.post(`${base_url}/auth/register`, data);
  
      if ((response.status === 200 || response.status === 201) && response.data.token) {
        console.log("Token received:", response.data.token);
  
        // Save the token in localStorage (optional)
        localStorage.setItem("token", response.data.token);
  
        // Dispatch user data
        dispatch(setUser(response.data.user));
  
        navigate("/"); // Redirect after signup
      } else {
        console.error("Unexpected response structure:", response);
        alert("Signup failed: Unexpected response structure.");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert("Signup failed: " + (error.response?.data?.message || error.message));
    }
  };
  
  

  return (
    <form className="space-y-4" onSubmit={handleSignup}>
      <input
        type="text"
        placeholder="Username"
        className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition font-semibold"
      >
        Sign Up
      </button>
      <p className="text-gray-300 text-sm mt-4">
        Already have an account?{' '}
        <button onClick={toggleForm} className="text-blue-400 underline">
          Log in
        </button>
      </p>
    </form>
  );
};

export default Signup;
