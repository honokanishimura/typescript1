// This page shows the cart items and order summary
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Minus, Plus, Trash2 } from 'lucide-react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]); // List of items in the cart
  const navigate = useNavigate(); // Navigation tool

  // Load cart items from localStorage when page starts
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  // Change the quantity of an item
  const updateQuantity = (index: number, newQty: number) => {
    if (newQty < 1) return; // Prevent less than 1
    const updated = [...cartItems];
    updated[index].quantity = newQty;
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  // Remove an item from the cart
  const removeItem = (index: number) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  // Calculate prices
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const discount = subtotal >= 200 ? 20 : 0;
  const tax = Math.floor(subtotal * 0.1);
  const total = subtotal + shipping + tax - discount;

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-16 text-gray-900">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Your Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-12 gap-8">
            {/* Left side: list of items */}
            <div className="md:col-span-8 space-y-6">
              {cartItems.map((item, i) => (
                <div key={i} className="flex justify-between border-b pb-6">
                  {/* Left: item image and info */}
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 rounded object-cover border"
                    />
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="font-semibold text-base">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <button
                        onClick={() => removeItem(i)}
                        className="text-sm text-gray-400 hover:text-red-500 mt-1 flex items-center gap-1"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Right: price and quantity */}
                  <div className="text-right space-y-2">
                    <p className="font-semibold text-sm">${item.price.toFixed(2)}</p>
                    <div className="flex items-center border rounded w-fit mx-auto px-2 py-1">
                      <button
                        onClick={() => updateQuantity(i, item.quantity - 1)}
                        className="px-2"
                      >
                        −
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(i, item.quantity + 1)}
                        className="px-2"
                      >
                        ＋
                      </button>
                    </div>
                    <p className="text-sm font-bold text-gray-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right side: total summary */}
            <div className="md:col-span-4 border p-6 rounded bg-gray-50 space-y-4">
              <h2 className="font-bold text-lg">Summary</h2>
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Sales Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount:</span>
                <span>- ${discount.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Grand Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Discount notice */}
              <div className="text-sm text-gray-600 flex justify-between items-center">
                <span>
                  {discount > 0
                    ? 'You unlocked a $20 discount!'
                    : 'Add a coupon at checkout'}
                </span>
              </div>

              <button
                onClick={() => navigate('/confirm')}
                className="w-full mt-4 bg-black text-white py-3 rounded hover:bg-gray-900 transition"
              >
                Confirm Order
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
