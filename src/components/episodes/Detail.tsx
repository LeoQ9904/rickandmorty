'use client';

import { useState, useEffect } from 'react';
import { rickAndMortyApi } from '@/providers/rickandmorty-api';
import { Episode, Character, Location } from '@/types';
import Loading from '@/components/Loading';
import LoadError from '@/components/LoadError';
import LocationList from '@/components/locations/List';
import CharacterList from '@/components/character/List';
import FavoriteButton from '@/components/FavoriteButton';
import { useFavorites } from '@/hooks/useFavorites';

interface EpisodeDetailClientProps {
  episodeId: string;
}

export default function EpisodeDetailClient({
  episodeId,
}: EpisodeDetailClientProps) {
  const { isEpisodeFavorite, toggleEpisodeFavorite } = useFavorites();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingCharacters, setLoadingCharacters] = useState(false);
  const [loadingLocations, setLoadingLocations] = useState(false);

  useEffect(() => {
    if (!episodeId) return;

    const loadEpisode = async () => {
      try {
        setLoading(true);
        setError(null);

        const episodeData = await rickAndMortyApi.getEpisodeById(
          parseInt(episodeId)
        );
        setEpisode(episodeData);

        if (episodeData.characters && episodeData.characters.length > 0) {
          setLoadingCharacters(true);
          const characterIds = episodeData.characters
            .map(url => {
              const match = url.match(/\/(\d+)$/);
              return match ? parseInt(match[1], 10) : 0;
            })
            .filter(id => id > 0);

          if (characterIds.length > 0) {
            const charactersData =
              await rickAndMortyApi.getMultipleCharacters(characterIds);
            const charactersArray = Array.isArray(charactersData)
              ? charactersData
              : [charactersData];
            setCharacters(charactersArray);

            // Cargar locaciones de los personajes
            setLoadingLocations(true);
            const locationUrls = new Set<string>();

            charactersArray.forEach(character => {
              if (
                character.origin?.url &&
                character.origin.url !==
                  'https://rickandmortyapi.com/api/location/unknown'
              ) {
                locationUrls.add(character.origin.url);
              }
              if (
                character.location?.url &&
                character.location.url !==
                  'https://rickandmortyapi.com/api/location/unknown'
              ) {
                locationUrls.add(character.location.url);
              }
            });

            if (locationUrls.size > 0) {
              const locationIds = Array.from(locationUrls)
                .map(url => {
                  const match = url.match(/\/(\d+)$/);
                  return match ? parseInt(match[1], 10) : 0;
                })
                .filter(id => id > 0);

              if (locationIds.length > 0) {
                const locationsData =
                  await rickAndMortyApi.getMultipleLocations(locationIds);
                setLocations(
                  Array.isArray(locationsData) ? locationsData : [locationsData]
                );
              }
            }
            setLoadingLocations(false);
          }
          setLoadingCharacters(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
        setLoadingCharacters(false);
        setLoadingLocations(false);
      }
    };

    loadEpisode();
  }, [episodeId]);

  const getSeasonStyle = (episodeCode: string) => {
    const seasonColors = [
      {
        season: 'S01',
        name: 'Temporada 1',
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
      },
      {
        season: 'S02',
        name: 'Temporada 2',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-700',
      },
      {
        season: 'S03',
        name: 'Temporada 3',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-700',
      },
      {
        season: 'S04',
        name: 'Temporada 4',
        bgColor: 'bg-red-100',
        textColor: 'text-red-700',
      },
      {
        season: 'S05',
        name: 'Temporada 5',
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-700',
      },
      {
        season: 'S06',
        name: 'Temporada 6',
        bgColor: 'bg-indigo-100',
        textColor: 'text-indigo-700',
      },
      {
        season: 'S07',
        name: 'Temporada 7',
        bgColor: 'bg-pink-100',
        textColor: 'text-pink-700',
      },
    ];

    const seasonConfig = seasonColors.find(config =>
      episodeCode.startsWith(config.season)
    );
    return (
      seasonConfig || {
        season: 'SXX',
        name: 'Temporada desconocida',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-700',
      }
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !episode) {
    return <LoadError message={error || 'Episodio no encontrado'} />;
  }

  const seasonStyle = getSeasonStyle(episode.episode);

  return (
    <div className="">
      <div className="mb-5">
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-800">
                {episode.name}
              </h1>
              <FavoriteButton
                isFavorite={isEpisodeFavorite(episode.id)}
                onToggle={() => toggleEpisodeFavorite(episode)}
                size="lg"
              />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${seasonStyle.bgColor} ${seasonStyle.textColor}`}
              >
                {seasonStyle.name}
              </span>
              <span className="text-lg text-gray-700 font-medium">
                {episode.episode}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Información del Episodio
                </h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium text-gray-600">ID:</span>{' '}
                    {episode.id}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Código:</span>{' '}
                    {episode.episode}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">
                      Fecha de emisión:
                    </span>{' '}
                    {episode.air_date}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">
                      Personajes:
                    </span>{' '}
                    {episode.characters.length}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Estadísticas
                </h3>
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <p className="text-sm text-blue-600">
                      <span className="font-medium">Total de personajes:</span>
                    </p>
                    <p className="text-2xl font-bold text-blue-700">
                      {episode.characters.length}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <p className="text-sm text-green-600">
                      <span className="font-medium">
                        Locaciones relacionadas:
                      </span>
                    </p>
                    <p className="text-2xl font-bold text-green-700">
                      {loadingLocations ? '...' : locations.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <p>
                Creado: {new Date(episode.created).toLocaleDateString('es-ES')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <CharacterList
          characters={characters}
          loading={loadingCharacters}
          showTitle={true}
        />
      </div>

      <div className="mb-5">
        <LocationList locations={locations} showTitle={true} />
      </div>
    </div>
  );
}
