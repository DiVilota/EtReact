import StarRating from '../common/StarRating';

const ReviewCard = ({ review, onDelete, canDelete = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="p-6 bg-bg-card border-2 border-purple-primary rounded-xl hover:border-neon-cyan transition-all">
      {/* Header con usuario y fecha */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-primary rounded-full flex items-center justify-center text-xl">
            👤
          </div>
          <div>
            <h4 className="font-bold text-neon-cyan">
              {review.usuario_nombre || 'Usuario'}
            </h4>
            <p className="text-sm text-gray-500 font-mono">
              {formatDate(review.fecha_publicacion)}
            </p>
          </div>
        </div>
        
        {canDelete && (
          <button
            onClick={() => onDelete(review.id)}
            className="text-red-500 hover:text-red-400 transition-colors"
            aria-label="Eliminar reseña"
          >
            🗑️
          </button>
        )}
      </div>
      
      {/* Rating */}
      <div className="mb-3">
        <StarRating 
          rating={review.valoracion} 
          readonly 
          size="sm" 
        />
      </div>
      
      {/* Comentario */}
      <p className="text-gray-300 leading-relaxed font-mono">
        {review.comentario}
      </p>
    </div>
  );
};

export default ReviewCard;
