import type { Database } from '@cloudflare/d1';

interface Env {
  DB: Database;
}

export async function onRequestPost(context: {
  env: Env;
  request: Request;
}): Promise<Response> {
  try {
    const data = await context.request.json();
    const { userId, items, total } = data;

    await context.env.DB.prepare(
      'INSERT INTO orders (user_id, items, total) VALUES (?, ?, ?)'
    ).bind(userId, JSON.stringify(items), total).run();

    return new Response(JSON.stringify({ message: 'Order saved!' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Failed to save order', detail: err.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}

export async function onRequestGet(context: {
  env: Env;
  request: Request;
}): Promise<Response> {
  const { searchParams } = new URL(context.request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Missing userId' }), {
      status: 400,
    });
  }

  try {
    const raw = await context.env.DB.prepare(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC'
    ).bind(userId).all();

    const results = (raw as { results: any[] }).results;

    const parsedResults = results.map((order) => ({
      ...order,
      items: JSON.parse(order.items), // ✅ "items.map is not a function" を防ぐ
    }));

    return new Response(JSON.stringify(parsedResults), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Failed to fetch orders', detail: err.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
