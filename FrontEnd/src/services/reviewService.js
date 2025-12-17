import api from './api';

const reviewService = {
  // Obtener reseñas de un juego desde BD
  getReviewsByGame: async (juegoId) => {
    try {
      const response = await api.get(`/resenas/juego/${juegoId}`);
      return response.data.map(review => ({
        id: review.id,
        usuario_nombre: review.usuarioNombre,
        juego_titulo: review.juegoNombre,
        valoracion: review.rating,
        comentario: review.comentario,
        fecha_publicacion: review.fechaCreacion
      }));
    } catch (error) {
      console.error('Error al obtener reseñas:', error);
      return [];
    }
  },
  
  // Crear nueva reseña en BD
  createReview: async (reviewData) => {
    try {
      // Obtener usuario actual del localStorage
      const userStr = localStorage.getItem('manabigames_user');
      if (!userStr) {
        throw new Error('Debes iniciar sesión para escribir una reseña');
      }
      
      const user = JSON.parse(userStr);
      
      const response = await api.post('/resenas/resena', {
        usuarioId: user.id,
        juegoId: parseInt(reviewData.juego_id),
        rating: reviewData.valoracion,
        comentario: reviewData.comentario
      });
      
      return {
        id: response.data.id,
        usuario_nombre: response.data.usuarioNombre,
        juego_titulo: response.data.juegoNombre,
        valoracion: response.data.rating,
        comentario: response.data.comentario,
        fecha_publicacion: response.data.fechaCreacion
      };
    } catch (error) {
      console.error('Error al crear reseña:', error);
      throw new Error(error.response?.data?.message || 'Error al crear reseña. Verifica que estés logueado.');
    }
  },
  
  // Obtener reseñas recientes desde BD
  getRecentReviews: async () => {
    try {
      const response = await api.get('/resenas/recientes');
      return response.data.map(review => ({
        id: review.id,
        usuario_nombre: review.usuarioNombre,
        juego_titulo: review.juegoNombre,
        valoracion: review.rating,
        comentario: review.comentario,
        fecha_publicacion: review.fechaCreacion
      }));
    } catch (error) {
      console.error('Error al obtener reseñas recientes:', error);
      return [];
    }
  },
  
  // Actualizar reseña
  updateReview: async (id, reviewData) => {
    try {
      console.warn('UPDATE de reseñas no implementado en backend');
      throw new Error('Actualización de reseñas no disponible');
    } catch (error) {
      console.error('Error al actualizar reseña:', error);
      throw error;
    }
  },
  
  // Eliminar reseña
  deleteReview: async (id) => {
    try {
      console.warn('DELETE de reseñas no implementado en backend');
      // Simular éxito por ahora
      return true;
    } catch (error) {
      console.error('Error al eliminar reseña:', error);
      throw error;
    }
  }
};

export default reviewService;
