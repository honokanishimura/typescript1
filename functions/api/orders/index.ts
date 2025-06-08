// Import the Database type from Cloudflare D1
import type { Database } from '@cloudflare/d1';

// Define the environment interface.
// This tells TypeScript that `env` will include a D1 database instance called DB.
interface Env {
  DB: Database;
}

// ========== POST Request ==========
// This function handles saving a new order from the frontend (usually when user checks out)
export async function onRequestPost(context: {
  env: Env;
  request: Request;
}): Promise<Response> {
  try {
    // Get JSON data from the request body
    const data = await context.request.json();

    // Destructure the values we expect: user ID, items list, and total price
    const { userId, items, total } = data;

    // Save the new order into the database using SQL
    // We use .bind() to safely insert values into the SQL query
    await context.env.DB.prepare(
      'INSERT INTO orders (user_id, items, total) VALUES (?, ?, ?)'
    )
    .bind(userId, JSON.stringify(items), total) // Convert items array into JSON string
    .run(); // Execute the query

    // If successful, return a 200 OK response
    return new Response(JSON.stringify({ message: 'Order saved!' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err: any) {
    // If something goes wrong, return error with 500 status
    return new Response(JSON.stringify({
      error: 'Failed to save order',
      detail: err.message
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}

// ========== GET Request ==========
// This function fetches order history for a specific user (based on userId)
export async function onRequestGet(context: {
  env: Env;
  request: Request;
}): Promise<Response> {
  // Extract the userId from the URL query parameters
  const { searchParams } = new URL(context.request.url);
  const userId = searchParams.get('userId');

  // If no userId is given, return 400 (bad request)
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Missing userId' }), {
      status: 400,
    });
  }

  try {
    // Fetch all orders for this user, sorted by latest first
    const raw = await context.env.DB.prepare(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC'
    )
    .bind(userId)
    .all(); // Run the query

    const results = (raw as { results: any[] }).results;

    // Convert the "items" JSON string back into an array
    // So that frontend can work with it easily
    const parsedResults = results.map((order) => ({
      ...order,
      items: JSON.parse(order.items), // Convert string back to array
    }));

    // Return the list of parsed orders
    return new Response(JSON.stringify(parsedResults), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err: any) {
    // If something goes wrong, return error
    return new Response(JSON.stringify({
      error: 'Failed to fetch orders',
      detail: err.message
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
