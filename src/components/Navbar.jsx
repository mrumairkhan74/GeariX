import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { IoLogIn, IoPersonAddSharp, IoMenu, IoClose } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const apiUrl = import.meta.env.VITE_BACKEND_API;
const Navbar = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${apiUrl}/user/logout`, { withCredentials: true });
      localStorage.removeItem("user"); // ⛔ remove user from storage
      setUser(null); // ✅ update React state
      toast.success("Logout Successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      toast.error("Logout failed!");
    }
  };

  const handleAddToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };
  return (
    <>
      <ToastContainer />
      <div className="bg-gray-200 shadow-md w-full sticky top-0 left-0 z-50">
        <div className="flex items-center justify-between p-3 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="img">
            <img
              src="./images/gearixLogo.png"
              className="w-32"
              alt="GeariX Logo"
            />
          </div>

          {/* Hamburger menu icon - shown on small screens */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="focus:outline-none"
            >
              {isOpen ? (
                <IoClose className="text-3xl hover:rotate-[360deg] transition-transform duration-500" />
              ) : (
                <img
                  src="./images/gearixIcon.png"
                  alt="Open menu"
                  className="w-8 h-8 hover:rotate-[360deg] transition-transform duration-500"
                />
              )}
            </button>
          </div>

          {/* Navigation links - hidden on small screens, shown on md+ */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 list-none m-0 p-0">
              <li>
                <Link
                  to="/"
                  className="text-xl p-2 text-gray-700 hover:bg-red-400 hover:text-black rounded-md tracking-[2px]"
                >
                  Home
                </Link>
              </li>
              {user?.role === "admin" && (
                <li>
                  <Link
                    to="/addcar"
                    className="text-xl p-2 text-gray-700 hover:bg-red-400 hover:text-black rounded-md tracking-[2px]"
                  >
                    Add New Car
                  </Link>
                </li>
              )}

              <li>
                <Link
                  to="/about"
                  className="text-xl p-2 text-gray-700 hover:bg-red-400 hover:text-black rounded-md tracking-[2px]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-xl p-2 text-gray-700 hover:bg-red-400 hover:text-black rounded-md tracking-[2px]"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-xl p-2 text-gray-700 hover:bg-red-400 hover:text-black rounded-md tracking-[2px]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Buttons - hidden on small screens, shown on md+ */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-5 justify-center">
                <Link to={'/cart'} className="relative p-3 rounded-md text-xl tracking-[2px] flex items-center gap-2">
                  <FaCartArrowDown className="text-2xl" />
                  {cartItems.length > 0 && (
                    <span className="absolute bg-red-500 text-white text-sm font-bold -top-2 -left-2 px-2 py-1 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </Link>


                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 p-3 rounded-md text-xl tracking-[2px] flex items-center gap-2"
                >
                  <IoLogIn className="text-2xl" /> Logout
                </button>

              </div>
            ) : (
              <>
                <Link
                  className="text-white bg-red-500 p-3 rounded-md text-xl tracking-[2px] flex items-center gap-2"
                  to={"/login"}
                >
                  <IoLogIn className="text-2xl" /> Login
                </Link>
                <Link
                  className="text-white bg-red-500 p-3 rounded-md text-xl tracking-[2px] flex items-center gap-2"
                  to={"/signup"}
                >
                  <IoPersonAddSharp className="text-2xl" /> Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu - shown only when isOpen is true */}
        {isOpen && (
          <div className="md:hidden bg-gray-300 p-4">
            <ul className="flex flex-col gap-4 list-none m-0 p-0">
              <li>
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg p-2 text-gray-700 hover:bg-red-400 hover:text-black rounded-md tracking-[2px]"
                >
                  Home
                </Link>
              </li>
              {user?.role === "admin" && (
                <li>
                  <Link
                    to="/addcar"
                    onClick={() => setIsOpen(false)}
                    className="text-xl p-2 text-gray-700 hover:bg-red-400 hover:text-black rounded-md tracking-[2px]"
                  >
                    Add New Car
                  </Link>
                </li>
              )}

              <li>
                <Link
                  to="/about"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg p-2 text-gray-700 hover:bg-red-400 hover:text-black rounded-md tracking-[2px]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg p-2 text-gray-700 hover:bg-red-400 hover:text-black rounded-md tracking-[2px]"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg p-2 text-gray-700 hover:bg-red-400 hover:text-black rounded-md tracking-[2px]"
                >
                  Contact
                </Link>
              </li>

              {/* Mobile login/register buttons */}
              {user ? (
                <div className="flex items-center gap-5 justify-center">
                <Link to={'/cart'} className="relative p-3 rounded-md text-xl tracking-[2px] flex items-center gap-2">
                  <FaCartArrowDown className="text-2xl" />
                  {cartItems.length > 0 && (
                    <span className="absolute bg-red-500 text-white text-sm font-bold -top-2 -left-2 px-2 py-1 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </Link>


                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 p-3 rounded-md text-xl tracking-[2px] flex items-center gap-2"
                >
                  <IoLogIn className="text-2xl" /> Logout
                </button>

              </div>
              ) : (
                <li className="flex flex-col gap-2 mt-4">
                  <Link
                    className="text-white bg-red-500 p-3 rounded-md text-xl tracking-[2px] flex items-center justify-center gap-2"
                    to={"/login"}
                  >
                    <IoLogIn className="text-2xl" /> Login
                  </Link>
                  <Link
                    className="text-white bg-red-500 p-3 rounded-md text-xl tracking-[2px] flex items-center justify-center gap-2"
                    to={"/signup"}
                  >
                    <IoPersonAddSharp className="text-2xl" /> Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
