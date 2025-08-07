'use client';

import { useState, useEffect } from 'react';
import { rickAndMortyApi } from '@/providers/rickandmorty-api';
import {
  Character,
  Location,
  Episode,
  CharacterFilters,
  LocationFilters,
  EpisodeFilters,
} from '@/types';

// Hook para obtener personajes
export function useCharacters(filters: CharacterFilters = {}) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        setLoading(true);
        setError(null);

        const response = await rickAndMortyApi.getAllCharacters(filters);

        setCharacters(response.results);
        setTotalPages(response.info.pages);
        setTotalCount(response.info.count);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [
    filters.name,
    filters.status,
    filters.species,
    filters.type,
    filters.gender,
    filters.page,
  ]);

  return { characters, loading, error, totalPages, totalCount };
}

// Hook para obtener un personaje específico
export function useCharacter(id: number) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCharacter() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const response = await rickAndMortyApi.getCharacterById(id);
        setCharacter(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setCharacter(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacter();
  }, [id]);

  return { character, loading, error };
}

// Hook para obtener localizaciones
export function useLocations(filters: LocationFilters = {}) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    async function fetchLocations() {
      try {
        setLoading(true);
        setError(null);

        const response = await rickAndMortyApi.getAllLocations(filters);

        setLocations(response.results);
        setTotalPages(response.info.pages);
        setTotalCount(response.info.count);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setLocations([]);
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, [filters.name, filters.type, filters.dimension, filters.page]);

  return { locations, loading, error, totalPages, totalCount };
}

// Hook para obtener una localización específica
export function useLocation(id: number) {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocation() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const response = await rickAndMortyApi.getLocationById(id);
        setLocation(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setLocation(null);
      } finally {
        setLoading(false);
      }
    }

    fetchLocation();
  }, [id]);

  return { location, loading, error };
}

// Hook para obtener episodios
export function useEpisodes(filters: EpisodeFilters = {}) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    async function fetchEpisodes() {
      try {
        setLoading(true);
        setError(null);

        const response = await rickAndMortyApi.getAllEpisodes(filters);

        setEpisodes(response.results);
        setTotalPages(response.info.pages);
        setTotalCount(response.info.count);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEpisodes();
  }, [filters.name, filters.episode, filters.page]);

  return { episodes, loading, error, totalPages, totalCount };
}

// Hook para obtener un episodio específico
export function useEpisode(id: number) {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEpisode() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const response = await rickAndMortyApi.getEpisodeById(id);
        setEpisode(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setEpisode(null);
      } finally {
        setLoading(false);
      }
    }

    fetchEpisode();
  }, [id]);

  return { episode, loading, error };
}
