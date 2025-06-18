import { Item } from '../types/Item';
import { Link } from 'react-router-dom';
import { saveToRecentlyViewed } from '../hooks/useViewedItems';
import { useFavoriteItems } from '../hooks/useFavoriteItems';
import { useState, useEffect } from 'react';
import { FaHeart as FaHeartIcon, FaRegHeart as FaRegHeartIcon } from 'react-icons/fa'; // ✅ 修正済

type Props = {
  item: Item;
};

const ItemCard = ({ item }: Props) => {
  const stars = Math.floor(item.rating ?? 4);
  const showBadge = item.badge === 'NEW' || item.badge === 'SALE';
  const { addToFavorites, favorites } = useFavoriteItems();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const exists = favorites.some(f => f.id === item.id);
    setLiked(exists);
  }, [favorites, item.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    addToFavorites(item);
    setLiked(true);
  };

  return (
    <Link
      to={`/products/${item.id}`}
      onClick={() => saveToRecentlyViewed(item)}
      className="block"
    >
      <div className="relative bg-white rounded-xl shadow-sm border hover:shadow-md transition duration-300 w-full max-w-[400px] mx-auto flex flex-col">
        
        {/* ❤️ アイコン */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 text-red-500 text-xl z-10 hover:scale-110 transition-transform"
        >
          {liked ? <FaHeartIcon /> : <FaRegHeartIcon />}
        </button>

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
