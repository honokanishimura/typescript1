import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Item } from '../types/Item';

export const useFavoriteItems = () => {
  const [favorites, setFavorites] = useState<Item[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item: Item) => {
    if (!favorites.find((f) => f.id === item.id)) {
      setFavorites([...favorites, item]);
    }
  };

  const removeFromFavorites = (id: number) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  return { favorites, addToFavorites, removeFromFavorites };
};
