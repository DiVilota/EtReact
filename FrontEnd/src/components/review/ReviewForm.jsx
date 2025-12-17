import { useState } from 'react';
import StarRating from '../common/StarRating';

const ReviewForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    valoracion: 0,
    comentario: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validate = () => {
    const newErrors = {};
    
    if (formData.valoracion === 0) {
      newErrors.valoracion = 'Debes seleccionar una valoración';
    }
    
    if (!formData.comentario.trim()) {
      newErrors.comentario = 'El comentario es requerido';
    } else if (formData.comentario.length < 10) {
      newErrors.comentario = 'El comentario debe tener al menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ valoracion: 0, comentario: '' });
      setErrors({});
    } catch (error) {
      setErrors({ submit: error.message || 'Error al enviar reseña' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Valoración */}
      <div>
        <label className="block text-neon-cyan font-bold mb-2">
          Valoración
        </label>
        <StarRating
          rating={formData.valoracion}
          onRatingChange={(rating) => setFormData({ ...formData, valoracion: rating })}
          size="lg"
        />
        {errors.valoracion && (
          <p className="text-red-500 text-sm mt-1">{errors.valoracion}</p>
        )}
      </div>
      
      {/* Comentario */}
      <div>
        <label className="block text-neon-cyan font-bold mb-2">
          Comentario
        </label>
        <textarea
          value={formData.comentario}
          onChange={(e) => setFormData({ ...formData, comentario: e.target.value })}
          rows="5"
          className="w-full px-4 py-2 bg-bg-dark border-2 border-purple-primary rounded-lg text-white font-mono focus:border-neon-pink outline-none resize-none"
          placeholder="Escribe tu reseña aquí..."
        />
        <div className="flex justify-between mt-1">
          {errors.comentario ? (
            <p className="text-red-500 text-sm">{errors.comentario}</p>
          ) : (
            <p className="text-gray-500 text-sm">Mínimo 10 caracteres</p>
          )}
          <p className="text-gray-500 text-sm">{formData.comentario.length} / 1000</p>
        </div>
      </div>
      
      {/* Error de envío */}
      {errors.submit && (
        <div className="p-4 bg-red-900/20 border-2 border-red-500 rounded-lg">
          <p className="text-red-400">{errors.submit}</p>
        </div>
      )}
      
      {/* Botones */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 border-2 border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-colors rounded-lg font-bold"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-purple-primary hover:bg-neon-pink transition-colors rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Publicar Reseña'}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
