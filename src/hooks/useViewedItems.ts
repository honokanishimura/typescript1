import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { Item } from '../types/Item';

// 最近見た商品を保存する
export const saveToRecentlyViewed = (item: Item) => {
  const userId = (() => {
    try {
      // 安全にuseAuthを仮コンポーネント経由で呼び出すのはできないため、fallbackとしてguestにする
      const raw = localStorage.getItem('currentUserId');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const storageKey = userId ? `recentViewed_${userId}` : 'recentViewed_guest';

  const existing: Item[] = JSON.parse(localStorage.getItem(storageKey) || '[]');

  const updated = [item, ...existing.filter(i => i.id !== item.id)];
  const sliced = updated.slice(0, 10); // 最大10件

  localStorage.setItem(storageKey, JSON.stringify(sliced));
};

// 最近見た商品を取得するHook
export const useRecentlyViewed = (): Item[] => {
  const { user } = useAuth();
  const storageKey = user?.id ? `recentViewed_${user.id}` : 'recentViewed_guest';

  try {
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch {
    return [];
  }
};

// 最近見た商品を全て削除
export const clearRecentlyViewed = () => {
  const { user } = useAuth();
  const storageKey = user?.id ? `recentViewed_${user.id}` : 'recentViewed_guest';
  localStorage.removeItem(storageKey);
};

// 最近見た商品から1件削除
export const removeFromRecentlyViewed = (id: number) => {
  const { user } = useAuth();
  const storageKey = user?.id ? `recentViewed_${user.id}` : 'recentViewed_guest';

  const viewed = JSON.parse(localStorage.getItem(storageKey) || '[]') as Item[];
  const updated = viewed.filter(item => item.id !== id);
  localStorage.setItem(storageKey, JSON.stringify(updated));
};
