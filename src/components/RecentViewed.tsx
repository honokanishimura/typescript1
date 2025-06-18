import { useRecentlyViewed } from '../hooks/useViewedItems';
import { Link } from 'react-router-dom';
import { Item } from '../types/Item';

const RecentViewed = () => {
  const items: Item[] = useRecentlyViewed();

  if (!items.length) return null;

  return (
    <section className="relative z-10 bg-white px-4 py-8"> {/* ← ここ追加 */}
      <h2 className="text-2xl font-bold mb-4">最近見た商品</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {items.map(item => (
          <Link
            to={`/products/${item.id}`}
            key={item.id}
            className="block border p-2 rounded hover:shadow"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded"
            />
            <p className="mt-2 text-sm font-medium text-gray-800">{item.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentViewed;
