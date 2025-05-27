import { useEffect, useRef, useState } from 'react';
import { fetchItems } from '../api/itemApi';
import { Item } from '../types/Item';
import ItemCard from '../components/ItemCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReviewCarousel from '../components/ReviewCarousel';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck,
  faUndoAlt,
  faHeadset,
  faShieldAlt,
} from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [bestsellers, setBestsellers] = useState<Item[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const categoryImages: Record<string, string> = {
    Table: '/img/table_6.jpg',
    Chair: '/img/chair_1.jpg',
    Curtain: '/img/curtain_1.jpg',
    Rug: '/img/rug_7.jpg',
    Mirror: '/img/mirror_7.jpg',
    TVstand: '/img/tvstand_1.jpg',
    Plants: '/img/plant_1.jpg',
    Sofa: '/img/sofa_4.jpg',
  };


  const bestsellerImages: Record<string, string> = {
    Table: '/img/table_5.jpg',
    Chair: '/img/chair_3.jpg',
    Curtain: '/img/curtain_2.jpg',
    Rug: '/img/rug_5.jpg',
    Mirror: '/img/mirror_2.jpg',
    TVstand: '/img/tvstand_4.jpg',
    Plants: '/img/plant_2.jpg',
    Sofa: '/img/sofa_1.jpg',
  };

  const { ref: bestsellerRef, inView: bestsellerInView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const { ref: categoryRef, inView: categoryInView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const { ref: categoryGridRef, inView: categoryGridInView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const { ref: serviceRef, inView: serviceInView } = useInView({ triggerOnce: false, threshold: 0.1 });

 
  useEffect(() => {  // Use Api
    fetchItems().then((data) => {
      setItems(data);
      const picked = pickRandomPerCategory(data); // By category
      setBestsellers(picked);
    });
  }, []);

  const pickRandomPerCategory = (allItems: Item[]): Item[] => {
    const categories = ['curtain', 'mirror', 'rug', 'sofa', 'chair', 'table', 'tvstand', 'plant'];
    let selected: Item[] = [];

    // picks one random item from each category and saves
    categories.forEach(cat => {
      const filtered = allItems.filter(item => item.category.toLowerCase() === cat);
      if (filtered.length > 0) {
        const randomItem = filtered[Math.floor(Math.random() * filtered.length)]; // 0~(length-1) index
        selected.push(randomItem);
      }
    });

    return selected.slice(0, 10);
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="font-sans">
      <Header />

      {/* Hero */}
      <section className="relative w-full h-[35vh] md:h-screen overflow-hidden">
  <img
    src="/img/hero.jpg"
    alt="Main visual"
    className="object-cover object-left md:object-center w-full h-full absolute top-0 left-0 z-0"
    />

  <div className="absolute inset-0 z-10 bg-black/40 flex flex-col items-center text-white text-center px-6 pt-[15vh] md:justify-center md:pt-0 opacity-0 animate-fadeInSlow">
    <h2 className="text-xl md:text-5xl font-bold mb-3">UP to 20% off</h2>
    <p className="text-sm md:text-xl mb-5 text-orange-200">
      Plus, free shipping on all orders.
    </p>
    <a
      href="/products"
      className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-orange-200 transition"
    >
      Shop Now
    </a>
  </div>
      </section>

      <ReviewCarousel />

      {/* Categories */}
      <section className="py-20 px-4 bg-gray-50">
        <h2
          ref={categoryRef}
          className={`text-3xl md:text-4xl font-bold text-center mb-10 transition-opacity duration-1000 ${
            categoryInView ? 'opacity-100 animate-fadeInUp' : 'opacity-0'
          }`}
        >
          Browse by Category
        </h2>
        <div
          ref={categoryGridRef}
          className={`flex overflow-x-auto space-x-6 transition-all duration-1000 pb-6 ${
            categoryGridInView ? 'opacity-100 animate-slideInLeft' : 'opacity-0'
          }`}
        >
          {Object.entries(categoryImages).map(([cat, img]) => (  //  Object.entries gets all key-value pairs from an object as a list.


            <a key={cat} href={`/category/${cat}`} className="flex-shrink-0 w-[220px] group">
              <div className="relative">
                <img
                  src={img}
                  alt={cat}
                  className="w-full h-[280px] object-cover rounded-lg group-hover:opacity-80 transition-transform transform hover:scale-105 hover:shadow-lg duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition">
                  {cat}
                </div>
              </div>
              <p className="mt-4 text-center text-gray-800 font-medium group-hover:text-orange-500 transition">
                {cat} <span className="ml-1">→</span>
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section ref={bestsellerRef} className="py-20 px-4 bg-gray-50 min-h-[100px]" id="shop">
      <h2
    className={`text-3xl md:text-4xl font-bold text-center mb-10 transition-opacity duration-700 ${
      bestsellerInView ? 'opacity-100 animate-fadeInUp' : 'opacity-0'
    }`}
  >
    Shop our bestsellers
  </h2>
  

  <div
    className={`flex overflow-x-auto space-x-6 transition-opacity duration-1000 pb-6 ${
      bestsellerInView ? 'opacity-100 animate-slideInLeft' : 'opacity-0'
    }`}
  >
    {Object.entries(bestsellerImages).map(([cat, img]) => (
      <a key={cat} href={`/bestseller/${cat}`} className="flex-shrink-0 w-[220px] group">
        <div className="relative">
          <img
            src={img}
            alt={cat}
            className="w-full h-[280px] object-cover rounded-lg group-hover:opacity-80 transition-transform transform hover:scale-105 hover:shadow-lg duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition">
            {cat}
          </div>
        </div>
        <p className="mt-4 text-center text-gray-800 font-medium group-hover:text-orange-500 transition">
          {cat} <span className="ml-1">→</span>
        </p>
      </a>
    ))}
  </div>
</section>





      {/* Customer Service */}
      <section className="relative z-10 py-20 px-4 bg-white" id="support" ref={serviceRef}>
        <h2 className={`text-3xl font-bold text-center mb-10 transition-opacity duration-1000 ${
          serviceInView ? 'opacity-100 animate-fadeInUp' : 'opacity-0'
        }`}>
          Customer Service
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center text-gray-700 text-sm">
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faTruck} className="text-3xl mb-3 text-gray-500" />
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Shipping & Delivery</h3>
            <p>Free standard shipping on all orders over $100.<br />Fast & eco-friendly.</p>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faUndoAlt} className="text-3xl mb-3 text-gray-500" />
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Returns & Exchanges</h3>
            <p>Changed your mind? Return or exchange within 14 days. Easy and flexible.</p>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faHeadset} className="text-3xl mb-3 text-gray-500" />
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Support & FAQ</h3>
            <p>
              Visit our <a href="/contact" className="underline text-orange-500 hover:text-orange-600 font-medium">Contact page</a>
            </p>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-center bg-green-50 border border-green-200 rounded-lg py-6 px-8 shadow-sm max-w-xl mx-auto">
          <FontAwesomeIcon icon={faShieldAlt} className="text-2xl text-green-600 mr-4" />
          <p className="text-sm text-gray-700">
            All our products come with a <span className="font-bold text-green-700">30-day satisfaction guarantee</span>. Shop with confidence.
          </p>
        </div>
      </section>

      <footer className="relative z-10">
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
