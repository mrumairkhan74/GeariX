const db = require('../connection/db')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum:['admin','user'],
        default:'user'
    },
    orders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    }
},
    {
        Timestamp: true
    })


const userModel = mongoose.model('userModel', userSchema)

module.exports = userModel