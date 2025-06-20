import { useAuth } from '../context/AuthContext'; // 追加
import { useEffect, useState } from 'react';
import { Item } from '../types/Item';

const { user } = useAuth(); // ログイン中のユーザーを取得
const storageKey = user?.id ? `favorites_${user.id}` : 'favorites_guest';

export const useFavoriteItems = () => {
  const [favorites, setFavorites] = useState<Item[]>([]);

  // 初回読み込み時にlocalStorageから取得
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
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
      localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  };

  // お気に入りから削除
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
