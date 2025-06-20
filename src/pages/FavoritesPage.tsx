import { useFavoriteItems } from '../hooks/useFavoriteItems';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useRef } from 'react';
import { Item } from '../types/Item';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavoriteItems();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollByAmount = 300;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
  };

  const handleRemove = (id: number) => {
    removeFromFavorites(id);
  };

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const empty = 5 - full;
    return (
      <span className="text-yellow-500 text-sm">
        {'★'.repeat(full)}
        <span className="text-gray-300">{'★'.repeat(empty)}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <ParticlesBackground />
      </div>

      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 z-10 relative">
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-800 text-sm font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>

        <h1 className="text-3xl font-bold mb-6 border-b border-gray-200 pb-2">
          My Favorites
        </h1>

        {favorites.length === 0 ? (
          <p className="text-gray-600">You haven't added anything to favorites yet.</p>
        ) : (
          <>
            {favorites.length > 5 && (
              <>
                <button
                  onClick={scrollLeft}
                  className="hidden md:flex items-center justify-center absolute left-4 top-[50%] transform -translate-y-1/2 bg-white shadow p-2 rounded-full z-20"
                  aria-label="Scroll left"
                >
                  ←
                </button>

                <button
                  onClick={scrollRight}
                  className="hidden md:flex items-center justify-center absolute right-4 top-[50%] transform -translate-y-1/2 bg-white shadow p-2 rounded-full z-20"
                  aria-label="Scroll right"
                >
                  →
                </button>
              </>
            )}

            {/* モバイル横スクロール */}
            <div
              ref={scrollRef}
              className="md:hidden flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 pb-4 px-2"
            >
              {favorites.map(item => (
                <div
                  key={item.id}
                  className="relative min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition-transform"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[3rem]">{item.title}</p>
                  <p className="text-xs text-gray-500">${item.price.toLocaleString()}</p>
                  <div className="mt-1">{renderStars(item.rating || 4)}</div>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="absolute bottom-2 right-2 text-xs text-red-500 underline hover:text-red-600 transition"
                    title="Remove from favorites"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {/* PC・タブレット表示：グリッド */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
              {favorites.map(item => (
                <div
                  key={item.id}
                  className="relative bg-white border rounded-lg p-3 shadow-sm hover:shadow-lg transition-transform"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[3rem]">{item.title}</p>
                  <p className="text-xs text-gray-500">${item.price.toLocaleString()}</p>
                  <div className="mt-1">{renderStars(item.rating || 4)}</div>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="absolute bottom-2 right-2 text-xs text-red-500 underline hover:text-red-600 transition"
                    title="Remove from favorites"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FavoritesPage;
