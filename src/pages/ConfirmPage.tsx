// ConfirmPage.tsx — Final order confirmation page for reviewing cart, entering shipping info, and placing the order

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';
import { postOrder } from '../api/orderApi';

const ConfirmPage = () => {
  const navigate = useNavigate();

  //  Cart 
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Load logged-in user data from localStorage
  const user = JSON.parse(localStorage.getItem('authUser') || '{}');

  // Initialize form handling and validation with react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Load cart data from localStorage when the component mounts
  useEffect(() => {
    const stored = localStorage.getItem('cart'); // Get cart & from localStorage
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  // Handle order submission when the form is submitted
  const onSubmit = () => {
    const newOrder = {
      userId: user?.id,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    // Send the order to the backend and clear the cart after success
    postOrder(newOrder).then(() => {
      localStorage.removeItem('cart'); // Remove cart

      navigate('/order-history'); // Go to history page
    });
  };

  // Calculate total price of items in cart
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // List of countries for shipping selection
  const countries = [
    "Japan", "United States", "United Kingdom", "Canada", "Germany", "France", "Australia", "Brazil",
    "China", "India", "Italy", "Korea", "Netherlands", "Norway", "Mexico", "Spain", "Sweden", "Thailand", "Vietnam", "Singapore",
    "Belgium", "Switzerland", "South Africa", "Russia", "Argentina", "Indonesia", "Malaysia", "Philippines", "Turkey",
    "Finland", "Poland", "Austria", "Denmark", "New Zealand", "Ireland", "Portugal", "Hungary", "Greece", "Czech Republic",
    "Saudi Arabia", "Israel", "United Arab Emirates", "Ukraine", "Romania", "Chile", "Egypt", "Pakistan", "Bangladesh", "Peru",
    "Others"
  ];

  return (
    <>
      <ParticlesBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow max-w-6xl mx-auto px-4 py-10">
          <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">

            {/* Main order confirmation form */}
            <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded shadow-lg">

              {/* Left column: Order summary section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <ul className="divide-y">
                  {cartItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 py-4">
                      <img src={item.image} alt={item.title} className="w-16 h-16 rounded object-cover" />
                      <div className="flex-1">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-500">× {item.quantity}</p>
                      </div>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                  <li className="flex justify-between pt-4 font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </li>
                </ul>
              </div>

              {/* Right column: Shipping and payment form */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Shipping & Payment</h2>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("name", { required: true })}
                    className="w-full border px-4 py-2 rounded"
                  />
                  {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                    className="w-full border px-4 py-2 rounded"
                  />
                  {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

                  <input
                    type="text"
                    placeholder="Phone Number"
                    {...register("phone", { required: true })}
                    className="w-full border px-4 py-2 rounded"
                  />
                  {errors.phone && <p className="text-red-500 text-sm">Phone is required</p>}

                  <select {...register("country", { required: true })} className="w-full border px-4 py-2 rounded">
                    <option value="">Select Country</option>
                    {countries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.country && <p className="text-red-500 text-sm">Country is required</p>}

                  <input
                    type="text"
                    placeholder="Shipping Address"
                    {...register("address", { required: true })}
                    className="w-full border px-4 py-2 rounded"
                  />
                  {errors.address && <p className="text-red-500 text-sm">Address is required</p>}

                  <input
                    type="text"
                    placeholder="Card Number"
                    {...register("cardNumber", { required: true })}
                    className="w-full border px-4 py-2 rounded"
                  />

                  {/* Expiry and CVC fields side by side */}
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      {...register("expiry", { required: true })}
                      className="w-1/2 border px-4 py-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      {...register("cvc", { required: true })}
                      className="w-1/2 border px-4 py-2 rounded"
                    />
                  </div>

                  {/* Credit card brand icons */}
                  <div className="flex gap-3 mt-4">
                    {["amex", "applepay", "visa", "paypal"].map((brand) => (
                      <img key={brand} src={`/img/${brand}.png`} alt={brand} className="h-8 object-contain" />
                    ))}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="mt-8 w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
                  >
                    Pay ${total.toFixed(2)}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ConfirmPage;
