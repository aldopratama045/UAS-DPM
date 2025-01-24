import React, { createContext, useContext, useState, ReactNode } from "react";

type NewsItem = {
  title: string;
  description: string;
  image: require("../../assets/images/pendidikan2.jpg"),// Ganti dengan tipe image yang sesuai
};

type FavoritesContextType = {
  favorites: NewsItem[];
  toggleFavorite: (item: NewsItem) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<NewsItem[]>([]);

  const toggleFavorite = (item: NewsItem) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.title === item.title)) {
        // Remove item from favorites
        return prevFavorites.filter((fav) => fav.title !== item.title);
      } else {
        // Add item to favorites
        return [...prevFavorites, item];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};