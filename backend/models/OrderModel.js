const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    },
    cars: [
        {
            carID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'carModel',
                required: true
            },
            status: {
                type: String,
                enum: ['cart', 'ordered'],
                default: 'cart'
            }
        }
    ]

}, { timestamps: true })
const orderModel = mongoose.model('order', orderSchema)

module.exports = orderModel

