import { useFavoriteItems } from '../hooks/useFavoriteItems';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';
import ItemCard from '../components/ItemCard';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const FavoritesPage = () => {
  const { favorites } = useFavoriteItems();

  return (
    <div className="font-sans relative min-h-screen flex flex-col">
      {/* 背景パーティクル */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
      </div>

      {/* ヘッダー */}
      <Header />

      {/* メインコンテンツ */}
      <main className="flex-grow z-10 relative max-w-6xl mx-auto px-6 py-12">
        <div className="mb-6">
          <Link
            to="/products"
            className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium transition"
          >
            <FaArrowLeft className="mr-2" />
            Back to Products
          </Link>
        </div>

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

      {/* フッター */}
      <Footer />
    </div>
  );
};

export default FavoritesPage;
