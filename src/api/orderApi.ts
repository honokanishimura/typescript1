// src/api/orderApi.ts

// Import axios and base URL setting
import axios from 'axios';
import { API_BASE_URL } from '../utils/apiBase'; // ✅ shared base URL

// Set the full API URL for order-related requests
const API_URL = `${API_BASE_URL}/api/orders`;

// GET
export const fetchOrdersByUserId = (userId: number) =>
  axios.get(`${API_URL}?userId=${userId}`).then(res => res.data);

// POST
export const postOrder = (order: any) =>
  axios.post(API_URL, order);
