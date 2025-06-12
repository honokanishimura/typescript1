import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';

const ReviewPage = () => {
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSubmitted(true);
    setForm({ name: '', text: '', rating: 5 });
  };

  return (
    <>
      <ParticlesBackground />
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Leave a Review</h1>

        {submitted && (
          <p className="text-green-600 mb-6 text-center">✅ Thank you for your review!</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-6 bg-white rounded-lg shadow"
        >
          <input
            type="text"
            placeholder="Your name"
            required
            className="w-full border px-4 py-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <textarea
            placeholder="Your review"
            required
            className="w-full border px-4 py-2 rounded"
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
          />
          <select
            className="w-full border px-4 py-2 rounded"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} stars
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded font-semibold"
          >
            Submit
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
};

export default ReviewPage;
