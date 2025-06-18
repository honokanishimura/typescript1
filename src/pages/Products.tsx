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

// All category names
const categories = ['curtain', 'mirror', 'plant', 'rug', 'sofa', 'table', 'tvstand', 'chair'];
// Color filter options
const colors = ['white', 'black', 'gray', 'beige', 'brown'];

const Products = () => {
  // All product data
  const [items, setItems] = useState<Item[]>([]);

  // Show current section's category
  const [activeCategory, setActiveCategory] = useState('sofa');

  // Filter by price
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  // Filter by color
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // For getting each section's position
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Get product list when page opens
  useEffect(() => {
    fetchItems().then(data => setItems(data));
  }, []);

  // Change activeCategory when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // If the section is in the screen
          if (entry.isIntersecting) {
            const cat = entry.target.getAttribute('data-category');
            if (cat) setActiveCategory(cat);
          }
        });
      },
      { threshold: 0.3 } // Show when 30% is visible
    );

    // Watch each section
    categories.forEach(cat => {
      const ref = sectionRefs.current[cat];
      if (ref) observer.observe(ref);
    });

    // Stop watching when page leaves
    return () => observer.disconnect();
  }, [items]);

  // Add or remove color filter
  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color) // Remove color
        : [...prev, color] // Add color
    );
  };

  return (
    <div className="font-sans relative">
      {/* Background animation */}
      <ParticlesBackground />
      {/* Page header */}
      <Header />

      {/* Top hero image section */}
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
            {cat}
          </button>
        ))}
      </nav>

      {/* Product sections by category */}
      <main className="max-w-7xl mx-auto px-4 py-16 space-y-24 z-10 relative">
        {categories.map(cat => {
          // Filter products by category, price, color
          const filtered = items.filter(
            item =>
              item.category?.toLowerCase() === cat.toLowerCase() &&
              item.price / 150 >= minPrice &&
              item.price / 150 <= maxPrice &&
              (selectedColors.length === 0 || selectedColors.includes(item.color?.toLowerCase()))
          );

          // If no item, skip this section
          if (!filtered.length) return null;

          return (
            <section
              key={cat}
              ref={(el) => {
                // Save section DOM element
                sectionRefs.current[cat] = el as HTMLDivElement | null;
              }}
              data-category={cat} // Used to track current section
              className="fade-section opacity-0 animate-fadeInUp relative z-10"
            >
              {/* Category title */}
              <h2 className="text-3xl font-bold mb-8 tracking-tight capitalize">{cat}</h2>

              {/* List of items in this category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filtered.map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Page footer */}
      <RecentViewed />

      <Footer />
    </div>
  );
};

export default Products;
