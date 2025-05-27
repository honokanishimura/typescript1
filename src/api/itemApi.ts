// src/api/itemApi.ts
import axios from 'axios';
import { Item } from '../types/Item';
import { API_BASE_URL } from '../utils/apiBase'; // Load base URL (local or Cloudflare)

const API_URL = `${API_BASE_URL}/api/items`; // Auto-switch between local and production API

/**
 * Fetch all items (for product list pages)
 */
export const fetchItems = async (): Promise<Item[]> => {
  const response = await axios.get(API_URL);
  const data = response.data;

  // Handle both array and wrapped object formats
  if (Array.isArray(data)) return data;
  if (data.items && Array.isArray(data.items)) return data.items;

  console.error("❌ fetchItems: Unexpected response format:", data);
  return [];
};

/**
 * Get a single item by ID (for detail page)
 */
export const ItemById = async (id: number): Promise<Item> => {
  const response = await axios.get<Item>(`${API_URL}/${id}`);
  return response.data;
};

/**
 * Create a new item (used in admin create form)
 */
export const createItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
  const response = await axios.post<Item>(API_URL, item);
  return response.data;
};

/**
 * Update an item by ID (used in admin edit form)
 */
export const updateItem = async (id: number, item: Item): Promise<Item> => {
  const response = await axios.put<Item>(`${API_URL}/${id}`, item);
  return response.data;
};

/**
 * Delete an item by ID (used in admin delete action)
 */
export const deleteItem = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
