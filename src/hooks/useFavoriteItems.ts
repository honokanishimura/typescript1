// src/hooks/useFavoriteItems.ts
import { useEffect, useState } from 'react';
import { Item } from '../types/Item';

const STORAGE_KEY = 'favorites';

export const useFavoriteItems = () => {
  const [favorites, setFavorites] = useState<Item[]>([]);

  // 初回読み込み時にlocalStorageから取得
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  // お気に入り追加
  const addToFavorites = (item: Item) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id);
      if (exists) return prev;
      const updated = [...prev, item];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // お気に入りから削除
  const removeFromFavorites = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
  };
};
