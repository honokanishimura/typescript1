// src/pages/FavoritesPage.tsx
import { useFavoriteItems } from '../hooks/useFavoriteItems';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';
import ItemCard from '../components/ItemCard';

const FavoritesPage = () => {
  const { favorites } = useFavoriteItems();

  return (
    <div className="font-sans relative">
      <ParticlesBackground />
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-12 z-10 relative">
        <h1 className="text-2xl font-bold mb-6">My Favorites</h1>

        {favorites.length === 0 ? (
          <p className="text-gray-600">You haven't added anything to favorites yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FavoritesPage;
