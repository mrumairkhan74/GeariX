import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-700 text-white py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Logo and Name */}
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <img
            src="./images/gearixIcon.png"
            className="w-12 h-12 hover:rotate-[360deg] transition-transform duration-500"
            alt="GeariX Logo"
          />
          <span className="text-2xl font-bold text-red-500">GeariX</span>
        </div>

        {/* Navigation Links (optional) */}
        <div className="flex gap-6 text-sm md:text-base">
          <a href="#" className="hover:text-red-400 transition">Home</a>
          <a href="#" className="hover:text-red-400 transition">About</a>
          <a href="#" className="hover:text-red-400 transition">Cars</a>
          <a href="#" className="hover:text-red-400 transition">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <FaFacebookF className="hover:text-blue-500 cursor-pointer transition text-lg" />
          <FaInstagram className="hover:text-pink-400 cursor-pointer transition text-lg" />
          <FaTwitter className="hover:text-sky-400 cursor-pointer transition text-lg" />
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} GeariX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
