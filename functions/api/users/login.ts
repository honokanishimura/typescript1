// functions/api/users/login.ts
import type { Database } from '@cloudflare/d1';

interface Env {
  DB: Database;
}

export async function onRequestPost(context: {
  env: Env;
  request: Request;
}): Promise<Response> {
  const { request, env } = context;

  try {
    const raw = await request.text();
    const data = JSON.parse(raw);
    const { email, password } = data;

    if (!email?.trim() || !password?.trim()) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const user = await env.DB.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).bind(email).first();

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    if ((user as any).password !== password) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

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
    console.error('❌ Login Error:', err);
    return new Response(JSON.stringify({
      error: 'Login failed',
      detail: err.message ?? 'Unknown error',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}

// ✅ OPTIONSリクエスト（CORS対応）
export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
