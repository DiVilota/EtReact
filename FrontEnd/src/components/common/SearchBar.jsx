import { useState, useEffect } from "react";

const SearchBar = ({
  onSearch,
  placeholder = "Buscar juegos...",
  debounceTime = 500,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!onSearch) return;

    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceTime, onSearch]);

  const handleClear = () => {
    setSearchTerm(""); // el efecto se encarga de disparar la búsqueda
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        className={`
          relative flex items-center
          bg-bg-card
          border-2
          ${isFocused ? "border-neon-pink shadow-neon-pink" : "border-purple-primary"}
          rounded-lg
          transition-all duration-300
          overflow-hidden
        `}
      >
        {/* Icono de búsqueda */}
        <div className="pl-4 pr-2">
          <span className="text-2xl">🔍</span>
        </div>

        {/* Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white py-3 pr-4 outline-none font-mono placeholder-gray-500"
        />

        {/* Botón de limpiar */}
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="px-4 text-neon-cyan hover:text-neon-pink transition-colors text-xl"
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>

      {/* Indicador */}
      {searchTerm && (
        <div className="mt-2 text-sm text-neon-cyan font-mono text-center animate-pulse">
          Buscando: "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;
