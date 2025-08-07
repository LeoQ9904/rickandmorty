'use client';

import { useState, useEffect } from 'react';
import { rickAndMortyApi } from '@/providers/rickandmorty-api';
import { Episode } from '@/types';
import Load from '@/components/Load';
import LoadError from '@/components/LoadError';
import Loading from '@/components/Loading';
import NoInfo from '@/components/NoInfo';
import EpisodeList from '@/components/episodes/List';

export default function Episodes() {
  const [allEpisodes, setAllEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadEpisodes = async (page: number, append: boolean = false) => {
    try {
      if (!append) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      const response = await rickAndMortyApi.getAllEpisodes({ page });

      if (append) {
        setAllEpisodes(prev => [...prev, ...response.results]);
      } else {
        setAllEpisodes(response.results);
      }

      setTotalPages(response.info.pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      if (!append) {
        setAllEpisodes([]);
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
      loadEpisodes(nextPage, true);
    }
  };

  useEffect(() => {
    loadEpisodes(1);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <LoadError message={`Error al cargar los episodios: ${error}`} />;
  }

  return (
    <div>
      <EpisodeList episodes={allEpisodes} showTitle={false} />

      <Load
        onLoadMore={handleLoadMore}
        loading={loadingMore}
        hasMore={currentPage < totalPages}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {allEpisodes.length === 0 && !loading && !error && <NoInfo />}
    </div>
  );
}
