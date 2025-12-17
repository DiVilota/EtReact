import StarRating from '../common/StarRating';

const ReviewsTable = ({ reviews, onDelete, onApprove }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-purple-primary">
            <th className="text-left p-4 text-neon-cyan">Usuario</th>
            <th className="text-left p-4 text-neon-cyan">Juego</th>
            <th className="text-left p-4 text-neon-cyan">Rating</th>
            <th className="text-left p-4 text-neon-cyan">Comentario</th>
            <th className="text-left p-4 text-neon-cyan">Fecha</th>
            <th className="text-left p-4 text-neon-cyan">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.id} className="border-b border-purple-primary/30 hover:bg-bg-dark transition-colors">
              <td className="p-4 text-white">{review.usuario_nombre}</td>
              <td className="p-4 text-gray-300">{review.juego_titulo}</td>
              <td className="p-4">
                <StarRating rating={review.valoracion} readonly size="sm" />
              </td>
              <td className="p-4 text-gray-400 max-w-md truncate">
                {review.comentario}
              </td>
              <td className="p-4 text-gray-500 text-sm">
                {formatDate(review.fecha_publicacion)}
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  {onApprove && (
                    <button 
                      onClick={() => onApprove(review.id)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-sm"
                      title="Aprobar"
                    >
                      ✓
                    </button>
                  )}
                  <button 
                    onClick={() => onDelete(review.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm"
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {reviews.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No hay reseñas pendientes
        </div>
      )}
    </div>
  );
};

export default ReviewsTable;
