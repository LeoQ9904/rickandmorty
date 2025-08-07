import { rickAndMortyApi } from '@/providers/rickandmorty-api';
import CharacterDetailClient from '@/components/character/Detail';

export async function generateStaticParams() {
  try {
    const response = await rickAndMortyApi.getAllCharacters();
    const totalPages = response.info.pages;

    const allCharacters = [...response.results];

    for (let page = 2; page <= Math.min(totalPages, 10); page++) {
      const pageResponse = await rickAndMortyApi.getAllCharacters({ page });
      allCharacters.push(...pageResponse.results);
    }

    return allCharacters.map(character => ({
      id: character.id.toString(),
    }));
  } catch {
    return Array.from({ length: 100 }, (_, i) => ({
      id: (i + 1).toString(),
    }));
  }
}

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CharacterDetailClient characterId={id} />;
}
