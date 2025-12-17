import { useMemo } from "react";
import useGames from "../hooks/useGames";
import GameCard from "../components/common/GameCard";
import SearchBar from "../components/common/SearchBar";

function adaptGameToCard(j) {
  return {
    id: j.id,
    titulo: j.titulo ?? j.nombre ?? "Sin título",
    descripcion: j.descripcion ?? "",
    imagen: j.imagen ?? j.imagenUrl ?? "",
    precio: j.precio ?? 0,
    plataformas: j.plataformas ?? (j.consola ? [j.consola] : []),
    generos: j.generos ?? (j.categoria ? [j.categoria] : []),
    valoracion_promedio: j.valoracion_promedio ?? j.ratingPromedio ?? 0,
    total_resenas: j.total_resenas ?? j.totalResenas ?? 0,
  };
}

const Home = () => {
  const { games, isLoading, error, setSearchTerm } = useGames();

  const gamesForCards = useMemo(
    () => (games || []).map(adaptGameToCard),
    [games]
  );

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center py-28 px-4 bg-gradient-to-b from-black via-bg-dark to-bg-dark">
        <h2 className="text-4xl md:text-6xl neon mb-6 font-orbitron">
          Tu viaje retro comienza aquí
        </h2>

        <p className="text-purple-primary text-lg mb-10 max-w-2xl">
          Explora los clásicos que marcaron una era.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#catalogo"
            className="cta-glow bg-neon-cyan text-black px-6 py-3 rounded-full font-bold"
          >
            Explorar catálogo
          </a>
          <a
            href="/dashboard"
            className="cta-glow bg-purple-primary text-white px-6 py-3 rounded-full font-bold"
          >
            Ver Dashboard
          </a>
        </div>

        {/* SEARCH BAR */}
        <div className="absolute -bottom-8 w-full px-4">
          <SearchBar
            onSearch={(term) => setSearchTerm(term)}
            placeholder="Buscar juegos retro..."
            debounceTime={500}
          />
        </div>
      </section>

      {/* CATÁLOGO */}
      <section className="pt-20 p-6" id="catalogo">
        <h1 className="neon text-3xl mb-8 font-orbitron text-center">
          Juegos Clásicos
        </h1>

        {isLoading ? (
          <div className="text-center text-purple-primary p-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-neon-cyan"></div>
            <p className="mt-4">Cargando juegos...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 p-8">{error}</div>
        ) : gamesForCards.length === 0 ? (
          <div className="text-center text-gray-400 p-8">
            <p className="text-lg">No se encontraron juegos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gamesForCards.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
