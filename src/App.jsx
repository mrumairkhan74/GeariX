import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Background from "./components/background/Background";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import CarDetailPage from "./minComponents/CarDetailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./Loading";
import AllCars from "./minComponents/AllCars";
import AboutGearix from "./components/About";
import AddCarForm from "./minComponents/AddCarForm";
import Contact from "./components/Contact";
import Services from "./components/Services";
import CartPage from "./minComponents/CartPage";

const apiurl = import.meta.env.VITE_BACKEND_API;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 1. Add loading state

  useEffect(() => {
    // Check if user is logged in on app load
    axios
      .get(`${apiurl}/user/verify`, { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false)); // 2. Set loading to false after request
  }, []);

  if (loading) return <Loading />; // 3. Conditional return

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/background" element={<Background />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route
          path="/car/:id"
          element={
            <ProtectedRoute user={user}>
              <CarDetailPage user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allcars"
          element={
            <ProtectedRoute user={user}>
              <AllCars user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addcar"
          element={
            <ProtectedRoute user={user}>
              <AddCarForm user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute user={user}>
              <CartPage user={user} />
            </ProtectedRoute>
          }
        />

        <Route path="/about" element={<AboutGearix />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        {/* Add other routes here */}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
