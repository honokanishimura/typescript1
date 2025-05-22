import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Item } from '../types/Item';
import { fetchItems } from '../api/itemApi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useFavoriteItems } from '../hooks/useFavoriteItems';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ParticlesBackground from '../components/ParticlesBackground';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<Item | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Clay');
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToFavorites } = useFavoriteItems();
  const { addToCart } = useCart();
  const [sortOrder, setSortOrder] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchItems().then(items => {
      const found = items.find(item => Number(item.id) === Number(id));
      setProduct(found);
      setIsLoading(false);
    });
  }, [id]);

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

  const handleAddToCart = () => {
    if (!user) {
      alert('Please login or register first.');
      navigate('/auth');
      return;
    }
    addToCart({ ...product, quantity, addedBy: user.email });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const reviews = [
    { stars: 5, name: 'Alex', text: 'Great product!', date: '2024-02-01' },
    { stars: 4, name: 'Jordan', text: 'Solid quality.', date: '2024-03-01' },
    { stars: 3, name: 'Taylor', text: 'Good enough.', date: '2024-04-01' }
  ];

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

     <ParticlesBackground />
     <div className="relative z-10 min-h-screen flex flex-col">

      <Header />

      <main className="flex-grow max-w-6xl mx-auto px-4 py-10">

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="rounded-lg shadow-md w-full">
            <img src={product.image} alt={product.title} className="w-full h-auto object-cover" />
          </div>

          <div className="flex flex-col space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <div className="text-2xl">
              <span className="line-through text-gray-400 mr-2">${(product.price * 2).toLocaleString()}</span>
              <span className="text-orange-500 font-semibold">${product.price.toLocaleString()}</span>
            </div>

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

            {showSuccess && <div className="text-green-600 text-sm animate-fadeIn">✅ Added to cart!</div>}

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

        {/* Footer and review area */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

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
      </div>
      </main>
      <Footer />
      </div>
    </>
  );
};

export default ProductDetail;
