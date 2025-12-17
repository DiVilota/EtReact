import { get, post } from './api';
import { API_CONFIG } from '../utils/constants';

// =================== CONTACTO ===================

// Enviar formulario de contacto
export const enviarContacto = async (datos) => {
  try {
    const data = await post(API_CONFIG.endpoints.contacto, datos);
    console.log('Mensaje de contacto enviado:', data);
    return data;
  } catch (error) {
    console.error('Error al enviar contacto:', error);
    throw error;
  }
};

// Validar datos del formulario de contacto
export const validarDatosContacto = (datos) => {
  const errores = {};
  
  if (!datos.nombre || datos.nombre.trim().length < 2) {
    errores.nombre = 'El nombre debe tener al menos 2 caracteres';
  }
  
  if (!datos.email || !datos.email.includes('@')) {
    errores.email = 'Email inválido';
  }
  
  if (!datos.mensaje || datos.mensaje.trim().length < 10) {
    errores.mensaje = 'El mensaje debe tener al menos 10 caracteres';
  }
  
  return errores;
};

// =================== ESTADÍSTICAS ===================

// Obtener todas las estadísticas
export const obtenerEstadisticas = async () => {
  try {
    return await get(API_CONFIG.endpoints.estadisticas);
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return null;
  }
};

// Obtener estadísticas específicas
export const obtenerEstadisticasPorTipo = async (tipo) => {
  try {
    return await get(`${API_CONFIG.endpoints.estadisticas}/${tipo}`);
  } catch (error) {
    console.error(`Error al obtener estadísticas de ${tipo}:`, error);
    return null;
  }
};

// =================== ESTADÍSTICAS LOCALES (FALLBACK) ===================

// Calcular estadísticas locales si el backend no está disponible
export const calcularEstadisticasLocales = (juegos, resenas) => {
  try {
    const stats = {
      totalJuegos: juegos.length,
      totalResenas: Object.keys(resenas).length,
      promedioRating: 0,
      juegoMasValorado: null,
      resenasRecientes: []
    };
    
    // Calcular promedio de rating
    const ratings = Object.values(resenas).map(r => r.calificacion);
    if (ratings.length > 0) {
      stats.promedioRating = (
        ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
      ).toFixed(1);
    }
    
    // Encontrar juego más valorado
    const resenasArray = Object.entries(resenas).map(([juegoId, resena]) => ({
      juegoId: parseInt(juegoId),
      ...resena
    }));
    
    if (resenasArray.length > 0) {
      const mejorResena = resenasArray.reduce((max, resena) => 
        resena.calificacion > max.calificacion ? resena : max
      );
      
      const juegoMejorValorado = juegos.find(j => j.id === mejorResena.juegoId);
      if (juegoMejorValorado) {
        stats.juegoMasValorado = {
          ...juegoMejorValorado,
          rating: mejorResena.calificacion
        };
      }
    }
    
    // Reseñas recientes (últimas 5)
    stats.resenasRecientes = resenasArray
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .slice(0, 5);
    
    return stats;
    
  } catch (error) {
    console.error('Error al calcular estadísticas locales:', error);
    return {
      totalJuegos: 0,
      totalResenas: 0,
      promedioRating: 0,
      juegoMasValorado: null,
      resenasRecientes: []
    };
  }
};

// Exportar estadísticas combinadas (backend + locales)
export const obtenerEstadisticasCombinadas = async (juegos = [], resenasLocales = {}) => {
  try {
    // Intentar obtener del backend primero
    const statsBackend = await obtenerEstadisticas();
    
    if (statsBackend) {
      return statsBackend;
    }
    
    // Si no hay backend, calcular localmente
    console.log('Calculando estadísticas localmente...');
    return calcularEstadisticasLocales(juegos, resenasLocales);
    
  } catch (error) {
    console.error('Error al obtener estadísticas combinadas:', error);
    return calcularEstadisticasLocales(juegos, resenasLocales);
  }
};