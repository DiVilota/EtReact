import api from './api';

const estadisticasService = {
  // Obtener estadísticas generales
  getEstadisticasGenerales: async () => {
    try {
      const response = await api.get('/estadisticas');
      return response.data;
    } catch (error) {
      console.warn('Backend no disponible, usando datos mock');
      // Datos mock
      return {
        total_juegos: 150,
        total_usuarios: 1250,
        total_resenas: 430,
        juegos_populares: [
          { id: 1, titulo: 'The Witcher 3', ventas: 450 },
          { id: 2, titulo: 'Cyberpunk 2077', ventas: 380 },
          { id: 3, titulo: 'Red Dead 2', ventas: 320 },
          { id: 4, titulo: 'GTA V', ventas: 280 },
          { id: 5, titulo: 'Minecraft', ventas: 250 }
        ],
        resenas_recientes: [
          {
            id: 1,
            juego_titulo: 'The Last of Us',
            usuario_nombre: 'GamerPro',
            valoracion: 5,
            comentario: 'Obra maestra absoluta',
            fecha_publicacion: new Date().toISOString()
          },
          {
            id: 2,
            juego_titulo: 'Elden Ring',
            usuario_nombre: 'DarkSoul',
            valoracion: 5,
            comentario: 'Increíble experiencia',
            fecha_publicacion: new Date(Date.now() - 3600000).toISOString()
          },
          {
            id: 3,
            juego_titulo: 'Baldurs Gate 3',
            usuario_nombre: 'RPGFan',
            valoracion: 4,
            comentario: 'Muy buen juego, pero largo',
            fecha_publicacion: new Date(Date.now() - 7200000).toISOString()
          }
        ],
        usuarios_activos: 856,
        ventas_mes: 12450000
      };
    }
  },
  
  // Obtener estadísticas por categoría
  getEstadisticasPorCategoria: async () => {
    try {
      const response = await api.get('/estadisticas/categorias');
      return response.data;
    } catch (error) {
      return {
        accion: 45,
        aventura: 38,
        rpg: 27,
        estrategia: 15,
        deportes: 12,
        carreras: 8,
        otros: 5
      };
    }
  }
};

export default estadisticasService;
