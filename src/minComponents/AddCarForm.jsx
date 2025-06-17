import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const apiUrl = import.meta.env.VITE_BACKEND_API;

const AddCarForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    year: "",
    color: "",
    registrationNumber: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    price:""
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      data.append("image", image);

      await axios.post(`${apiUrl}/car/create`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Car added successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
      setFormData({
        name: "",
        model: "",
        year: "",
        color: "",
        registrationNumber: "",
        mileage: "",
        fuelType: "",
        transmission: "",
        price:"",
      });
      setImage(null);
    } catch (error) {
      toast.error(error.response?.data?.error || "Error adding car");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Add New Car
        </h2>

        {/* Input Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Car Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
          <Input
            label="Year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            required
          />
          <Input
            label="Color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
          <Input
            label="Registration No."
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            required
          />
          <Input
            label="Mileage (km)"
            name="mileage"
            type="number"
            value={formData.mileage}
            onChange={handleChange}
          />

          {/* Fuel Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Fuel Type
            </label>
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Transmission */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Transmission
            </label>
            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="">Select Transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
        </div>
        <Input
            label="Price "
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Upload Car Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md file:bg-red-500 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-3 rounded-md font-semibold text-lg hover:bg-red-600 transition duration-300"
        >
          Submit Car
        </button>
      </form>
    </div>
  );
};

const Input = ({ label, name, type = "text", value, onChange, required }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
    />
  </div>
);

export default AddCarForm;
