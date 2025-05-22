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
    const bodyText = await request.text();
    console.log("📥 Raw request body:", bodyText);

    const data = JSON.parse(bodyText);
    const { firstName, lastName, email, password } = data;

    // ✅ 空文字もチェック！
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !password?.trim()) {
      console.error("❌ Missing fields", { firstName, lastName, email, password });
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const existingUser = await env.DB.prepare(
      "SELECT * FROM users WHERE email = ?"
    ).bind(email).first();

    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already registered" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    await env.DB.prepare(
      "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)"
    ).bind(firstName, lastName, email, password).run();

    return new Response(JSON.stringify({
      message: "Signup successful!",
      user: { id: Date.now(), firstName, lastName, email }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

  } catch (err: any) {
    console.error("❌ Signup Error:", err);
    return new Response(JSON.stringify({
      error: "Signup failed",
      detail: err.message,
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}


