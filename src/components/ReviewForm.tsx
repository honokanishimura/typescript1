import { useState } from 'react';

export const ReviewForm = () => {
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    alert('Thanks for your review!');
    location.href = '/products';


  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <input placeholder="Your name" required className="border p-2 w-full"
        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <textarea placeholder="Your review" required className="border p-2 w-full"
        value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
      <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
        {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}
      </select>
      <button className="bg-orange-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};
