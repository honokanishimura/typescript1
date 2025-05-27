// Use Cloudflare D1 database type
import type { Database } from '@cloudflare/d1';

// Define environment structure (for DB access)
interface Env {
  DB: Database;
}

// Handle POST request for login
export async function onRequestPost(context: {
  env: Env;
  request: Request;
}): Promise<Response> {
  const { request, env } = context;

  try {
    // Read request body as text
    const raw = await request.text();
    // Convert text to JSON object
    const data = JSON.parse(raw);
    const { email, password } = data;

    // Check if email or password is missing
    if (!email?.trim() || !password?.trim()) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), {
        status: 400, // Bad request
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Search user in database by email
    const user = await env.DB.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).bind(email).first();

    // If user not found, return error
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404, // Not found
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Check if password is correct
    if ((user as any).password !== password) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401, // Unauthorized
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // If login is successful, return user data
    return new Response(JSON.stringify({
      message: 'Login successful!',
      user: {
        id: (user as any).id,
        firstName: (user as any).firstName,
        lastName: (user as any).lastName,
        email: (user as any).email,
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });

  } catch (err: any) {
    // If something goes wrong, return error
    console.error('Login Error:', err);
    return new Response(JSON.stringify({
      error: 'Login failed',
      detail: err.message ?? 'Unknown error',
    }), {
      status: 500, // Internal server error
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}

// Handle OPTIONS request (for CORS preflight)
export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204, // No content
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
