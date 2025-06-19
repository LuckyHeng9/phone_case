import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
      <Routes>
        <Route path="*" element={<MainRouteHandler />} />
      </Routes>
    </Router>
  );
};

export default App;
