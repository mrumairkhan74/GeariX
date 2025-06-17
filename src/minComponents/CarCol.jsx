import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_BACKEND_API;

const CarCol = () => {
  const [cars, setCars] = useState([]);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCar = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${apiUrl}/car/get`, {
        withCredentials: true,
      });
      setCars(res.data.cars || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCar();
  }, []);

  useEffect(() => {
    if (cars.length > 1) {
      const interval = setInterval(() => {
        setCurrentCarIndex((prevIndex) => (prevIndex + 1) % cars.length);
      }, 3000); // 3 seconds
      return () => clearInterval(interval);
    }
  }, [cars]);

  const handleCart = (car) => {
    alert(`${car.name} added to cart!`);
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Error loading cars: {error}
      </div>
    );

  const car = cars[currentCarIndex];

  return (
    <div className="w-full flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl p-6 sm:p-10 text-center">
        <h1 className="text-red-600 text-3xl sm:text-5xl font-bold uppercase tracking-widest mb-8">
          Available Cars
        </h1>

        {cars.length === 0 ? (
          <p className="text-gray-500 text-lg">No cars available.</p>
        ) : (
          <div className="flex flex-col items-center gap-8">
            {/* Car Image */}
            <div className="w-full flex justify-center">
              <img
                src={`data:image/jpeg;base64,${car.image}`}
                alt={car.name}
                loading="lazy"
                className="max-h-[300px] object-contain rounded shadow-md"
              />
            </div>

            {/* Car Info */}
            <div className="text-center space-y-2 text-gray-800">
              <h2 className="text-3xl sm:text-4xl font-bold">{car.name}</h2>
              <p><strong>Model:</strong> {car.model}</p>
              <p><strong>Year:</strong> {car.year}</p>
              <p><strong>Color:</strong> {car.color}</p>
              <p><strong>Reg #:</strong> {car.registrationNumber}</p>
              <p><strong>Mileage:</strong> {car.mileage}</p>
              <p><strong>Fuel Type:</strong> {car.fuelType}</p>
              <p><strong>Transmission:</strong> {car.transmission}</p>
              <p><strong>Price:</strong> {car.price} $</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <button
                onClick={() => handleCart(car)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
              >
                Add To Cart
              </button>
              <Link
                to={`/car/${car._id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
              >
                View Details
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCol;
