import { useEffect, useState, useRef } from 'react';
import { Item } from '../types/Item';
import { fetchItems } from '../api/itemApi';
import ItemCard from '../components/ItemCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';

const categories = ['curtain', 'mirror', 'plant', 'rug', 'sofa', 'table', 'tvstand', 'chair'];
const colors = ['white', 'black', 'gray', 'beige', 'brown'];

const Products = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [activeCategory, setActiveCategory] = useState('sofa');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    fetchItems().then(data => setItems(data));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cat = entry.target.getAttribute('data-category');
            if (cat) setActiveCategory(cat);
          }
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

      {/* Hero */}
      <section className="relative h-[300px] sm:h-[400px] md:h-[600px] w-full z-10">
      <img src="/img/all-product.jpg" alt="All Products" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-10 md:px-20">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 animate-fadeUp">UP to 20% off</h1>
          <p className="text-white text-lg md:text-xl max-w-xl leading-loose tracking-wide animate-fadeUp [animation-delay:0.3s]">
            Shop the latest collections
          </p>
        </div>
      </section>

      {/* カテゴリーナビ */}
      <nav className="sticky top-0 z-50 bg-white shadow px-4 py-3 flex overflow-x-auto gap-4 whitespace-nowrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => sectionRefs.current[cat]?.scrollIntoView({ behavior: 'smooth' })}
            className={`text-sm font-semibold px-3 py-1 rounded-full transition-colors ${
              activeCategory === cat ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* セクション */}
      <main className="max-w-7xl mx-auto px-4 py-16 space-y-24 z-10 relative">
        {categories.map(cat => {
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
              ref={(el) => {
                sectionRefs.current[cat] = el as HTMLDivElement | null;
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