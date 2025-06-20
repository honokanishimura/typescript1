import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { Item } from '../types/Item';

export const useFavoriteItems = () => {
  const { user } = useAuth(); // ✅ フックの中で呼び出す
  const storageKey = user?.id ? `favorites_${user.id}` : 'favorites_guest';

  const [favorites, setFavorites] = useState<Item[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
  }, [storageKey]); // ✅ userが変わったときも再読み込み

  const addToFavorites = (item: Item) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id);
      if (exists) return prev;
      const updated = [...prev, item];
      localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromFavorites = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
  };
};
