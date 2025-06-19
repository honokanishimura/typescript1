import { useRecentlyViewed } from '../hooks/useViewedItems';
import { Link } from 'react-router-dom';
import { Item } from '../types/Item';
import { useRef } from 'react';

const RecentViewed = () => {
  const items: Item[] = useRecentlyViewed();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!items.length) return null;

  const scrollByAmount = 300;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
  };

  return (
    <section className="relative z-10 bg-white px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 border-b border-gray-200 pb-2">
        Recently Viewed Products
      </h2>

      {/* ← → ナビゲーションボタン（PCのみ表示） */}
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

      {/* 横スクロールエリア */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 px-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scroll-smooth"
      >
        {items.map(item => (
          <Link
            to={`/products/${item.id}`}
            key={item.id}
            className="min-w-[180px] max-w-[180px] flex-shrink-0 bg-white border rounded-lg p-3 shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <p className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[3rem]">
              {item.title}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              ${item.price.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentViewed;
