import React from "react";
import Image from "next/image";
import { FaHeart, FaTrashAlt } from "react-icons/fa";

// Props ke liye type define karna
type CartItemProps = {
  imageSrc: string;
  title: string;
  description: string;
  size: string;
  quantity: number;
  price: number;
};

const CartItem: React.FC<CartItemProps> = ({
  imageSrc,
  title,
  description,
  size,
  quantity,
  price,
}) => (
  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 p-4 border-b border-gray-200">
    <Image
      src={imageSrc}
      alt={title}
      width={120}
      height={120}
      className="rounded-md object-cover"
    />
    <div className="flex-grow space-y-2 text-center sm:text-left">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-sm">
        Size: {size} &nbsp; Quantity: {quantity}
      </p>
    </div>
    <div className="flex sm:flex-col justify-between items-center sm:items-end space-x-4 sm:space-x-0 sm:space-y-2">
      <div className="flex space-x-2">
        <button className="text-gray-500 hover:text-gray-700">
          <FaHeart />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <FaTrashAlt />
        </button>
      </div>
      <div className="font-semibold">MRP: ${price}</div>
    </div>
  </div>
);

const Cart = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold p-4 border-b border-gray-200">
            Bag
          </h2>
          <CartItem
            imageSrc="/orchair.jpg"
            title="Library Stool Chair"
            description="Ashen Slate/Cobalt Bliss"
            size="L"
            quantity={1}
            price={99}
          />
          <CartItem
            imageSrc="/Frame.jpg"
            title="Library Stool Chair"
            description="Ashen Slate/Cobalt Bliss"
            size="L"
            quantity={1}
            price={99}
          />
        </div>
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-4 h-fit">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$198.00</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Delivery & Handling</span>
              <span>Free</span>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>$198.00</span>
          </div>
          <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors">
            Member Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;