import { useRecentlyViewed, removeFromRecentlyViewed } from '../hooks/useViewedItems';
import { Link } from 'react-router-dom';
import { Item } from '../types/Item';
import { useRef, useState } from 'react';

const RecentViewed = () => {
  const initialItems: Item[] = useRecentlyViewed();
  const [items, setItems] = useState(initialItems);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!items.length) return null;

  const scrollByAmount = 300;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
  };

  const handleRemoveItem = (id: number) => {
    removeFromRecentlyViewed(id);
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <span className="text-yellow-500 text-sm">
        {'★'.repeat(fullStars)}
        <span className="text-gray-300">{'★'.repeat(emptyStars)}</span>
      </span>
    );
  };

  return (
    <section className="relative z-10 bg-white px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 border-b border-gray-200 pb-2">
        Recently Viewed
      </h2>

      {/* ← → ナビゲーション */}
      <button
        onClick={scrollLeft}
        className="hidden md:flex items-center justify-center absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-20"
        aria-label="Scroll left"
      >
        ←
      </button>
      <button
        onClick={scrollRight}
        className="hidden md:flex items-center justify-center absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-20"
        aria-label="Scroll right"
      >
        →
      </button>

      {/* カード一覧 */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 px-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scroll-smooth"
      >
        {items.map(item => (
          <div
            key={item.id}
            className="relative min-w-[180px] max-w-[180px] flex-shrink-0 bg-white border rounded-lg p-3 shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <Link to={`/products/${item.id}`}>
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
            </Link>

            {/* 🗑️ 個別削除ボタン（右下） */}
            <button 
             onClick={() => handleRemoveItem(item.id)}
             className="absolute bottom-2 right-2 text-xs text-red-500 underline hover:text-red-600 transition"
             title="Remove from history" 
            >
            Delete
            </button>

          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentViewed;
