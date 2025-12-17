import api from './api';

const reviewService = {
  // Obtener reseñas de un juego
  getReviewsByGame: async (juegoId) => {
    try {
      const response = await api.get(`/resenas/juego/${juegoId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener reseñas:', error);
      // Retornar reseñas de ejemplo si falla
      return [
        {
          id: 1,
          usuario_id: 1,
          usuario_nombre: 'GamerPro',
          juego_id: juegoId,
          comentario: 'Excelente juego, muy recomendado. La historia es increíble y los gráficos son impresionantes.',
          valoracion: 5,
          fecha_publicacion: new Date().toISOString()
        },
        {
          id: 2,
          usuario_id: 2,
          usuario_nombre: 'RetroGamer',
          juego_id: juegoId,
          comentario: 'Buen juego pero tiene algunos bugs. Aún así lo disfruté mucho.',
          valoracion: 4,
          fecha_publicacion: new Date(Date.now() - 86400000).toISOString()
        }
      ];
    }
  },
  
  // Crear nueva reseña
  createReview: async (reviewData) => {
    try {
      const response = await api.post('/resenas', reviewData);
      return response.data;
    } catch (error) {
      console.error('Error al crear reseña:', error);
      throw error;
    }
  },
  
  // Actualizar reseña
  updateReview: async (id, reviewData) => {
    try {
      const response = await api.put(`/resenas/${id}`, reviewData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar reseña:', error);
      throw error;
    }
  },
  
  // Eliminar reseña
  deleteReview: async (id) => {
    try {
      await api.delete(`/resenas/${id}`);
      return true;
    } catch (error) {
      console.error('Error al eliminar reseña:', error);
      throw error;
    }
  }
};

export default reviewService;
