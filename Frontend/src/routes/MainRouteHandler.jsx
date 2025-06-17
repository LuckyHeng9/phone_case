import React from "react";
import { useSelector } from "react-redux";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

const MainRouteHandler = () => {
  const { user } = useSelector((state) => state.auth);

  if (user?.role === "admin") {
    return <AdminRoutes />;
  }

  return <UserRoutes />;
};

export default MainRouteHandler;
