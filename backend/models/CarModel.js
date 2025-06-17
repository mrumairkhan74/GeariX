const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    color: {
        type: String
    },
    registrationNumber: {
        type: String,
        unique: true,
        required: true
    },
    mileage: {
        type: Number
    },
    fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
        required: true
    },
    transmission: {
        type: String,
        enum: ['Manual', 'Automatic'],
        required: true
    },
    image: {
        type: Buffer
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    orderByPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    }

})


const carModel = mongoose.model('carModel', carSchema)

module.exports = carModel