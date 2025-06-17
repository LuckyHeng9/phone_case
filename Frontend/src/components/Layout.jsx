import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-slate-900">
    <Navbar />
    <main className="flex-1 pt-20 px-4">{children}</main>
    <Footer />
  </div>
);

export default Layout;
