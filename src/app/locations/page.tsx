'use client';

import { useState, useEffect } from 'react';
import { rickAndMortyApi } from '@/providers/rickandmorty-api';
import { Location } from '@/types';
import Load from '@/components/Load';
import NoInfo from '@/components/NoInfo';
import LoadError from '@/components/LoadError';
import Loading from '@/components/Loading';
import LocationList from '@/components/locations/List';

export default function Locations() {
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadLocations = async (page: number, append: boolean = false) => {
    try {
      if (!append) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      const response = await rickAndMortyApi.getAllLocations({ page });

      if (append) {
        setAllLocations(prev => [...prev, ...response.results]);
      } else {
        setAllLocations(response.results);
      }

      setTotalPages(response.info.pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      if (!append) {
        setAllLocations([]);
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
      loadLocations(nextPage, true);
    }
  };

  useEffect(() => {
    loadLocations(1);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <LoadError message={`Error al cargar las ubicaciones: ${error}`} />;
  }

  return (
    <div>
      <LocationList locations={allLocations} showTitle={false} />

      <Load
        onLoadMore={handleLoadMore}
        loading={loadingMore}
        hasMore={currentPage < totalPages}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {allLocations.length == 0 && !loading && !error && <NoInfo />}
    </div>
  );
}
