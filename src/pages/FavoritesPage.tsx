// src/pages/FavoritesPage.tsx
import { useFavoriteItems } from '../hooks/useFavoriteItems';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavoriteItems();

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-6">My Favorites</h1>

        {favorites.length === 0 ? (
          <p className="text-gray-600">You haven't added anything to favorites yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 shadow">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded mb-2" />
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-orange-600 font-medium">¥{item.price.toLocaleString()}</p>
                <div className="flex justify-between items-center mt-3">
                  <Link to={`/product/${item.id}`} className="text-blue-600 text-sm underline">View Details</Link>
                  <button
                    onClick={() => removeFromFavorites(item.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FavoritesPage;
