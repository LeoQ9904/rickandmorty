import { Character } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import Loading from '@/components/Loading';
import LoadError from '@/components/LoadError';
import FavoriteButton from '@/components/FavoriteButton';
import { useFavorites } from '@/hooks/useFavorites';

interface CharacterListProps {
  characters: Character[];
  loading?: boolean;
  showTitle?: boolean;
  title?: string;
}

export default function CharacterList({
  characters,
  loading = false,
  showTitle = true,
  title,
}: CharacterListProps) {
  const { isCharacterFavorite, toggleCharacterFavorite } = useFavorites();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-100 text-green-800';
      case 'dead':
        return 'bg-red-100 text-red-800';
      case 'unknown':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  if (characters.length === 0) {
    return <LoadError message="No se encontraron personajes." />;
  }

  return (
    <div>
      {showTitle && (
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {title || `Personajes (${characters.length})`}
        </h2>
      )}

      <div className={`grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-5`}>
        {characters.map(character => (
          <Link
            key={character.id}
            href={`/characters/${character.id}`}
            className="group cursor-pointer"
          >
            <div
              className={`overflow-hidden transition-transform duration-200 hover:scale-105`}
            >
              <div className={`relative h-64 w-full`}>
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  className="object-cover rounded-2xl"
                  sizes={
                    '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  }
                />
                <div className="absolute top-2 right-2">
                  <FavoriteButton
                    isFavorite={isCharacterFavorite(character.id)}
                    onToggle={() => toggleCharacterFavorite(character)}
                    size="md"
                  />
                </div>
              </div>

              <div className={'p-3'}>
                <h3
                  className={`font-semibold group-hover:text-blue-600 transition-colors line-clamp-2 'text-lg'`}
                >
                  {character.name}
                </h3>

                <div className={`space-y-1 text-sm`}>
                  <p className="text-gray-600">
                    <span className="font-medium">Estado:</span>
                    <span
                      className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(character.status)}`}
                    >
                      {getStatusText(character.status)}
                    </span>
                  </p>

                  <p className="text-gray-600">
                    <span className="font-medium">Especie:</span>{' '}
                    {character.species}
                  </p>

                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium">Género:</span>{' '}
                      {getGenderText(character.gender)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Origen:</span>{' '}
                      {character.origin.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
