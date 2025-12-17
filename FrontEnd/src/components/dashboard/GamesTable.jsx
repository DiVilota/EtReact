import { useState } from 'react';
import { Link } from 'react-router-dom';

const GamesTable = ({ games, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredGames = games.filter(game =>
    game.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatPrice = (price) => {
    if (!price || price === 0) return 'Gratis';
    return `$${price.toLocaleString('es-CL')}`;
  };
  
  return (
    <div>
      {/* Buscador */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar juego..."
          className="px-4 py-2 bg-bg-dark border-2 border-purple-primary rounded-lg text-white font-mono focus:border-neon-pink outline-none"
        />
        <button className="px-6 py-2 bg-purple-primary hover:bg-neon-pink transition-colors rounded-lg font-bold">
          + Agregar Juego
        </button>
      </div>
      
      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-purple-primary">
              <th className="text-left p-4 text-neon-cyan">ID</th>
              <th className="text-left p-4 text-neon-cyan">Título</th>
              <th className="text-left p-4 text-neon-cyan">Precio</th>
              <th className="text-left p-4 text-neon-cyan">Rating</th>
              <th className="text-left p-4 text-neon-cyan">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredGames.map(game => (
              <tr key={game.id} className="border-b border-purple-primary/30 hover:bg-bg-dark transition-colors">
                <td className="p-4 text-gray-400">{game.id}</td>
                <td className="p-4">
                  <Link to={`/juego/${game.id}`} className="text-white hover:text-neon-pink transition-colors">
                    {game.titulo}
                  </Link>
                </td>
                <td className="p-4 text-neon-cyan font-bold">{formatPrice(game.precio)}</td>
                <td className="p-4 text-gray-300">
                  ⭐ {(game.valoracion_promedio || 0).toFixed(1)}
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-sm">
                      ✏️
                    </button>
                    <button 
                      onClick={() => onDelete(game.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredGames.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No se encontraron juegos
        </div>
      )}
    </div>
  );
};

export default GamesTable;
