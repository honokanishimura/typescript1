// React tools
import { useEffect, useState, useRef } from 'react';
// Product data type
import { Item } from '../types/Item';
// Get all product data from API
import { fetchItems } from '../api/itemApi';
// Component to show each product card
import ItemCard from '../components/ItemCard';
// Page layout parts
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecentViewed from '../components/RecentViewed';
// Background animation
import ParticlesBackground from '../components/ParticlesBackground';

// All category names + recentを追加
const categories = ['recent', 'curtain', 'mirror', 'plant', 'rug', 'sofa', 'table', 'tvstand', 'chair'];
const colors = ['white', 'black', 'gray', 'beige', 'brown'];

const Products = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [activeCategory, setActiveCategory] = useState('sofa');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // ✅ 型を明示して安全に
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    fetchItems().then(data => setItems(data));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const cat = entry.target.getAttribute('data-category');
          if (entry.isIntersecting && cat) setActiveCategory(cat);
        });
      },
      { threshold: 0.3 }
    );

    categories.forEach(cat => {
      const ref = sectionRefs.current[cat];
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [items]);

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  return (
    <div className="font-sans relative">
      <ParticlesBackground />
      <Header />

      <section className="relative h-[300px] sm:h-[400px] md:h-[600px] w-full z-10">
        <img src="/img/all-product.jpg" alt="All Products" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-10 md:px-20">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 animate-fadeUp">UP to 20% off</h1>
          <p className="text-white text-lg md:text-xl max-w-xl leading-loose tracking-wide animate-fadeUp [animation-delay:0.3s]">
            Shop the latest collections
          </p>
        </div>
      </section>

      {/* Category tab buttons */}
      <nav className="sticky top-0 z-50 bg-white shadow px-4 py-3 flex overflow-x-auto gap-4 whitespace-nowrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => sectionRefs.current[cat]?.scrollIntoView({ behavior: 'smooth' })}
            className={`text-sm font-semibold px-3 py-1 rounded-full transition-colors ${
              activeCategory === cat ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {cat === 'recent' ? 'Recent' : cat}
          </button>
        ))}
      </nav>

      {/* ✅ 最近見た商品セクション */}
      <section
        ref={(el: HTMLDivElement | null) => {
          sectionRefs.current["recent"] = el;
        }}
        data-category="recent"
        className="relative z-10"
      >
        <RecentViewed />
      </section>

      {/* 商品カテゴリー別セクション */}
      <main className="max-w-7xl mx-auto px-4 py-16 space-y-24 z-10 relative">
        {categories
          .filter(cat => cat !== 'recent')
          .map(cat => {
            const filtered = items.filter(
              item =>
                item.category?.toLowerCase() === cat.toLowerCase() &&
                item.price / 150 >= minPrice &&
                item.price / 150 <= maxPrice &&
                (selectedColors.length === 0 || selectedColors.includes(item.color?.toLowerCase()))
            );

            if (!filtered.length) return null;

            return (
              <section
                key={cat}
                ref={(el: HTMLDivElement | null) => {
                  sectionRefs.current['cat'] = el;
                }}
                data-category={cat}
                className="fade-section opacity-0 animate-fadeInUp relative z-10"
              >
                <h2 className="text-3xl font-bold mb-8 tracking-tight capitalize">{cat}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {filtered.map(item => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            );
          })}
      </main>

      <Footer />
    </div>
  );
};

export default Products;
