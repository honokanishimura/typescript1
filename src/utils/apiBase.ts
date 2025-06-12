// src/utils/apiBase.ts

// 🔹 Check if the code is running in a browser
// 🔹 Then check if hostname is localhost or 127.0.0.1
// 🔹 If true → use local dev server URL
// 🔹 If not → use production deployed URL

export const API_BASE_URL =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://127.0.0.1:8788' // ✅ local API (Cloudflare Functions dev server)
    : 'https://typescript1.pages.dev'; // ✅ production API (Cloudflare Pages)
