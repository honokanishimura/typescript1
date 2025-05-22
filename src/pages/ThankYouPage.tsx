import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ThankYouPage = () => {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-16 text-center text-gray-900">
        <h1 className="text-4xl font-bold text-orange-500 mb-6">Thank you for your purchase!</h1>
        <p className="text-gray-700 mb-6">We’ve received your order.</p>
        <Link
          to="/products"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Continue Shopping
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default ThankYouPage;
