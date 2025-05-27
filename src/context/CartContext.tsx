// Import basic React tools and types
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Item } from '../types/Item';

// Define the shape of a cart item (item + quantity + who added it)
export type CartItem = Item & {
  quantity: number;
  addedBy: string;
};

// Define what the cart context will provide
type CartContextType = {
  cartItems: CartItem[]; // all items in the cart
  isCartReady: boolean; // check if cart loaded from localStorage
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
};

// Create the cart context (shared global state)
const CartContext = createContext<CartContextType | undefined>(undefined);

// Main cart provider to wrap the app
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // cart items state
  const [isCartReady, setIsCartReady] = useState(false); // flag to confirm load done

  // Load cart from localStorage on first render
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCartItems([]);
    } finally {
      setIsCartReady(true); // ✅ finish loading
    }
  }, []);

  // Save cart to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart. If item exists, just update quantity
  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item]; // if not found, add new
    });
  };

  // Remove one item by ID
  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Change quantity of a specific item
  const updateItemQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Clear all items in cart
  const clearCart = () => setCartItems([]);

  // Calculate total price of all items
  const getTotalPrice = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartReady,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context in components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
