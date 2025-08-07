'use client';

import { useState, useEffect } from 'react';
import { rickAndMortyApi } from '@/providers/rickandmorty-api';
import { Character } from '@/types';
import Load from '@/components/Load';
import LoadError from '@/components/LoadError';
import NoInfo from '@/components/NoInfo';
import Loading from '@/components/Loading';
import CharacterList from '@/components/character/List';

export default function Characters() {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadCharacters = async (page: number, append: boolean = false) => {
    try {
      if (!append) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      const response = await rickAndMortyApi.getAllCharacters({ page });

      if (append) {
        setAllCharacters(prev => [...prev, ...response.results]);
      } else {
        setAllCharacters(response.results);
      }

      setTotalPages(response.info.pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      if (!append) {
        setAllCharacters([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loadingMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadCharacters(nextPage, true);
    }
  };

  useEffect(() => {
    loadCharacters(1);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <LoadError message={`Error al cargar los personajes: ${error}`} />;
  }

  return (
    <div>
      <CharacterList characters={allCharacters} showTitle={false} />

      <Load
        onLoadMore={handleLoadMore}
        loading={loadingMore}
        hasMore={currentPage < totalPages}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {allCharacters.length == 0 && !loading && !error && <NoInfo />}
    </div>
  );
}
