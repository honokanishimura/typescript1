import { useAuth } from '../context/AuthContext';

import { useEffect } from 'react';
import { Item } from '../types/Item';

const { user } = useAuth();
const storageKey = user?.id ? `recentViewed_${user.id}` : 'recentViewed_guest';

export const saveToRecentlyViewed = (item: Item) => {
  const existing: Item[] = JSON.parse(localStorage.getItem(storageKey) || '[]');

  const updated = [item, ...existing.filter(i => i.id !== item.id)];
  const sliced = updated.slice(0, 10); // 最大10件

  localStorage.setItem(storageKey, JSON.stringify(sliced));
};

export const useRecentlyViewed = (): Item[] => {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch {
    return [];
  }
};

export const clearRecentlyViewed = () => {
  localStorage.removeItem('recentViewed');
};

export const removeFromRecentlyViewed = (id: number) => {
  const viewed = JSON.parse(localStorage.getItem('recentViewed') || '[]') as number[];
  const updated = viewed.filter(itemId => itemId !== id);
  localStorage.setItem('recentViewed', JSON.stringify(updated));
};


