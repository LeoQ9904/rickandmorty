import { rickAndMortyApi } from '@/providers/rickandmorty-api';
import EpisodeDetailClient from '@/components/episodes/Detail';

export async function generateStaticParams() {
  try {
    const response = await rickAndMortyApi.getAllEpisodes();
    const totalPages = response.info.pages;
    const allEpisodes = [...response.results];

    for (let page = 2; page <= Math.min(totalPages, 10); page++) {
      const pageResponse = await rickAndMortyApi.getAllEpisodes({ page });
      allEpisodes.push(...pageResponse.results);
    }

    return allEpisodes.map(episode => ({
      id: episode.id.toString(),
    }));
  } catch {
    return Array.from({ length: 50 }, (_, i) => ({
      id: (i + 1).toString(),
    }));
  }
}

export default function EpisodeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <EpisodeDetailClient episodeId={params.id} />;
}
