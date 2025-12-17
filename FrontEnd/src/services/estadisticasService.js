import api from './api';
import reviewService from './reviewService';

const estadisticasService = {
  // Obtener estadísticas generales desde BD
  getEstadisticasGenerales: async () => {
    try {
      const response = await api.get('/estadisticas');
      const stats = response.data;
      
      // Obtener reseñas recientes
      const resenasRecientes = await reviewService.getRecentReviews();
      
      return {
        total_juegos: stats.totalJuegos,
        total_usuarios: stats.totalUsuarios,
        total_resenas: stats.totalResenas,
        usuarios_activos: stats.usuariosOnline,
        valoracion_promedio: stats.ratingPromedio,
        juego_mas_popular: stats.juegoMasPopular,
        categoria_mas_popular: stats.categoriaMasPopular,
        resenas_recientes: resenasRecientes,
        // Mock de juegos populares (tu backend no tiene este endpoint)
        juegos_populares: [
          { titulo: stats.juegoMasPopular || 'N/A', ventas: 100 }
        ],
        ventas_mes: 0
      };
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      // Fallback a datos básicos
      return {
        total_juegos: 0,
        total_usuarios: 0,
        total_resenas: 0,
        usuarios_activos: 0,
        resenas_recientes: [],
        juegos_populares: [],
        ventas_mes: 0
      };
    }
  },
  
  // Obtener estadísticas por categoría
  getEstadisticasPorCategoria: async () => {
    try {
      // Tu backend no tiene este endpoint, usar mock
      return {
        accion: 0,
        aventura: 0,
        rpg: 0,
        estrategia: 0,
        deportes: 0,
        carreras: 0,
        otros: 0
      };
    } catch (error) {
      return {};
    }
  }
};

export default estadisticasService;
