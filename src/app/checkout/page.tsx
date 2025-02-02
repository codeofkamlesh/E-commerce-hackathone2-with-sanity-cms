"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getCart } from "../../Utils/cartUtils";
import Image from "next/image";

// Define the form schema using Zod
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

// Define the CartItem interface
interface CartItem {
  productId: string;
  imageUrl: string;
  title: string;
  price: number;
  quantity: number;
}

const Checkout = () => {
  const cart = useState<CartItem[]>(getCart())[0]; // Using state but only getting cart
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      zipCode: "",
      city: "",
      country: "",
    },
  });

  // Calculate subtotal, discount, and total
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = 0; // Define your discount logic here
  const total = subtotal - discount; // Add shipping/tax if needed

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const orderData = {
        _type: "order",
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        zipCode: values.zipCode,
        city: values.city,
        country: values.country,
        cartItems: cart.map((item) => ({
          _type: "reference",
          _ref: item.productId,
          _key: item.productId, // Add a unique _key for each item
        })),
        total,
        discount,
        status: "pending",
        orderDate: new Date().toISOString(),
      };

      // Send the order data to the API route
      const response = await fetch("/api/submitOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setIsOrderPlaced(true); // Show success pop-up
        localStorage.removeItem("appliedDiscount"); // Clear discount from localStorage
      } else {
        const errorData = await response.json();
        console.error("Failed to submit order:", errorData);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div className="flex justify-center p-5 gap-5">
      {/* Cart Items Section */}
      <div className="flex-1 p-5 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between mb-5 p-5 border rounded-lg"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={80}
                height={80}
                className="rounded-lg"
              />
              <div className="flex-grow ml-5">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
        <div className="mt-5">
          <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        </div>
      </div>

      {/* Checkout Form Section */}
      <div className="flex-1 p-5 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5">Checkout</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              {/* Zip Code */}
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Zip Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* City */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Country */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">
              Place Order
            </Button>
          </form>
        </Form>
      </div>

      {/* Order Placed Pop-up */}
      {isOrderPlaced && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <svg
              className="mx-auto mb-4 w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
            <Button
              onClick={() => setIsOrderPlaced(false)}
              className="bg-teal-500 hover:bg-teal-600"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
