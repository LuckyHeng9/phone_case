// // components/AdminRoute.jsx
// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const AdminRoute = ({ children }) => {
//   const { user } = useSelector((state) => state.auth);

//   if (!user) {
//     // Not logged in
//     return <Navigate to="/login" replace />;
//   }

//   if (user.role !== "admin") {
//     // Logged in but not admin
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default AdminRoute;
