import { Link } from "react-router-dom";
import StarRating from "../common/StarRating";

const GameCard = ({ game }) => {
  const {
    id,
    titulo,
    descripcion,
    imagen,
    precio,
    plataformas = [],
    generos = [],
    valoracion_promedio = 0,
    total_resenas = 0,
  } = game;

  const formatPrice = (price) => {
    if (!price || price === 0) return "Gratis";
    return `$${Number(price).toLocaleString("es-CL")}`;
  };

  const getPlatformColor = (platform) => {
    const colors = {
      PC: "bg-blue-500",
      PlayStation: "bg-indigo-500",
      Xbox: "bg-green-500",
      Nintendo: "bg-red-500",
      Mobile: "bg-purple-500",
    };

    for (const [key, color] of Object.entries(colors)) {
      if (String(platform).includes(key)) return color;
    }
    return "bg-gray-500";
  };

  return (
    <Link to={`/juego/${id}`} className="group block">
      <div
        className={`
          bg-bg-card
          border-2 border-purple-primary
          rounded-xl
          overflow-hidden
          transition-all duration-300
          hover:border-neon-pink
          hover:shadow-neon-pink
          hover:scale-105
          h-full
          flex flex-col
        `}
      >
        {/* Imagen del juego */}
        <div className="relative h-48 overflow-hidden bg-gray-900">
          {imagen ? (
            <img
              src={imagen}
              alt={titulo}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null; // evita loop si también falla el default
                img.src = "/assets/covers/default-game.jpg";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              🎮
            </div>
          )}

          {/* Precio badge */}
          <div className="absolute top-2 right-2 bg-purple-primary px-3 py-1 rounded-full font-bold text-sm shadow-lg">
            {formatPrice(precio)}
          </div>
        </div>

        {/* Contenido */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-neon-pink neon-glow mb-2 font-orbitron line-clamp-1">
            {titulo}
          </h3>

          <p className="text-gray-400 text-sm mb-3 flex-1 line-clamp-2 font-mono">
            {descripcion || "Sin descripción disponible"}
          </p>

          {/* Rating */}
          <div className="mb-3 flex items-center">
            <StarRating rating={valoracion_promedio} readonly size="sm" />
            {total_resenas > 0 && (
              <span className="text-xs text-gray-500 ml-2 font-mono">
                ({total_resenas} reseña{total_resenas !== 1 ? "s" : ""})
              </span>
            )}
          </div>

          {/* Plataformas */}
          {plataformas.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {plataformas.slice(0, 3).map((plataforma, index) => (
                <span
                  key={`${plataforma}-${index}`}
                  className={`
                    ${getPlatformColor(plataforma)}
                    text-white text-xs px-2 py-1 rounded-full font-mono
                  `}
                >
                  {plataforma}
                </span>
              ))}
              {plataformas.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{plataformas.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Géneros */}
          {generos.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {generos.slice(0, 2).map((genero, index) => (
                <span
                  key={`${genero}-${index}`}
                  className="border border-neon-cyan text-neon-cyan text-xs px-2 py-1 rounded-full font-mono"
                >
                  {genero}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Hover effect - Ver más */}
        <div className="px-4 py-3 bg-purple-primary text-center text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity font-orbitron">
          Ver Detalles →
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
