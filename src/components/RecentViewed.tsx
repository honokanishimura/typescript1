// src/components/RecentViewed.tsx
import { useRecentlyViewed } from '../hooks/useViewedItems';
import { Item } from '../types/Item';

const RecentViewed = () => {
  const items: Item[] = useRecentlyViewed();

  if (!items.length) return null;

  return (
    <section className="px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Recent view</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {items.map(item => (
          <div key={item.id} className="border p-2 rounded">
            <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
            <p className="text-sm">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentViewed;
