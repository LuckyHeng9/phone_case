import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Narbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Store from "./components/Store";
import Design from "./components/Design";
import DesignPage from "./components/DesignPage";


// const NotFound = () => (
//   <div className="text-center py-20">
//     <h1 className="text-4xl font-bold">404</h1>
//     <p className="text-lg">Page not found</p>
//   </div>
// );

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar /> {/* Navbar displayed on all pages */}
        <main className="flex-1 pt-[10rem] ">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/store" element={<Store />} />
            <Route path="/login" element={<Login />} />
            <Route path="/design" element={<DesignPage />} />{" "}
            {/* <Route path="/design" element={<Design />} />{" "} */}
            {/* Catch-all route */}
          </Routes>
        </main>
        <Footer /> {/* Footer always at the bottom */}
      </div>
    </Router>
  );
};

export default App;
