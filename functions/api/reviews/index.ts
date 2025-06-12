/// <reference types="@cloudflare/workers-types" />
import { Hono } from 'hono';

type Env = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

// GET: レビュー一覧取得
app.get('/', async (c) => {
  const results = await c.env.DB.prepare("SELECT * FROM reviews ORDER BY created_at DESC").all();
  return c.json(results.results);
});

// POST: レビュー投稿
app.post('/', async (c) => {
  const { name, text, rating } = await c.req.json();
  await c.env.DB
    .prepare("INSERT INTO reviews (name, text, rating, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)")
    .bind(name, text, rating)
    .run();
  return c.json({ message: 'OK' });
});

export default app;


