import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Car Wash",
    description: "Full exterior and interior wash for your car.",
    image: "/images/carwash.avif",
  },
  {
    title: "Oil Change",
    description: "High-quality oil change to keep your engine smooth.",
    image: "/images/oilchange.jpg",
  },
  {
    title: "Tire Replacement",
    description: "Quick tire inspection and replacement services.",
    image: "/images/tireReplacement.jpg",
  },
  {
    title: "Engine Diagnosis",
    description: "Computerized engine check and diagnostics.",
    image: "/images/enginedia.avif",
  },
];

const Services = () => {
  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Our Services
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-5 flex flex-col"
            >
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="h-48 w-full object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">{service.title}</h2>
              <p className="text-gray-600 mt-2 flex-grow">{service.description}</p>
              <Link
                to="/contact"
                className="mt-4 inline-block text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
