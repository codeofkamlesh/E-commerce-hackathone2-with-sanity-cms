interface CartItem {
  productId: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const CART_KEY = "ecommerce_cart";

// Check if we're running on the client side before accessing localStorage
const isBrowser = typeof window !== "undefined";

export const getCart = (): CartItem[] => {
  if (isBrowser) {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }
  return []; // Return an empty array when server-side
};

export const addToCart = (product: CartItem) => {
  if (isBrowser) {
    const cart = getCart();
    const existingItem = cart.find((item) => item.productId === product.productId);

    if (existingItem) {
      existingItem.quantity += product.quantity; // Increment quantity
    } else {
      cart.push({ ...product });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
};

export const updateQuantity = (productId: string, quantity: number) => {
  if (isBrowser) {
    const cart = getCart();
    const updatedCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    return updatedCart; // Return updated cart
  }
  return []; // Return empty array if not in the browser
};

export const removeFromCart = (productId: string) => {
  if (isBrowser) {
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.productId !== productId);

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    return updatedCart; // Return updated cart
  }
  return []; // Return empty array if not in the browser
};
