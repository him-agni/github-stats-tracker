import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSearchStore = create(
  persist(
    (set, get) => ({
      recentSearches: [],

      addRecentSearch: (username) => {
        const trimmedUsername = username.trim();
        if (!trimmedUsername) return;

        const currentSearches = get().recentSearches;

        const updatedSearches = [
          trimmedUsername,
          ...currentSearches.filter(
            (item) => item.toLowerCase() !== trimmedUsername.toLowerCase(),
          ),
        ].slice(0, 5);

        set({ recentSearches: updatedSearches });
      },

      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: "github-search-store",
    },
  ),
);
