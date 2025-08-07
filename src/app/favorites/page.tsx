'use client';
import { useFavorites } from '@/hooks/useFavorites';
import Link from 'next/link';
import { useState } from 'react';
import CharacterList from '@/components/character/List';
import EpisodeList from '@/components/episodes/List';
import LocationList from '@/components/locations/List';
import { Character, Episode, Location } from '@/types';
import { FavoriteItem } from '@/hooks/useFavorites';

export default function Favorites() {
  const { favorites, isLoaded, getTotalFavorites, clearAllFavorites } =
    useFavorites();
  const [activeTab, setActiveTab] = useState<
    'all' | 'characters' | 'episodes' | 'locations'
  >('all');

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const totalFavorites = getTotalFavorites();

  const convertToCharacters = (favoriteItems: FavoriteItem[]): Character[] => {
    return favoriteItems.map(item => ({
      id: item.id,
      name: item.name,
      status: 'unknown' as const,
      species: '',
      type: '',
      gender: 'unknown' as const,
      origin: { name: '', url: '' },
      location: { name: '', url: '' },
      image: item.image || '',
      episode: [],
      url: '',
      created: '',
    }));
  };

  const convertToEpisodes = (favoriteItems: FavoriteItem[]): Episode[] => {
    return favoriteItems.map(item => ({
      id: item.id,
      name: item.name,
      air_date: item.air_date || '',
      episode: item.episode || '',
      characters: [],
      url: '',
      created: '',
    }));
  };

  const convertToLocations = (favoriteItems: FavoriteItem[]): Location[] => {
    return favoriteItems.map(item => ({
      id: item.id,
      name: item.name,
      type: item.locationtype || '',
      dimension: item.dimension || '',
      residents: [],
      url: '',
      created: '',
    }));
  };

  const filteredFavorites = () => {
    switch (activeTab) {
      case 'characters':
        return {
          characters: favorites.characters,
          episodes: [],
          locations: [],
        };
      case 'episodes':
        return { characters: [], episodes: favorites.episodes, locations: [] };
      case 'locations':
        return { characters: [], episodes: [], locations: favorites.locations };
      default:
        return favorites;
    }
  };

  const filtered = filteredFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
          Mis Favoritos ({totalFavorites})
        </h1>

        {totalFavorites > 0 && (
          <button
            onClick={clearAllFavorites}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
          >
            Limpiar Favoritos
          </button>
        )}
      </div>

      {totalFavorites === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">💫</div>
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">
            No tienes favoritos aún
          </h2>
          <p className="text-gray-500 mb-6">
            Explora personajes, episodios y ubicaciones para agregar tus
            favoritos
          </p>
          <div className="space-x-4">
            <Link
              href="/characters"
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Ver Personajes
            </Link>
            <Link
              href="/episodes"
              className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Ver Episodios
            </Link>
            <Link
              href="/locations"
              className="inline-block px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Ver Ubicaciones
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`cursor-pointer px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todos ({totalFavorites})
            </button>
            <button
              onClick={() => setActiveTab('characters')}
              className={`cursor-pointer px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'characters'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Personajes ({favorites.characters.length})
            </button>
            <button
              onClick={() => setActiveTab('episodes')}
              className={`cursor-pointer px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'episodes'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Episodios ({favorites.episodes.length})
            </button>
            <button
              onClick={() => setActiveTab('locations')}
              className={`cursor-pointer px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'locations'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Ubicaciones ({favorites.locations.length})
            </button>
          </div>

          {filtered.characters.length > 0 && (
            <section className="mb-8">
              <CharacterList
                characters={convertToCharacters(filtered.characters)}
                loading={false}
                showTitle={true}
                title={`Personajes Favoritos (${filtered.characters.length})`}
              />
            </section>
          )}

          {filtered.episodes.length > 0 && (
            <section className="mb-8">
              <EpisodeList
                episodes={convertToEpisodes(filtered.episodes)}
                loading={false}
                showTitle={true}
                title={`Episodios Favoritos (${filtered.episodes.length})`}
              />
            </section>
          )}

          {filtered.locations.length > 0 && (
            <section className="mb-8">
              <LocationList
                locations={convertToLocations(filtered.locations)}
                loading={false}
                showTitle={true}
                title={`Ubicaciones Favoritas (${filtered.locations.length})`}
              />
            </section>
          )}
        </>
      )}
    </div>
  );
}
