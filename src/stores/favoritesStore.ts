import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Character, Episode, Location } from '@/types';

export type FavoriteType = 'character' | 'episode' | 'location';

export interface FavoriteItem {
  id: number;
  type: FavoriteType;
  name: string;
  image?: string;
  episode?: string;
  air_date?: string;
  dimension?: string;
  locationtype?: string;
  addedAt: string;
}

export interface Favorites {
  characters: FavoriteItem[];
  episodes: FavoriteItem[];
  locations: FavoriteItem[];
}

interface FavoritesState {
  favorites: Favorites;
  isLoaded: boolean;

  addCharacterFavorite: (character: Character) => void;
  removeCharacterFavorite: (id: number) => void;
  isCharacterFavorite: (id: number) => boolean;
  toggleCharacterFavorite: (character: Character) => void;

  addEpisodeFavorite: (episode: Episode) => void;
  removeEpisodeFavorite: (id: number) => void;
  isEpisodeFavorite: (id: number) => boolean;
  toggleEpisodeFavorite: (episode: Episode) => void;

  addLocationFavorite: (location: Location) => void;
  removeLocationFavorite: (id: number) => void;
  isLocationFavorite: (id: number) => boolean;
  toggleLocationFavorite: (location: Location) => void;

  getTotalFavorites: () => number;
  clearAllFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: {
        characters: [],
        episodes: [],
        locations: [],
      },
      isLoaded: false,

      addCharacterFavorite: (character: Character) => {
        const favoriteItem: FavoriteItem = {
          id: character.id,
          type: 'character',
          name: character.name,
          image: character.image,
          addedAt: new Date().toISOString(),
        };

        set(state => ({
          favorites: {
            ...state.favorites,
            characters: [
              ...state.favorites.characters.filter(
                item => item.id !== character.id
              ),
              favoriteItem,
            ],
          },
        }));
      },

      removeCharacterFavorite: (id: number) => {
        set(state => ({
          favorites: {
            ...state.favorites,
            characters: state.favorites.characters.filter(
              item => item.id !== id
            ),
          },
        }));
      },

      isCharacterFavorite: (id: number) => {
        const state = get();
        return state.favorites.characters.some(item => item.id === id);
      },

      toggleCharacterFavorite: (character: Character) => {
        const state = get();
        if (state.isCharacterFavorite(character.id)) {
          state.removeCharacterFavorite(character.id);
        } else {
          state.addCharacterFavorite(character);
        }
      },

      addEpisodeFavorite: (episode: Episode) => {
        const favoriteItem: FavoriteItem = {
          id: episode.id,
          type: 'episode',
          name: episode.name,
          episode: episode.episode,
          air_date: episode.air_date,
          addedAt: new Date().toISOString(),
        };

        set(state => ({
          favorites: {
            ...state.favorites,
            episodes: [
              ...state.favorites.episodes.filter(
                item => item.id !== episode.id
              ),
              favoriteItem,
            ],
          },
        }));
      },

      removeEpisodeFavorite: (id: number) => {
        set(state => ({
          favorites: {
            ...state.favorites,
            episodes: state.favorites.episodes.filter(item => item.id !== id),
          },
        }));
      },

      isEpisodeFavorite: (id: number) => {
        const state = get();
        return state.favorites.episodes.some(item => item.id === id);
      },

      toggleEpisodeFavorite: (episode: Episode) => {
        const state = get();
        if (state.isEpisodeFavorite(episode.id)) {
          state.removeEpisodeFavorite(episode.id);
        } else {
          state.addEpisodeFavorite(episode);
        }
      },

      addLocationFavorite: (location: Location) => {
        const favoriteItem: FavoriteItem = {
          id: location.id,
          type: 'location',
          name: location.name,
          dimension: location.dimension,
          locationtype: location.type,
          addedAt: new Date().toISOString(),
        };

        set(state => ({
          favorites: {
            ...state.favorites,
            locations: [
              ...state.favorites.locations.filter(
                item => item.id !== location.id
              ),
              favoriteItem,
            ],
          },
        }));
      },

      removeLocationFavorite: (id: number) => {
        set(state => ({
          favorites: {
            ...state.favorites,
            locations: state.favorites.locations.filter(item => item.id !== id),
          },
        }));
      },

      isLocationFavorite: (id: number) => {
        const state = get();
        return state.favorites.locations.some(item => item.id === id);
      },

      toggleLocationFavorite: (location: Location) => {
        const state = get();
        if (state.isLocationFavorite(location.id)) {
          state.removeLocationFavorite(location.id);
        } else {
          state.addLocationFavorite(location);
        }
      },

      getTotalFavorites: () => {
        const state = get();
        return (
          state.favorites.characters.length +
          state.favorites.episodes.length +
          state.favorites.locations.length
        );
      },

      clearAllFavorites: () => {
        set({
          favorites: {
            characters: [],
            episodes: [],
            locations: [],
          },
        });
      },
    }),
    {
      name: 'rickandmorty_favorites',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => state => {
        if (state) {
          state.isLoaded = true;
        }
      },
    }
  )
);

export const useFavorites = () => {
  const store = useFavoritesStore();
  return store;
};
