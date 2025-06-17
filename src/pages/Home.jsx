import React from "react";
import MainHead from "../minComponents/MainHead";
import CarsDetail from "../minComponents/CarsDetail";
import Background from "../components/background/Background";
import CarCol from "../minComponents/CarCol";
import AllLogo from "../components/AllLogo";
import { motion } from "framer-motion";
import AboutHome from "../components/AboutHome";
import Contact from "../components/Contact";
import Services from "../components/Services";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Home = () => {
  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-gray-100">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Background />
      </div>

      {/* Main Content Container */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 py-12 space-y-16"
        initial="hidden"
        animate="visible"
        variants={{}}
      >
        {/* Section: Heading */}
        <motion.div variants={fadeInUp}>
          <MainHead />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <AboutHome />
        </motion.div>

        {/* Section: Car Highlights */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <CarsDetail />
        </motion.div>

        {/* Section: Featured Car Rotator */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <CarCol />
        </motion.div>

        {/* Section: Logos */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <AllLogo />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Services />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Contact />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
