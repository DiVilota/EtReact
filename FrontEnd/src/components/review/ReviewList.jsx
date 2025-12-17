import { useState } from 'react';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import Modal from '../common/Modal';
import Loading from '../common/Loading';

const ReviewList = ({ reviews, isLoading, onAddReview, onDeleteReview }) => {
  const [showForm, setShowForm] = useState(false);
  
  const handleSubmit = async (formData) => {
    await onAddReview(formData);
    setShowForm(false);
  };
  
  if (isLoading) {
    return <Loading message="Cargando reseñas..." />;
  }
  
  return (
    <div>
      {/* Header con botón */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neon-cyan font-orbitron">
          Reseñas ({reviews.length})
        </h2>
        
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-2 bg-purple-primary hover:bg-neon-pink transition-colors rounded-lg font-bold"
        >
          ✍️ Escribir Reseña
        </button>
      </div>
      
      {/* Lista de reseñas */}
      {reviews.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p className="text-lg mb-2">📝 Aún no hay reseñas</p>
          <p className="text-sm">Sé el primero en escribir una</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map(review => (
            <ReviewCard 
              key={review.id} 
              review={review}
              onDelete={onDeleteReview}
              canDelete={false} // TODO: Verificar si es del usuario actual
            />
          ))}
        </div>
      )}
      
      {/* Modal con formulario */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="✍️ Escribe tu Reseña"
        size="lg"
      >
        <ReviewForm
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      </Modal>
    </div>
  );
};

export default ReviewList;
