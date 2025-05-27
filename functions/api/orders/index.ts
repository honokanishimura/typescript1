// Type definition for Cloudflare D1 binding
import type { Database } from '@cloudflare/d1';

interface Env {
  DB: Database;
}

// Handle POST request to save a new order
export async function onRequestPost(context: {
  env: Env;
  request: Request;
}): Promise<Response> {
  try {
    // Get the JSON body from the request
    const data = await context.request.json();
    const { userId, items, total } = data;

    // Save the order into the database using placeholders to prevent injection
    await context.env.DB.prepare(
      'INSERT INTO orders (user_id, items, total) VALUES (?, ?, ?)'
    ).bind(userId, JSON.stringify(items), total).run();

    // Send success response
    return new Response(JSON.stringify({ message: 'Order saved!' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err: any) {
    // Send error response if something goes wrong
    return new Response(JSON.stringify({ error: 'Failed to save order', detail: err.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}

// Handle GET request to fetch orders by userId
export async function onRequestGet(context: {
  env: Env;
  request: Request;
}): Promise<Response> {
  // Get userId from URL query parameters
  const { searchParams } = new URL(context.request.url);
  const userId = searchParams.get('userId');

  // If userId is missing, return 400
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Missing userId' }), {
      status: 400,
    });
  }

  try {
    // Get all orders for the user, newest first
    const raw = await context.env.DB.prepare(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC'
    ).bind(userId).all();

    const results = (raw as { results: any[] }).results;

    // Parse the "items" JSON string back into an array
    const parsedResults = results.map((order) => ({
      ...order,
      items: JSON.parse(order.items), // Prevents "items.map is not a function"
    }));

    // Return the list of orders
    return new Response(JSON.stringify(parsedResults), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err: any) {
    // Send error response if something goes wrong
    return new Response(JSON.stringify({ error: 'Failed to fetch orders', detail: err.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
