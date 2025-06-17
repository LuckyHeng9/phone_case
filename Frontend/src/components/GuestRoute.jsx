import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  return user ? <Navigate to="/" replace /> : children;
};

export default GuestRoute;
