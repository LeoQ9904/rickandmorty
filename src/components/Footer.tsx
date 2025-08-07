'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const openGitHub = () => {
    window.open('https://github.com/LeoQ9904', '_blank');
  };

  return (
    <footer className="relative z-10 bg-white border-t border-gray-200 mt-auto">
      <div className="w-full max-w-6xl mx-auto px-5 py-6">
        <div className="flex justify-center items-center w-full">
          <div className="flex-1 text-center">
            <p className="text-sm text-gray-700 mb-1 font-normal opacity-80 m-0">
              Desarrollado por{' '}
              <span
                onClick={openGitHub}
                className="font-semibold text-blue-600 hover:opacity-80 transition-opacity duration-200 cursor-pointer"
              >
                LeoQ9904
              </span>
            </p>
            <button
              onClick={openGitHub}
              className="text-xs text-gray-700 opacity-60 hover:opacity-80 transition-opacity duration-200 cursor-pointer bg-transparent border-none p-0 font-light m-0 md:text-xs sm:text-[0.7rem] xs:text-[0.65rem]"
            >
              Rick and Morty App © {currentYear}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
