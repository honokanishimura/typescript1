// src/api/orderApi.ts
import axios from 'axios';
import { API_BASE_URL } from '../utils/apiBase'; // ✅ 追加！


const API_URL = `${API_BASE_URL}/api/orders`;   // ✅ 書き換え！
export const fetchOrdersByUserId = (userId: number) =>
  axios.get(`${API_URL}?userId=${userId}`).then(res => res.data);

export const postOrder = (order: any) =>
  axios.post(API_URL, order);
