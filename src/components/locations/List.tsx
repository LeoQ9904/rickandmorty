import { Location } from '@/types';
import Link from 'next/link';
import Loading from '@/components/Loading';
import LoadError from '@/components/LoadError';
import FavoriteButton from '@/components/FavoriteButton';
import { useFavorites } from '@/hooks/useFavorites';

interface LocationListProps {
  locations: Location[];
  loading?: boolean;
  showTitle?: boolean;
  title?: string;
}

export default function LocationList({
  locations,
  loading = false,
  showTitle = true,
  title,
}: LocationListProps) {
  const { isLocationFavorite, toggleLocationFavorite } = useFavorites();

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

  const getLocationTypeStyle = (locationType: string) => {
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

  if (locations.length === 0) {
    return <LoadError message="No se encontraron locaciones." />;
  }

  return (
    <div>
      {showTitle && (
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {title || `Locaciones Relacionadas (${locations.length})`}
        </h2>
      )}

      <div className={`grid gap-6 grid-cols-2 lg:grid-cols-3`}>
        {locations.map(location => {
          const typeStyle = getLocationTypeStyle(location.type);
          return (
            <Link
              key={location.id}
              href={`/locations/${location.id}`}
              className={`shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer block relative`}
            >
              <div className="absolute top-2 right-2">
                <FavoriteButton
                  isFavorite={isLocationFavorite(location.id)}
                  onToggle={() => toggleLocationFavorite(location)}
                  size="sm"
                />
              </div>

              <div className="flex items-start justify-between mb-3">
                <h3 className={`font-semibold text-xl pr-8`}>
                  {location.name}
                </h3>
              </div>

              <div className={`space-y-2 text-sm`}>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Tipo:</span>{' '}
                  {location.type}
                </p>

                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Dimensión:</span>{' '}
                  <span>{location.dimension}</span>
                </p>

                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Residentes:</span>{' '}
                  {location.residents.length} personajes
                </p>

                <div className="flex items-center pt-1">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${typeStyle.bgColor} ${typeStyle.textColor}`}
                  >
                    {typeStyle.name}
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
