'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { rickAndMortyApi } from '@/providers/rickandmorty-api';
import { Character, Episode, Location } from '@/types';
import Loading from '@/components/Loading';
import LoadError from '@/components/LoadError';
import EpisodeList from '@/components/episodes/List';
import LocationList from '@/components/locations/List';
import FavoriteButton from '@/components/FavoriteButton';
import { useFavorites } from '@/hooks/useFavorites';

interface CharacterDetailClientProps {
  characterId: string;
}

export default function CharacterDetailClient({
  characterId,
}: CharacterDetailClientProps) {
  const { isCharacterFavorite, toggleCharacterFavorite } = useFavorites();
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);
  const [loadingLocations, setLoadingLocations] = useState(false);

  useEffect(() => {
    if (!characterId) return;

    const loadCharacter = async () => {
      try {
        setLoading(true);
        setError(null);

        const characterData = await rickAndMortyApi.getCharacterById(
          parseInt(characterId)
        );
        setCharacter(characterData);

        if (characterData.episode && characterData.episode.length > 0) {
          setLoadingEpisodes(true);
          const episodeIds = characterData.episode
            .map(url => {
              const match = url.match(/\/(\d+)$/);
              return match ? parseInt(match[1], 10) : 0;
            })
            .filter(id => id > 0);

          const episodesData =
            await rickAndMortyApi.getMultipleEpisodes(episodeIds);
          setEpisodes(
            Array.isArray(episodesData) ? episodesData : [episodesData]
          );
          setLoadingEpisodes(false);
        }

        const locationUrls = [
          characterData.origin.url,
          characterData.location.url,
        ].filter(url => url && url !== 'unknown' && !url.includes('unknown'));

        if (locationUrls.length > 0) {
          setLoadingLocations(true);
          const locationIds = locationUrls
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
          setLoadingLocations(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
        setLoadingEpisodes(false);
        setLoadingLocations(false);
      }
    };

    loadCharacter();
  }, [characterId]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-500';
      case 'dead':
        return 'bg-red-500';
      case 'unknown':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'Vivo';
      case 'dead':
        return 'Muerto';
      case 'unknown':
        return 'Desconocido';
      default:
        return status;
    }
  };

  const getGenderText = (gender: string) => {
    switch (gender.toLowerCase()) {
      case 'male':
        return 'Masculino';
      case 'female':
        return 'Femenino';
      case 'genderless':
        return 'Sin género';
      case 'unknown':
        return 'Desconocido';
      default:
        return gender;
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !character) {
    return <LoadError message={error || 'Personaje no encontrado'} />;
  }

  return (
    <div className="">
      <div className="mb-5">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <Image
              src={character.image}
              alt={character.name}
              width={300}
              height={300}
              className="rounded-lg shadow-md"
              priority
            />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-800">
                {character.name}
              </h1>
              <FavoriteButton
                isFavorite={isCharacterFavorite(character.id)}
                onToggle={() => toggleCharacterFavorite(character)}
                size="lg"
              />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <div
                className={`w-3 h-3 rounded-full ${getStatusColor(character.status)}`}
              ></div>
              <span className="text-lg text-gray-700">
                {getStatusText(character.status)} - {character.species}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Información Básica
                </h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium text-gray-600">Género:</span>{' '}
                    {getGenderText(character.gender)}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Especie:</span>{' '}
                    {character.species}
                  </p>
                  {character.type && (
                    <p>
                      <span className="font-medium text-gray-600">Tipo:</span>{' '}
                      {character.type}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Ubicación</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium text-gray-600">Origen:</span>{' '}
                    {character.origin.name}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">
                      Ubicación actual:
                    </span>{' '}
                    {character.location.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <p>
                Creado:{' '}
                {new Date(character.created).toLocaleDateString('es-ES')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <EpisodeList episodes={episodes} loading={loadingEpisodes} />
      </div>

      <div className="">
        <LocationList locations={locations} loading={loadingLocations} />
      </div>
    </div>
  );
}
