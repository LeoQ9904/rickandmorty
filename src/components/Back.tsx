import Link from 'next/link';

export default function Back() {
  return (
    <Link
      href="/"
      className="fixed top-5 right-2 z-50 rounded-full p-1 shadow-lg hover:shadow-xl transition-all duration-200 group sm:hidden"
      title="Volver al inicio"
    >
      <svg
        className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </Link>
  );
}
