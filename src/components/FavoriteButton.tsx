'use client';
import { useState } from 'react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function FavoriteButton({
  isFavorite,
  onToggle,
  size = 'md',
  className = '',
}: FavoriteButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAnimating(true);
    onToggle();
    setTimeout(() => setIsAnimating(false), 200);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-5 h-5';
      case 'md':
        return 'w-6 h-6';
      case 'lg':
        return 'w-8 h-8';
      default:
        return 'w-6 h-6';
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative flex items-center justify-center p-1 rounded-full
        transition-all duration-200 hover:bg-white/20
        ${isAnimating ? 'scale-125' : 'scale-100'}
        ${className}
      `}
      title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <svg
        className={`${getSizeClasses()} transition-colors duration-200`}
        fill={isFavorite ? '#ef4444' : 'none'}
        stroke={isFavorite ? '#ef4444' : '#6b7280'}
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        />
      </svg>
    </button>
  );
}
