import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading";

const CarsDetail = () => {
  const { id } = useParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCarById = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/car/get/${id}`);
      setCars([res.data.car]);
    } catch (err) {
      setError("Failed to fetch car data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCars = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/car/get");
      setCars(res.data.cars || []);
    } catch (err) {
      setError("Failed to fetch car data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    id ? fetchCarById() : fetchAllCars();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="  px-4 py-10 text-white flex flex-col items-center">
      <h1 className="text-red-500 tracking-[3px] text-3xl md:text-5xl uppercase text-center font-bold mb-10">
        {id ? "Car Details" : "Available Cars"}
      </h1>

      {cars.length === 1 ? (
        // Single Car - About-style layout
        <div className="bg-white text-gray-900 rounded-xl shadow-2xl max-w-4xl w-full p-8 flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2">
            <img
              src={`data:image/jpeg;base64,${cars[0].image}`}
              alt={cars[0].name}
              className="rounded shadow-lg object-contain max-h-[300px] w-full"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold">{cars[0].name}</h2>
            <p><strong>Model:</strong> {cars[0].model}</p>
            <p><strong>Year:</strong> {cars[0].year}</p>
            <p><strong>Color:</strong> {cars[0].color}</p>
            <p><strong>Reg #:</strong> {cars[0].registrationNumber}</p>
            <p><strong>Mileage:</strong> {cars[0].mileage}</p>
            <p><strong>Fuel Type:</strong> {cars[0].fuelType}</p>
            <p><strong>Transmission:</strong> {cars[0].transmission}</p>
            <p><strong>Price:</strong> {cars[0].price}</p>
            <div className="mt-4">
              <Link
                to="/allcars"
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
              >
                Back to All Cars
              </Link>
            </div>
          </div>
        </div>
      ) : (
        // All Cars Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl">
          {cars.slice(0, 4).map((car) => (
            <Link
              key={car._id}
              to={`/car/${car._id}`}
              className="bg-white text-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 group"
            >
              <img
                src={`data:image/jpeg;base64,${car.image}`}
                alt={car.name}
                loading="lazy"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="p-4 space-y-1 text-sm">
                <p><strong>Name:</strong> {car.name}</p>
                <p><strong>Model:</strong> {car.model}</p>
                <p><strong>Year:</strong> {car.year}</p>
                <p><strong>Color:</strong> {car.color}</p>
                <p><strong>Price:</strong> {car.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!id && (
        <Link
          to="/allcars"
          className="mt-10 text-center border-2 rounded-sm text-red-500 tracking-wide uppercase px-6 py-3 text-lg md:text-xl border-red-500 hover:bg-red-500 hover:text-white transition-all"
        >
          Show All Cars +
        </Link>
      )}
    </div>
  );
};

export default CarsDetail;
