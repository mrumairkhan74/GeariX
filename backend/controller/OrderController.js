const orderModel = require('../models/OrderModel');
const carModel = require('../models/CarModel');

// Add Car to Cart
const addToCart = async (req, res) => {
  try {
    const { userID, carID } = req.body;

    let userOrder = await orderModel.findOne({ userID });

    if (!userOrder) {
      userOrder = await orderModel.create({
        userID,
        cars: [{ carID, status: 'cart' }]
      });
    } else {
      userOrder.cars.push({ carID, status: 'cart' });
      await userOrder.save();
    }

    res.status(201).json({ message: 'Car added to cart', order: userOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View Cart
const viewCart = async (req, res) => {
  try {
    const { userID } = req.params;

    const cart = await orderModel.findOne({ userID }).populate('cars.carID');

    if (!cart) return res.status(404).json({ message: 'No cart found for user' });

    const cartItems = cart.cars.filter(c => c.status === 'cart');

    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Place Order (convert cart items to ordered)
const placeOrder = async (req, res) => {
  try {
    const { userID } = req.body;

    const userOrder = await orderModel.findOne({ userID });

    if (!userOrder) return res.status(404).json({ message: 'No cart found for user' });

    userOrder.cars = userOrder.cars.map(c =>
      c.status === 'cart' ? { ...c.toObject(), status: 'ordered' } : c
    );

    await userOrder.save();

    res.status(200).json({ message: 'Order placed successfully', order: userOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View All Orders (admin or user)
const viewAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().populate('userID').populate('cars.carID');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove Car from Cart
const removeFromCart = async (req, res) => {
  try {
    const { userID, carID } = req.params;

    const userOrder = await orderModel.findOne({ userID });

    if (!userOrder) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const carIndex = userOrder.cars.findIndex(
      c => c.carID.toString() === carID && c.status === 'cart'
    );

    if (carIndex === -1) {
      return res.status(404).json({ message: 'Car not found in cart' });
    }

    userOrder.cars.splice(carIndex, 1);
    await userOrder.save();

    res.status(200).json({ message: 'Car removed from cart', order: userOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  addToCart,
  viewCart,
  placeOrder,
  viewAllOrders,
  removeFromCart
};
