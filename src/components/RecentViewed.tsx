import { useRecentlyViewed } from '../hooks/useViewedItems';
import { Link } from 'react-router-dom';
import { Item } from '../types/Item';

const RecentViewed = () => {
  const items: Item[] = useRecentlyViewed();

  if (!items.length) return null;

  return (
    <section className="relative z-10 bg-white px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">最近見た商品</h2>

      {/* 横スクロールスライダー */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {items.map(item => (
          <Link
            to={`/products/${item.id}`}
            key={item.id}
            className="min-w-[180px] flex-shrink-0 bg-white border rounded-lg p-2 shadow-sm transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-32 object-cover rounded"
            />
            <p className="mt-2 text-sm font-semibold text-gray-800">{item.title}</p>
            <p className="text-xs text-gray-600">${item.price.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentViewed;
