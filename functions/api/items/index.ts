import type { Database } from '@cloudflare/d1';

// Define the expected environment with D1 binding
interface Env {
  DB: Database;
}

// Handle GET request: fetch all items from the database
export async function onRequestGet(context: {
  env: Env;
  request: Request;
}): Promise<Response> {
  try {
    // Run SQL query to get all items
    const { results } = await context.env.DB.prepare("SELECT * FROM items").all();

    // Return data as JSON with success status
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow cross-origin requests
      },
    });
  } catch (err: any) {
    // Handle errors by returning error message and status 500
    return new Response(
      JSON.stringify({
        error: "Failed to fetch items",
        detail: err.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

// Handle OPTIONS request for CORS preflight
export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
