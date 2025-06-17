import React from "react";

const AboutGearix = () => {
  return (
    <div className="w-full px-6 py-12 bg-gray-100 text-gray-800">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase text-red-500 tracking-wider">
          About GEARIX
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          At GEARIX, we redefine the automotive experience by bringing
          innovation, performance, and elegance together.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="md:w-1/2 w-full">
          <img
            src="./images/gearixLogo.png"
            alt="Gearix Showroom"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Driving Passion Since 2024
          </h2>
          <p className="text-md md:text-lg text-gray-700 mb-4">
            GEARIX started with a mission to deliver top-tier cars to
            enthusiasts, collectors, and everyday drivers. From high-end luxury
            rides to robust sports machines, we bring quality and class to your
            driveway.
          </p>
          <p className="text-md md:text-lg text-gray-700">
            Our team consists of passionate car lovers, expert mechanics, and
            digital innovators working to simplify your buying experience.
            Whether you're exploring or upgrading, GEARIX is your trusted
            destination.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[
          {
            title: "100% Verified Cars",
            desc: "Every car is thoroughly inspected and quality-checked by our certified experts.",
            icon: "✅",
          },
          {
            title: "Fast Online Booking",
            desc: "Browse, compare, and reserve your favorite model instantly.",
            icon: "⚡",
          },
          {
            title: "Customer Support",
            desc: "24/7 support to assist you before and after purchase.",
            icon: "📞",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Ready to find your dream car?
        </h2>
        <p className="text-gray-600 mb-6">Let GEARIX power your journey.</p>
        <a
          href="/allcars"
          className="inline-block bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition"
        >
          Browse Cars
        </a>
      </div>
    </div>
  );
};

export default AboutGearix;
