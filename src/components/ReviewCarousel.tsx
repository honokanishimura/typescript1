// src/components/ReviewCarousel.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const reviews = [
  {
    text: "It’s helped me be more comfortable, and is just beautiful.",
    category: 'Index Shelves',
    image: '/img/sofa_7.jpg',
  },
  {
    text: "The rug adds a soft and elegant touch to my living space. Love it!",
    category: 'Handwoven Rug',
    image: '/img/rug_7.jpg',
  },
  {
    text: "This chair is both stylish and comfortable. Would recommend it to anyone.",
    category: 'Lounge Chair',
    image: '/img/chair_1.jpg',
  },
  {
    text: "The minimalist table blends perfectly with my interior. Solid and beautiful.",
    category: 'Wooden Table',
    image: '/img/table_5.jpg',
  },
  {
    text: "Plants have never looked better in these ceramic pots. Very happy with the look.",
    category: 'Planter Set',
    image: '/img/plant_3.jpg',
  },
];

const ReviewCarousel = () => {
  return (
    <section className="bg-[#f8f3ed] py-20 px-4">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop
        className="max-w-6xl mx-auto transition duration-700 ease-in-out"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">

            
            <div className="text-left px-6 transition-all duration-700 transform hover:scale-105">


                <p className="text-sm text-gray-600 mb-2 uppercase font-semibold tracking-wide">
                  AD CLEVEREST AWARDS
                </p>
                <blockquote className="text-3xl md:text-4xl font-light text-gray-800 mb-6 leading-snug">
                  “{review.text}”
                </blockquote>
                <p className="text-sm text-gray-700 font-semibold">{review.category}</p>

                <div className="mt-4">
                  <a
                    href="/reviews"
                    className="text-sm text-orange-500 hover:underline transition"
                  >
                    Read all →
                  </a>
                </div>
              </div>
              <div>
                <img
                  src={review.image}
                  alt={review.category}
                  className="w-full h-[400px] object-cover rounded-lg shadow"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ReviewCarousel;
