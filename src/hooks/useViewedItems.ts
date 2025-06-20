import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { Item } from '../types/Item';

const getStorageKey = (): string => {
  try {
    const raw = localStorage.getItem('currentUserId');
    const userId = raw ? JSON.parse(raw) : null;
    return userId ? `recentViewed_${userId}` : 'recentViewed_guest';
  } catch {
    return 'recentViewed_guest';
  }
};

// 最近見た商品を保存する
export const saveToRecentlyViewed = (item: Item) => {
  const storageKey = getStorageKey();

  const existing: Item[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
  const updated = [item, ...existing.filter(i => i.id !== item.id)];
  const sliced = updated.slice(0, 10); // 最大10件

  localStorage.setItem(storageKey, JSON.stringify(sliced));
};

// 最近見た商品を取得するHook（useAuth OK）
export const useRecentlyViewed = (): Item[] => {
  const { user } = useAuth();
  const storageKey = user?.id ? `recentViewed_${user.id}` : 'recentViewed_guest';

  try {
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch {
    return [];
  }
};

// 最近見た商品を全て削除（useAuth使えないので外に出す）
export const clearRecentlyViewed = () => {
  const storageKey = getStorageKey();
  localStorage.removeItem(storageKey);
};

// 最近見た商品から1件削除（同様）
export const removeFromRecentlyViewed = (id: number) => {
  const storageKey = getStorageKey();
  const viewed = JSON.parse(localStorage.getItem(storageKey) || '[]') as Item[];
  const updated = viewed.filter(item => item.id !== id);
  localStorage.setItem(storageKey, JSON.stringify(updated));
};
