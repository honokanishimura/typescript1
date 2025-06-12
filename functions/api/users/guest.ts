/// <reference types="@cloudflare/workers-types" />
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.json({
    user: {
      id: 1,
      name: 'Guest User',
      email: 'guest@example.com'
    },
    token: 'mock-token-123'
  });
});

export default app;
