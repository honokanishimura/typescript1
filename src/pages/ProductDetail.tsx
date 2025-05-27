// Get product ID from URL, and allow page move
import { useParams, useNavigate } from 'react-router-dom';
// React tools
import { useEffect, useState } from 'react';
// Type of product data
import { Item } from '../types/Item';
// Function to get product list from API
import { fetchItems } from '../api/itemApi';
// Page parts
import Header from '../components/Header';
import Footer from '../components/Footer';
// Favorite and cart hooks
import { useFavoriteItems } from '../hooks/useFavoriteItems';
import { useCart } from '../context/CartContext';
// Auth (check login user)
import { useAuth } from '../context/AuthContext';
// Particle animation
import ParticlesBackground from '../components/ParticlesBackground';

const ProductDetail = () => {
  // Get product ID from URL
  const { id } = useParams<{ id: string }>();

  // For moving pages
  const navigate = useNavigate();

  // Get login user
  const { user } = useAuth();

  // Product info
  const [product, setProduct] = useState<Item | undefined>();

  // Number of items to buy
  const [quantity, setQuantity] = useState(1);

  // Selected color
  const [selectedColor, setSelectedColor] = useState('Clay');

  // Show success message after add to cart
  const [showSuccess, setShowSuccess] = useState(false);

  // Add to favorite
  const { addToFavorites } = useFavoriteItems();

  // Add to cart
  const { addToCart } = useCart();

  // Review sort and search
  const [sortOrder, setSortOrder] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  // Show loading animation
  const [isLoading, setIsLoading] = useState(true);

  // Load product data when page opens
  useEffect(() => {
    fetchItems().then(items => {
      // Find the product with matching ID
      const found = items.find(item => Number(item.id) === Number(id));
      setProduct(found);
      setIsLoading(false);
    });
  }, [id]);

  // If still loading, show loading message
  if (isLoading) {
    return (
      <>
        <ParticlesBackground className="absolute z-0 pointer-events-none" />
        <div className="min-h-screen flex items-center justify-center text-gray-500 animate-pulse">
          Loading product details...
        </div>
      </>
    );
  }

  // If product is not found
  if (!product) {
    return (
      <>
        <ParticlesBackground className="absolute z-0 pointer-events-none" />
        <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
          ❌ Sorry, product not found.
        </div>
      </>
    );
  }

  // Add product to cart
  const handleAddToCart = () => {
    // If user is not logged in, ask to login
    if (!user) {
      alert('Please login or register first.');
      navigate('/auth');
      return;
    }
    // Add product to cart with user email
    addToCart({ ...product, quantity, addedBy: user.email });
    // Show ✅ message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // Simple review data
  const reviews = [
    { stars: 5, name: 'Alex', text: 'Great product!', date: '2024-02-01' },
    { stars: 4, name: 'Jordan', text: 'Solid quality.', date: '2024-03-01' },
    { stars: 3, name: 'Taylor', text: 'Good enough.', date: '2024-04-01' }
  ];

  // Search and sort reviews
  const filteredReviews = reviews
    .filter(r => r.text.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortOrder === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortOrder === 'highest') return b.stars - a.stars;
      if (sortOrder === 'lowest') return a.stars - b.stars;
      return 0;
    });

  return (
    <>
      {/* Background animation */}
      <ParticlesBackground />

      {/* Whole page */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top header */}
        <Header />

        {/* Main product content */}
        <main className="flex-grow max-w-6xl mx-auto px-4 py-10">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Product image */}
            <div className="rounded-lg shadow-md w-full">
              <img src={product.image} alt={product.title} className="w-full h-auto object-cover" />
            </div>

            {/* Product details */}
            <div className="flex flex-col space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

              {/* Show price with discount */}
              <div className="text-2xl">
                <span className="line-through text-gray-400 mr-2">${(product.price * 2).toLocaleString()}</span>
                <span className="text-orange-500 font-semibold">${product.price.toLocaleString()}</span>
              </div>

              {/* Choose product color */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Finish: <span className="text-black">{selectedColor}</span>
                </p>
                <div className="flex gap-2">
                  {['Clay', 'Ivory', 'Navy'].map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  ))}
                </div>
              </div>

              {/* Choose quantity and add to cart */}
              <div className="flex flex-wrap gap-3 items-center">
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border px-3 py-2 rounded text-sm"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>

                <button
                  onClick={handleAddToCart}
                  className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md shadow-sm text-sm"
                >
                  Add
                </button>
              </div>

              {/* Success message after adding */}
              {showSuccess && <div className="text-green-600 text-sm animate-fadeIn">✅ Added to cart!</div>}

              {/* Navigation buttons */}
              <div className="mt-8 flex flex-col gap-3 w-full">
                <button
                  onClick={() => navigate('/products')}
                  className="border border-gray-300 hover:border-orange-500 text-gray-700 hover:text-orange-500 px-5 py-2 rounded-md shadow-sm text-sm w-full"
                >
                  ← Shop
                </button>
                <button
                  onClick={() => navigate('/cart')}
                  className="border border-orange-400 hover:border-orange-500 text-gray-700 hover:text-orange-500 px-5 py-2 rounded-md shadow-sm text-sm w-full"
                >
                  Cart →
                </button>
              </div>
            </div>
          </div>

          {/* Review section */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

            {/* Search and sort */}
            <div className="flex flex-wrap gap-4 mb-6">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm w-full max-w-sm"
              />
            </div>

            {/* Review list */}
            {filteredReviews.length === 0 ? (
              <p className="text-gray-500 text-sm">No reviews yet.</p>
            ) : (
              <div className="space-y-6">
                {filteredReviews.map((review, idx) => (
                  <div key={idx} className="flex items-start gap-4 border-t pt-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-orange-400 text-sm">{'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}</div>
                      <p className="text-sm text-gray-800">{review.text}</p>
                      <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Page footer */}
        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;
