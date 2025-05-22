// functions/api/items/index.ts
import type { Database } from '@cloudflare/d1';

interface Env {
  DB: Database;
}

export async function onRequestGet(context: {
  env: Env;
  request: Request;
}): Promise<Response> {
  try {
    const { results } = await context.env.DB.prepare("SELECT * FROM items").all();

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // ✅ CORS対応
      },
    });
  } catch (err: any) {
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

// ✅ CORSプリフライト対応（必要な場合）
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
