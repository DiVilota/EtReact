import GameCard from "./GameCard";
import Loading from "../common/Loading";

const GameGrid = ({ games, isLoading, emptyMessage = "No se encontraron juegos" }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loading message="Cargando juegos..." />
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎮</div>
        <p className="text-xl text-gray-400 font-mono">{emptyMessage}</p>
        <p className="text-sm text-gray-600 mt-2 font-mono">
          Intenta con otra búsqueda o categoría
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {games.map((game, index) => (
        <GameCard key={game?.id ?? game?.rawgId ?? `${game?.titulo}-${index}`} game={game} />
      ))}
    </div>
  );
};

export default GameGrid;
