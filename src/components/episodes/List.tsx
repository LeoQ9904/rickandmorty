import { Episode } from '@/types';
import Link from 'next/link';
import Loading from '@/components/Loading';
import LoadError from '@/components/LoadError';
import FavoriteButton from '@/components/FavoriteButton';
import { useFavorites } from '@/hooks/useFavorites';

interface EpisodeListProps {
  episodes: Episode[];
  loading?: boolean;
  showTitle?: boolean;
  title?: string;
}

export default function EpisodeList({
  episodes,
  loading = false,
  showTitle = true,
  title,
}: EpisodeListProps) {
  const { isEpisodeFavorite, toggleEpisodeFavorite } = useFavorites();

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

  const getSeasonStyle = (episodeCode: string) => {
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

  if (episodes.length === 0) {
    return <LoadError message="No se encontraron episodios." />;
  }

  return (
    <div>
      {showTitle && (
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {title || `Episodios (${episodes.length})`}
        </h2>
      )}

      <div className={`grid gap-4 grid-cols-2 lg:grid-cols-3`}>
        {episodes.map(episode => {
          const seasonStyle = getSeasonStyle(episode.episode);

          return (
            <Link
              key={episode.id}
              href={`/episodes/${episode.id}`}
              className={`rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer block relative`}
            >
              <div className="absolute top-2 right-2">
                <FavoriteButton
                  isFavorite={isEpisodeFavorite(episode.id)}
                  onToggle={() => toggleEpisodeFavorite(episode)}
                  size="sm"
                />
              </div>

              <div className="flex flex-col">
                <h3 className={`font-semibold mb-2 text-xl pr-8`}>
                  {episode.name}
                </h3>
              </div>

              <div className={`space-y-1 text-sm`}>
                <p className="text-gray-600">
                  <span className="font-medium">Episodio:</span>{' '}
                  {episode.episode}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Fecha aire:</span>{' '}
                  {episode.air_date}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Personajes:</span>{' '}
                  {episode.characters.length}
                </p>
                <div className="flex items-center pt-1">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${seasonStyle.bgColor} ${seasonStyle.textColor}`}
                  >
                    {seasonStyle.name}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
