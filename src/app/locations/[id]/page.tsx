import { rickAndMortyApi } from '@/providers/rickandmorty-api';
import LocationDetailClient from '@/components/locations/Detail';

export async function generateStaticParams() {
  try {
    const response = await rickAndMortyApi.getAllLocations();
    const totalPages = response.info.pages;

    const allLocations = [...response.results];

    for (let page = 2; page <= Math.min(totalPages, 10); page++) {
      const pageResponse = await rickAndMortyApi.getAllLocations({ page });
      allLocations.push(...pageResponse.results);
    }

    return allLocations.map(location => ({
      id: location.id.toString(),
    }));
  } catch {
    return Array.from({ length: 100 }, (_, i) => ({
      id: (i + 1).toString(),
    }));
  }
}

export default function LocationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <LocationDetailClient locationId={params.id} />;
}
