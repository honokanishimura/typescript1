// Import the Database type from Cloudflare D1 (type safety for the DB)
import type { Database } from '@cloudflare/d1';

// Define the environment interface
// This tells TypeScript that `env` will include a D1 database instance called DB.
interface Env {
  DB: Database;
}

// ======================
// Handle GET Request
// This function fetches all items from the `items` table in the database.
// This is used when the frontend wants to show the product list.
// ======================
export async function onRequestGet(context: {
  env: Env;
  request: Request;
}): Promise<Response> {
  try {
    // Prepare and run the SQL query to get all rows from "items" table
    const { results } = await context.env.DB.prepare("SELECT * FROM items").all();

    // If the query is successful, return the results as a JSON response
    return new Response(JSON.stringify(results), {
      status: 200, // OK
      headers: {
        "Content-Type": "application/json", // Let frontend know it's JSON
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin (CORS)
      },
    });
  } catch (err: any) {
    // If something goes wrong, return a 500 error with the error message
    return new Response(
      JSON.stringify({
        error: "Failed to fetch items", // Custom error message
        detail: err.message, // Actual error for debugging
      }),
      {
        status: 500, // Internal Server Error
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Still allow CORS
        },
      }
    );
  }
}

// ======================
// Handle OPTIONS Request
// This is required for CORS (Cross-Origin Resource Sharing) preflight
// Browser sends OPTIONS before POST or GET if using custom headers or methods
// ======================
export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204, // No Content
    headers: {
      // Allow requests from any origin
      'Access-Control-Allow-Origin': '*',

      // Allow these methods
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',

      // Allow the Content-Type header
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
