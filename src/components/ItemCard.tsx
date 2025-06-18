import { Item } from '../types/Item';
import { Link } from 'react-router-dom';
import { saveToRecentlyViewed } from '../hooks/useViewedItems';

type Props = {
  item: Item;
};

const ItemCard = ({ item }: Props) => {
  const stars = Math.floor(item.rating ?? 4);
  const showBadge = item.badge === 'NEW' || item.badge === 'SALE';

  return (
    <Link
      to={`/products/${item.id}`}
      onClick={() => saveToRecentlyViewed(item)} // ✅ 関数の中に移動
      className="block"
    >
      <div className="relative bg-white rounded-xl shadow-sm border hover:shadow-md transition duration-300 w-full max-w-[400px] mx-auto flex flex-col">
        {showBadge && (
          <span
            className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded ${
              item.badge === 'NEW'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {item.badge}
          </span>
        )}

        <div className="w-full h-[300px] overflow-hidden rounded-t-xl">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="p-5 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {item.description}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-orange-600 font-bold text-lg">
              ${item.price.toLocaleString()}
            </p>
            <div className="text-yellow-400 text-sm">
              {'★'.repeat(stars)}
              {'☆'.repeat(5 - stars)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
