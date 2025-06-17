const express = require('express');
const router = express.Router();
const orderController = require('../controller/OrderController');

router.post('/add', orderController.addToCart);
router.get('/:userID', orderController.viewCart);
router.post('/place', orderController.placeOrder);
router.get('/all', orderController.viewAllOrders);
router.delete('/remove/:userID/:carID', orderController.removeFromCart);



module.exports = router;
