const carModel = require('../models/CarModel');

// Create a new car
const createCar = async (req, res) => {
    try {
        const {
            name,
            model,
            year,
            color,
            registrationNumber,
            mileage,
            fuelType,
            transmission,
            price
        } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "Image file is required" });
        }

        const car = await carModel.create({
            name,
            model,
            year,
            color,
            registrationNumber,
            mileage,
            fuelType,
            transmission,
            price,
            image: req.file.buffer
        });

        return res.status(201).json({ message: "Car created successfully", car });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Get all cars
const getCar = async (req, res) => {
    try {
        const cars = await carModel.find();

        if (!cars.length) {
            return res.status(404).json({ message: "No cars available" });
        }

        const carsWithBase64 = cars.map(car => ({
            ...car.toObject(),
            images: car.images ? `data:image/jpeg;base64,${car.images.toString('base64')}` : null
        }));

        res.status(200).json({
            message: "Cars fetched successfully",
            cars: carsWithBase64
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Get car by ID
const getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await carModel.findById(id);

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        const carWithImage = {
            ...car.toObject(),
            images: car.image ? car.image.toString('base64') : null,
        };

        return res.status(200).json({ car: carWithImage });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Update car details
const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const car = await carModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!car) {
            return res.status(404).json({ error: "Car not found" });
        }

        return res.status(200).json({ message: "Car updated successfully", car });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Delete a car
const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await carModel.findByIdAndDelete(id);

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        return res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCar,
    getCar,
    getCarById,
    updateCar,
    deleteCar
};
