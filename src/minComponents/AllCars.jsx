import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loading from "../Loading";
const apiUrl = import.meta.env.VITE_BACKEND_API
const AllCars = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(category || "");

  const categories = ["SUV", "Sedan", "Hatchback", "Truck", "Coupe", "Convertible"];

  const fetchCars = async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = selectedCategory
        ? `${apiUrl}/car//category/${selectedCategory}`
        : `${apiUrl}/car/get`;
      const res = await axios.get(endpoint);
      setCars(res.data.cars || []);
    } catch (err) {
      setError("Failed to fetch car data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setSelectedCategory(cat);
    if (cat) {
      navigate(`/cars/category/${cat}`);
    } else {
      navigate("/cars");
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Browse Cars</h1>

          <div className="flex items-center gap-4">
            <select
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {selectedCategory && (
              <button
                onClick={() => {
                  setSelectedCategory("");
                  navigate("/cars");
                }}
                className="px-3 py-2 text-sm border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <Link
              key={car._id}
              to={`/car/${car._id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={`data:image/jpeg;base64,${car.image}`}
                alt={car.name}
                loading="lazy"
                className="h-48 w-full object-cover"
              />

              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">{car.name}</h2>
                <p className="text-gray-600 text-sm">Model: {car.model} | Year: {car.year}</p>
                <p className="text-gray-500 text-sm">Fuel: {car.fuelType} | Transmission: {car.transmission}</p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Category:</span> {car.category || "N/A"}
                </p>
                <p className="text-gray-500 text-lg"><strong>Price: {car.price}</strong> </p>
              </div>
            </Link>
          ))}
        </div>

        {cars.length === 0 && !loading && (
          <p className="text-center mt-12 text-gray-500">No cars found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default AllCars;
