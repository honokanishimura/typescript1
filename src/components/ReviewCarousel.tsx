import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Review } from '@/types/Review'; // ✅ @types エイリアス or 相対パスに調整して

const ReviewCarousel = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json() as Promise<Review[]>) // ✅ 型注釈はここ
      .then((data) => {
        const sorted = data.sort((a, b) => b.rating - a.rating); // ★ 評価が高い順に
        setReviews(sorted);
      })
      .catch((err) => console.error('Error fetching reviews:', err));
  }, []);

  // ★ 星のUIを生成
  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <section className="bg-[#f8f3ed] py-20 px-4">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop
        className="max-w-6xl mx-auto"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              <div className="text-left px-6">
                <p className="text-sm text-orange-500 mb-2 font-semibold">
                  {renderStars(review.rating)}
                </p>
                <blockquote className="text-2xl md:text-3xl font-light text-gray-800 mb-4">
                  “{review.text}”
                </blockquote>
                <p className="text-sm text-gray-700 font-semibold">by {review.name}</p>
                <p className="text-xs text-gray-500">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <img
                  src="/img/sofa_7.jpg"
                  alt="Review image"
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
