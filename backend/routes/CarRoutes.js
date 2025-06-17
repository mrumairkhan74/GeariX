const express = require('express')
const router = express.Router();
const { createCar, updateCar, deleteCar, getCar, getCarById } = require('../controller/CarController')
const upload = require('../config/upload')


router.get('/get', getCar)
router.get('/get/:id', getCarById)
router.post('/create', upload.single('image'), createCar)
router.put('/update/:id', updateCar)
router.delete('/delete/:id', deleteCar)

module.exports = router