// src/minComponents/CarDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../Loading";

const apiUrl = import.meta.env.VITE_BACKEND_API;

const CarDetailPage = ({ user }) => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCar = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/car/get/${id}`);
      setCar(res.data.car);
    } catch (err) {
      setError("Failed to load car details.");
    } finally {
      setLoading(false);
    }
  };

  const handleCart = async () => {
    if (!user?._id) {
      toast.error("Please log in to add to cart.");
      return;
    }

    try {
      const payload = {
        userID: user._id,
        carID: car._id,
      };

      const res = await axios.post(`${apiUrl}/cart/add`, payload, {
        withCredentials: true,
      });

      toast.success(res.data.message || "Car added to cart!");
    } catch (err) {
      console.error("Add to cart error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Failed to add car to cart.");
    }
  };

  useEffect(() => {
    fetchCar();
  }, [id]);

  if (loading) return <Loading/>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;
  if (!car) return <p className="text-center mt-4">No car found.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={`data:image/jpeg;base64,${car.image}`}
          alt={car.name}
          loading="lazy"
          className="w-full h-80 object-cover"
        />
        <div className="p-6 space-y-2 text-gray-700">
          <h2 className="text-2xl font-bold mb-2">{car.name}</h2>
          <p><strong>Model:</strong> {car.model}</p>
          <p><strong>Year:</strong> {car.year}</p>
          <p><strong>Color:</strong> {car.color}</p>
          <p><strong>Reg #:</strong> {car.registrationNumber}</p>
          <p><strong>Mileage:</strong> {car.mileage}</p>
          <p><strong>Fuel Type:</strong> {car.fuelType}</p>
          <p><strong>Transmission:</strong> {car.transmission}</p>
          <p><strong>Price:</strong> {car.price}</p>
        </div>
        <div className="p-4 text-center flex items-center justify-between">
          <Link
            to="/"
            className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition"
          >
            Back to All Cars
          </Link>
          <button
            onClick={handleCart}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
