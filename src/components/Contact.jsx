import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaUser } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send this data to backend here (e.g. using axios)
    console.log(formData);
    alert("Message Sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="w-full bg-gray-100 py-12 px-4" id="contact">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-4xl font-bold text-center text-red-500 mb-6">Contact Us</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center border-b-2 border-gray-300 focus-within:border-red-500 transition">
            <FaUser className="text-gray-500 mx-2" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-3 py-2 outline-none bg-transparent"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center border-b-2 border-gray-300 focus-within:border-red-500 transition">
            <FaEnvelope className="text-gray-500 mx-2" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-3 py-2 outline-none bg-transparent"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-start border-b-2 border-gray-300 focus-within:border-red-500 transition">
            <FaPhoneAlt className="text-gray-500 mx-2 mt-3" />
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full px-3 py-2 outline-none bg-transparent resize-none h-32"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition text-lg font-semibold"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
