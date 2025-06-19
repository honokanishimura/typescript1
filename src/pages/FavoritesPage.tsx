import { useFavoriteItems } from '../hooks/useFavoriteItems';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState, useRef } from 'react';
import { Item } from '../types/Item';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavoriteItems();
  const [items, setItems] = useState<Item[]>(favorites);
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
    setItems(prev => prev.filter(item => item.id !== id));
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
      {/* 背景アニメーション */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <ParticlesBackground />
      </div>

      <Header />

      <main className="flex-grow max-w-6xl mx-auto px-6 py-12 z-10 relative">
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

        {items.length === 0 ? (
          <p className="text-gray-600">You haven't added anything to favorites yet.</p>
        ) : (
          <>
            {/* ← → ボタン */}
            <button
              onClick={scrollLeft}
              className="hidden md:flex items-center justify-center absolute left-2 top-[60%] transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-20"
              aria-label="Scroll left"
            >
              ←
            </button>

            <button
              onClick={scrollRight}
              className="hidden md:flex items-center justify-center absolute right-2 top-[60%] transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-20"
              aria-label="Scroll right"
            >
              →
            </button>

            {/* モバイル横スクロール */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-2 px-2 scrollbar-thin scrollbar-thumb-gray-300 md:hidden"
            >
              {items.map(item => (
                <div
                  key={item.id}
                  className="relative min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border rounded-lg p-3 shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[3rem]">
                    {item.title}
                  </p>
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

            {/* PC・タブレット用グリッド */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {items.map(item => (
                <div
                  key={item.id}
                  className="relative bg-white border rounded-lg p-3 shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[3rem]">
                    {item.title}
                  </p>
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
