import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminPage from "../adimPage/AdminPage";
import AllProducts from "../components/dashbord/components/AllProducts";
import AddProduct from "../components/dashbord/components/AddProduct";
import OrderList from "../components/dashbord/components/OrderList";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminPage title="Dashboard" />} />
    <Route path="/all-products" element={<AdminPage title="All Products" component={<AllProducts />} />} />
    <Route path="/add-product" element={<AdminPage title="Add Product" component={<AddProduct />} />} />
    <Route path="/order-list" element={<AdminPage title="Order List" component={<OrderList />} />} />
    <Route path="*" element={<AdminPage title="Not Found" />} />
  </Routes>
);

export default AdminRoutes;
