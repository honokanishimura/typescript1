// src/api/itemApi.ts
import axios from 'axios';
import { Item } from '../types/Item';
import { API_BASE_URL } from '../utils/apiBase'; // ✅ 共通ベースURLを読み込み

const API_URL = `${API_BASE_URL}/api/items`; // ✅ localhost or Cloudflare に自動切替

/**
 * 全商品を取得（一覧ページなど）
 */
export const fetchItems = async (): Promise<Item[]> => {
  const response = await axios.get(API_URL);
  const data = response.data;

  // 対応：配列ならそのまま、オブジェクト形式なら items を返す
  if (Array.isArray(data)) return data;
  if (data.items && Array.isArray(data.items)) return data.items;

  console.error("❌ fetchItems: Unexpected response format:", data);
  return [];
};


/**
 * IDで1件の商品を取得（詳細ページ用）
 */
export const ItemById = async (id: number): Promise<Item> => {
  const response = await axios.get<Item>(`${API_URL}/${id}`);
  return response.data;
};

/**
 * 商品を新規作成（管理画面・商品追加用）
 */
export const createItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
  const response = await axios.post<Item>(API_URL, item);
  return response.data;
};

/**
 * 商品情報を更新（管理画面・編集用）
 */
export const updateItem = async (id: number, item: Item): Promise<Item> => {
  const response = await axios.put<Item>(`${API_URL}/${id}`, item);
  return response.data;
};

/**
 * 商品を削除（管理画面・削除用）
 */
export const deleteItem = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
