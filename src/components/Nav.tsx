'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useFavorites } from '@/hooks/useFavorites';

export default function Nav() {
  const pathname = usePathname();
  const { getTotalFavorites, isLoaded } = useFavorites();

  // Listado de rutas de navegación
  const navItems = [
    { name: 'Favoritos', path: '/favorites' },
    { name: 'Personajes', path: '/characters' },
    { name: 'Episodios', path: '/episodes' },
    { name: 'Localizaciones', path: '/locations' },
  ];

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  const totalFavorites = getTotalFavorites();

  return (
    <section className="relative">
      <div className="flex h-14 md:px-10 pb-0.5 overflow-auto">
        {navItems.map(item => (
          <Link
            key={item.name}
            href={item.path}
            className={`btn btn-nav transition-all duration-200 flex items-center justify-center px-6 gap-2 relative ${isActive(item.path) ? 'btn-nav-active' : ''}`}
          >
            {item.name === 'Favoritos' && !isActive(item.path) && (
              <Image
                src="/heart_favorite.svg"
                alt="Favoritos"
                width={24}
                height={24}
                className="flex-shrink-0 text-red-400"
              />
            )}
            {item.name === 'Favoritos' && isActive(item.path) && (
              <Image
                src="/heart_favorite_out.svg"
                alt="Favoritos"
                width={24}
                height={24}
                className="flex-shrink-0 text-red-400"
              />
            )}
            {item.name}
            {item.name === 'Favoritos' && isLoaded && totalFavorites > 0 && (
              <span className="absolute -top-0 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {totalFavorites > 99 ? '99+' : totalFavorites}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
