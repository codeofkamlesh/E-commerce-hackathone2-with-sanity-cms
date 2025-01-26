interface CartItem {
    productId: string;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;
  }

  const CART_KEY = "ecommerce_cart";

  export const getCart = (): CartItem[] => {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  };

  export const addToCart = (product: CartItem) => {
    const cart = getCart();

    const existingItem = cart.find((item) => item.productId === product.productId);

    if (existingItem) {
      existingItem.quantity += product.quantity; // Increment quantity
    } else {
      cart.push({ ...product });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  };

  export const updateQuantity = (productId: string, quantity: number) => {
    const cart = getCart();

    const updatedCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    return updatedCart; // Return updated cart
  };

  export const removeFromCart = (productId: string) => {
    const cart = getCart();

    const updatedCart = cart.filter((item) => item.productId !== productId);

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    return updatedCart; // Return updated cart
  };
