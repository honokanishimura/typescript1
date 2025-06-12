export const onRequestGet = () => {
  return new Response(JSON.stringify({
    user: {
      id: 1,
      name: 'Guest User',
      email: 'guest@example.com'
    },
    token: 'mock-token-123'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });
};
