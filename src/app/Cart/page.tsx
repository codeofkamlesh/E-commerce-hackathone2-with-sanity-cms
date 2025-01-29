"use client";
import Image from "next/image"; // Import the Image component from Next.js
import { getCart, updateQuantity, removeFromCart } from "../../Utils/cartUtils";
import { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState(getCart());

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity > 0) {
      const updatedCart = updateQuantity(productId, quantity);
      setCart(updatedCart);
    }
  };

  const handleRemoveItem = (productId: string) => {
    const updatedCart = removeFromCart(productId);
    setCart(updatedCart);
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="flex justify-center p-5 gap-5 w-full">
      <div className="flex w-full flex-wrap">
        {/* Bag Section */}
        <div className="flex-3 p-5 w-3/4 h-full mt-5 mb-5 bg-white rounded-lg">
          <h2 className="text-2xl font-bold mb-5">Shopping Bag</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.productId}
                className="flex flex-wrap justify-between bg-white text-black mb-5 p-5 rounded-lg gap-5"
              >
                <Image
                  src={item.imageUrl} // Ensure `imageUrl` exists in your product data
                  alt={item.title}
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-lg"
                />
                <div className="flex-grow ml-5">
                  <h3 className="text-lg text-gray-800 font-semibold">{item.title}</h3>
                  <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                  <p className="text-gray-600">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.productId, parseInt(e.target.value))
                    }
                    className="w-16 border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Section */}
        <div className="flex-1 w-1/4 text-black p-5 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-bold mb-5">Order Summary</h2>
          <p className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${subtotal.toFixed(2)}</span>
          </p>
          <button className="w-full py-3 mt-4 bg-teal-500 text-white rounded-full text-lg hover:bg-teal-600">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;