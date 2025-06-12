import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';

const ReviewPage = () => {
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('https://typescript1.pages.dev/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSubmitted(true);
    setForm({ name: '', text: '', rating: 5 });
  };

  return (
    <>
      {/* 背景アニメーション */}
      <ParticlesBackground className="absolute inset-0 -z-10" />

      {/* 全体を包む：z-indexと高さをここで管理 */}
      <div className="relative z-10 min-h-screen flex flex-col">

        <Header />

        <main className="flex-grow max-w-xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-8 text-center">Review</h1>

          {submitted && (
            <p className="text-green-600 text-center font-semibold mb-6 animate-fadeIn">
              ✅ Thank you for your review!
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-white/90 p-6 rounded-lg shadow-lg backdrop-blur-md"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Alex"
                required
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Your Review</label>
              <textarea
                placeholder="Share your experience..."
                required
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <select
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {'★'.repeat(r)}{'☆'.repeat(5 - r)}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600 transition"
            >
              Submit Review
            </button>
          </form>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ReviewPage;
