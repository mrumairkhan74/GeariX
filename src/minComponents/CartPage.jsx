import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";

const apiUrl = import.meta.env.VITE_BACKEND_API;

const CartPage = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    const fetchCart = async () => {
      try {
        const res = await axios.get(`${apiUrl}/cart/${user._id}`);
        setCartItems(res.data);
      } catch (err) {
        console.error("Failed to load cart", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  const handleRemove = async (cartItemId) => {
    try {
      await axios.delete(`${apiUrl}/order/remove/${userID}/${carID}`);

      setCartItems((prev) => prev.filter((item) => item._id !== cartItemId));
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.carID?.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>

      {loading ? (
        <Loading />
      ) : cartItems.length === 0 ? (
        <p className="text-xl text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white shadow p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`data:image/jpeg;base64,${item.carID?.image} ` || "/placeholder.jpg"}
                    alt={item.carID?.name || "Car"}
                    loading="lazy"
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{item.carID?.name}</h3>
                    <p className="text-gray-600">Price: ${item.carID?.price}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="text-right mt-6">
            <p className="text-2xl font-bold">Total: ${total}</p>
            <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
