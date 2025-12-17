import api from './api';
import { obtenerUsuarioActual } from './userService';

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
      // ✅ Usar la misma fuente de sesión que el UserContext (userService)
      const user = obtenerUsuarioActual();
      if (!user) {
        throw new Error('Debes iniciar sesión para escribir una reseña');
      }

      // ✅ IDs robustos (por si el backend devuelve id con otro nombre)
      const usuarioId = Number(user.id ?? user.usuarioId ?? user.idUsuario);
      const juegoId = Number(reviewData.juego_id ?? reviewData.juegoId ?? reviewData.id);
      const rating = Number(reviewData.valoracion);
      const comentario = reviewData.comentario;

      if (!Number.isInteger(usuarioId)) {
        throw new Error('No se pudo obtener el ID del usuario (sesión inválida).');
      }
      if (!Number.isInteger(juegoId)) {
        throw new Error('No se pudo obtener el ID del juego.');
      }
      if (!Number.isInteger(rating)) {
        throw new Error('Rating inválido.');
      }

      const response = await api.post('/resenas/resena', {
        usuarioId,
        juegoId,
        rating,
        comentario
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
      throw new Error(
        error.response?.data?.message ||
        'Error al crear reseña. Verifica que estés logueado.'
      );
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

  updateReview: async () => {
    console.warn('UPDATE de reseñas no implementado en backend');
    throw new Error('Actualización de reseñas no disponible');
  },

  deleteReview: async () => {
    console.warn('DELETE de reseñas no implementado en backend');
    return true;
  }
};

export default reviewService;
