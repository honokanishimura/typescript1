// Import Cloudflare D1 database type
import type { Database } from '@cloudflare/d1';

// Define environment (where DB is)
interface Env {
  DB: Database;
}

// Handle POST request (signup)
export async function onRequestPost(context: {
  env: Env;
  request: Request;
}): Promise<Response> {
  // Get request and environment
  const { request, env } = context;

  try {
    // Get text body from request
    const bodyText = await request.text();
    console.log("Raw request body:", bodyText);

    // Convert JSON text to object
    const data = JSON.parse(bodyText);
    const { firstName, lastName, email, password } = data;

    // Check if any field is missing or empty
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !password?.trim()) {
      console.error("Missing fields", { firstName, lastName, email, password });
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Check if email already exists in DB
    const existingUser = await env.DB.prepare(
      "SELECT * FROM users WHERE email = ?"
    ).bind(email).first();

    if (existingUser) {
      // If email is already used
      return new Response(JSON.stringify({ error: "Email already registered" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Save new user in the database
    await env.DB.prepare(
      "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)"
    ).bind(firstName, lastName, email, password).run();

    // Return success response
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
    // If something goes wrong, return error
    console.error("Signup Error:", err);
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
