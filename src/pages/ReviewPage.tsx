import { ReviewForm } from '@components/ReviewForm';
import ReviewCarousel from '@components/ReviewCarousel'; // ✅ default import


const ReviewPage = () => {
  return (
    <div className="min-h-screen bg-[#fefefe] p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Customer Reviews</h1>
      <ReviewForm />
      <div className="my-10 border-t pt-10">
        <ReviewCarousel />
      </div>
    </div>
  );
};

export default ReviewPage;
