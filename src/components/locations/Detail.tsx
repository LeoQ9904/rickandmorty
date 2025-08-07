'use client';

import { useState, useEffect } from 'react';
import { rickAndMortyApi } from '@/providers/rickandmorty-api';
import { Location, Character, Episode } from '@/types';
import EpisodeList from '@/components/episodes/List';
import CharacterList from '@/components/character/List';
import Loading from '@/components/Loading';
import LoadError from '@/components/LoadError';
import FavoriteButton from '@/components/FavoriteButton';
import { useFavorites } from '@/hooks/useFavorites';

interface LocationDetailClientProps {
  locationId: string;
}

export default function LocationDetailClient({
  locationId,
}: LocationDetailClientProps) {
  const { isLocationFavorite, toggleLocationFavorite } = useFavorites();
  const [location, setLocation] = useState<Location | null>(null);
  const [residents, setResidents] = useState<Character[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingResidents, setLoadingResidents] = useState(false);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  useEffect(() => {
    if (!locationId) return;

    const loadLocation = async () => {
      try {
        setLoading(true);
        setError(null);

        const locationData = await rickAndMortyApi.getLocationById(
          parseInt(locationId)
        );
        setLocation(locationData);

        if (locationData.residents && locationData.residents.length > 0) {
          setLoadingResidents(true);
          const residentIds = locationData.residents
            .map(url => {
              const match = url.match(/\/(\d+)$/);
              return match ? parseInt(match[1], 10) : 0;
            })
            .filter(id => id > 0);

          if (residentIds.length > 0) {
            const residentsData =
              await rickAndMortyApi.getMultipleCharacters(residentIds);
            const residentsArray = Array.isArray(residentsData)
              ? residentsData
              : [residentsData];
            setResidents(residentsArray);

            setLoadingEpisodes(true);
            const episodeUrls = new Set<string>();

            residentsArray.forEach(character => {
              if (character.episode && character.episode.length > 0) {
                character.episode.forEach(episodeUrl => {
                  episodeUrls.add(episodeUrl);
                });
              }
            });

            if (episodeUrls.size > 0) {
              const episodeIds = Array.from(episodeUrls)
                .map(url => {
                  const match = url.match(/\/(\d+)$/);
                  return match ? parseInt(match[1], 10) : 0;
                })
                .filter(id => id > 0)
                .sort((a, b) => a - b);

              if (episodeIds.length > 0) {
                const episodesData =
                  await rickAndMortyApi.getMultipleEpisodes(episodeIds);
                setEpisodes(
                  Array.isArray(episodesData) ? episodesData : [episodesData]
                );
              }
            }
            setLoadingEpisodes(false);
          }
          setLoadingResidents(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
        setLoadingResidents(false);
        setLoadingEpisodes(false);
      }
    };

    loadLocation();
  }, [locationId]);

  const getLocationTypeStyle = (locationType: string) => {
    const locationTypeColors = [
      {
        type: 'Planet',
        name: 'Planeta',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-700',
      },
      {
        type: 'Space station',
        name: 'Estación Espacial',
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-700',
      },
      {
        type: 'Dimension',
        name: 'Dimensión',
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
      },
      {
        type: 'Cluster',
        name: 'Cúmulo',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-700',
      },
      {
        type: 'Resort',
        name: 'Resort',
        bgColor: 'bg-pink-100',
        textColor: 'text-pink-700',
      },
      {
        type: 'TV',
        name: 'Televisión',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-700',
      },
      {
        type: 'Fantasy town',
        name: 'Ciudad Fantástica',
        bgColor: 'bg-indigo-100',
        textColor: 'text-indigo-700',
      },
      {
        type: 'Dream',
        name: 'Sueño',
        bgColor: 'bg-red-100',
        textColor: 'text-red-700',
      },
      {
        type: 'Microverse',
        name: 'Microverso',
        bgColor: 'bg-teal-100',
        textColor: 'text-teal-700',
      },
      {
        type: 'unknown',
        name: 'Desconocido',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-700',
      },
    ];

    const typeConfig = locationTypeColors.find(config =>
      locationType.toLowerCase().includes(config.type.toLowerCase())
    );
    return (
      typeConfig || {
        type: 'unknown',
        name: 'Desconocido',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-700',
      }
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !location) {
    return <LoadError message={error || 'Locación no encontrada'} />;
  }

  const typeStyle = getLocationTypeStyle(location.type);

  return (
    <div className="">
      <div className="mb-5">
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-800">
                {location.name}
              </h1>
              <FavoriteButton
                isFavorite={isLocationFavorite(location.id)}
                onToggle={() => toggleLocationFavorite(location)}
                size="lg"
              />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${typeStyle.bgColor} ${typeStyle.textColor}`}
              >
                {typeStyle.name}
              </span>
              <span className="text-lg text-indigo-700 font-medium">
                {location.dimension}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Información de la Locación
                </h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium text-gray-600">ID:</span>{' '}
                    {location.id}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Tipo:</span>{' '}
                    {location.type}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">
                      Dimensión:
                    </span>{' '}
                    {location.dimension}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">
                      Residentes:
                    </span>{' '}
                    {location.residents.length}
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
                      <span className="font-medium">Habitantes conocidos:</span>
                    </p>
                    <p className="text-2xl font-bold text-blue-700">
                      {location.residents.length}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <p className="text-sm text-green-600">
                      <span className="font-medium">
                        Episodios relacionados:
                      </span>
                    </p>
                    <p className="text-2xl font-bold text-green-700">
                      {loadingEpisodes ? '...' : episodes.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <p>
                Creada: {new Date(location.created).toLocaleDateString('es-ES')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <CharacterList
          characters={residents}
          loading={loadingResidents}
          showTitle={true}
        />
      </div>

      <div className="mb-5">
        <EpisodeList episodes={episodes} showTitle={true} />
      </div>
    </div>
  );
}
