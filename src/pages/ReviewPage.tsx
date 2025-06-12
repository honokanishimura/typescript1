import { useState } from 'react';

const ReviewPage = () => {
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    alert('✅ Review submitted!');
    setForm({ name: '', text: '', rating: 5 });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">✍️ Leave a Review</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          className="w-full border p-2 rounded"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <textarea
          required
          className="w-full border p-2 rounded"
          placeholder="Your review"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
        />
        <select
          className="w-full border p-2 rounded"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} ★
            </option>
          ))}
        </select>
        <button className="bg-orange-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default ReviewPage;
