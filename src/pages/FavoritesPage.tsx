import { useFavoriteItems } from '../hooks/useFavoriteItems';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';
import ItemCard from '../components/ItemCard';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const FavoritesPage = () => {
  const { favorites } = useFavoriteItems();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {/* 背景アニメーション */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <ParticlesBackground />
      </div>

      {/* ヘッダー */}
      <Header />

      {/* メイン */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-12 z-10 relative">
        {/* 戻るボタン */}
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-800 text-sm font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>

        {/* タイトル */}
        <h1 className="text-2xl font-bold mb-6">My Favorites</h1>

        {/* お気に入り一覧 */}
        {favorites.length === 0 ? (
          <p className="text-gray-600">You haven't added anything to favorites yet.</p>
        ) : (
          <div className="md:grid md:grid-cols-3 gap-6 overflow-hidden">
  {/* スマホ用 横スクロール */}
  <div className="flex md:block gap-4 overflow-x-auto scrollbar-hide">
    {favorites.map((item) => (
      <div key={item.id} className="min-w-[250px] flex-shrink-0 md:min-w-0 md:flex-shrink md:mb-4">
        <ItemCard item={item} />
      </div>
    ))}
  </div>
</div>

        )}
      </main>

      {/* フッター */}
      <Footer />
    </div>
  );
};

export default FavoritesPage;
