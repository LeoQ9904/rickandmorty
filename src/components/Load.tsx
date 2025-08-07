import Image from 'next/image';

interface LoadProps {
  onLoadMore: () => void;
  loading: boolean;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}

export default function Load({
  onLoadMore,
  loading,
  hasMore,
  currentPage,
  totalPages,
}: LoadProps) {
  if (!hasMore) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Image
              src="/refresh.svg"
              alt="Completado"
              width={32}
              height={32}
              className="text-gray-400"
            />
          </div>
          <p className="text-gray-600 font-medium">
            ¡Has visto toda la información!
          </p>
          <p className="text-gray-500 text-sm mt-1">
            No hay más contenido para mostrar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="text-center mb-4">
        <p className="text-gray-600 text-sm mb-2">
          Página {currentPage} de {totalPages}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          />
        </div>
      </div>

      <button
        onClick={onLoadMore}
        disabled={loading}
        className={`
          relative px-8 py-4 font-semibold cursor-pointer
          ${loading ? 'cursor-not-allowed' : 'transform hover:-translate-y-0.5'}`}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        ) : (
          <div className="flex items-center gap-2">
            <Image
              src="/refresh.svg"
              alt="Completado"
              width={32}
              height={32}
              className="text-gray-400"
            />
            Cargar más personajes
          </div>
        )}
      </button>
    </div>
  );
}
