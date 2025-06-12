import { ReviewForm } from '@/components/ReviewForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';

const ReviewPage = () => {
  return (
    <>
      <ParticlesBackground />
      <Header />
      <main className="min-h-screen bg-[#fff9f0] py-20 px-6">
        <h1 className="text-3xl font-bold mb-10 text-center">Write a Review</h1>
        <div className="max-w-xl mx-auto">
          <ReviewForm />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ReviewPage;
