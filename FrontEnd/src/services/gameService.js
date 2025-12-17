import { get } from './api';
import { API_CONFIG, RAWG_API } from '../utils/constants';
import axios from 'axios';

// =================== DATOS LOCALES DE FALLBACK ===================
const juegosLocales = [
  {
    id: 3,
    titulo: 'The Legend of Zelda',
    descripcion: 'Aventura épica en un mundo abierto de fantasía',
    imagen: '/assets/covers/zelda.png',
    plataformas: ['SNES'],
    generos: ['Aventura', 'Acción'],
    valoracion_promedio: 4.8,
    total_resenas: 156
  },
  {
    id: 2,
    titulo: 'Super Metroid',
    descripcion: 'Embarcate en una aventura con Samus Aran',
    imagen: '/assets/covers/supermetroid.png',
    precio: 39990,
    plataformas: ['SNES'],
    generos: ['Aventura', 'Acción'],
    valoracion_promedio: 4.2,
    total_resenas: 89
  },
  {
    id: 1,
    titulo: 'Chrono Trigger',
    descripcion: 'Lucha por salvar el mundo en este épico rpg',
    imagen: '/assets/covers/chronotrigger.png',
    precio: 0,
    plataformas: ['SNES'],
    generos: ['RPG, Acción'],
    valoracion_promedio: 4.5,
    total_resenas: 234
  },
];

// =================== TRANSFORMADORES ===================

// ✅ NUEVO: Transformar juego del BACKEND al formato del frontend
const transformarJuegoBackend = (juegoBackend) => ({
  id: juegoBackend.id,
  titulo: juegoBackend.nombre, // Backend usa 'nombre', frontend usa 'titulo'
  descripcion: juegoBackend.descripcion || 'Sin descripción disponible',
  imagen: juegoBackend.imagenUrl || '/assets/covers/default.png', // Backend usa 'imagenUrl'
  precio: 0, // El backend no tiene precio por ahora
  plataformas: juegoBackend.consola ? [juegoBackend.consola] : [], // Backend tiene consola singular
  generos: juegoBackend.categoria ? [juegoBackend.categoria] : [], // Backend tiene categoria singular
  valoracion_promedio: juegoBackend.ratingPromedio || 0,
  total_resenas: juegoBackend.totalResenas || 0,
  // Campos adicionales del backend que pueden ser útiles
  rawgId: juegoBackend.rawgId,
  anoLanzamiento: juegoBackend.anoLanzamiento,
  visualizaciones: juegoBackend.visualizaciones
});

// Transformar juego de RAWG al formato del frontend
const transformarJuegoRAWG = (juegoRAWG) => ({
  id: juegoRAWG.id,
  titulo: juegoRAWG.name,
  descripcion: juegoRAWG.description_raw || juegoRAWG.slug || 'Sin descripción disponible',
  imagen: juegoRAWG.background_image,
  precio: Math.floor(Math.random() * 60000), // Precio aleatorio
  plataformas: juegoRAWG.platforms?.map(p => p.platform.name) || [],
  generos: juegoRAWG.genres?.map(g => g.name) || [],
  valoracion_promedio: juegoRAWG.rating || 0,
  total_resenas: juegoRAWG.reviews_count || 0,
  desarrollador: juegoRAWG.developers?.[0]?.name || 'Desconocido',
  fecha_lanzamiento: juegoRAWG.released || 'Por anunciar'
});

// =================== JUEGOS DEL BACKEND ===================

// Obtener todos los juegos
export const obtenerJuegos = async () => {
  try {
    const juegos = await get(API_CONFIG.endpoints.juegos);
    // ✅ APLICAR TRANSFORMACIÓN
    return juegos ? juegos.map(transformarJuegoBackend) : null;
  } catch (error) {
    console.error('Error al obtener juegos del backend:', error);
    return null; // Retornamos null para indicar falla
  }
};

// Obtener un juego específico por ID
export const obtenerJuego = async (id) => {
  try {
    const juego = await get(`${API_CONFIG.endpoints.juegos}/${id}`);
    // ✅ APLICAR TRANSFORMACIÓN
    return juego ? transformarJuegoBackend(juego) : null;
  } catch (error) {
    console.error(`Error al obtener juego ${id} del backend:`, error);
    return null;
  }
};

// Buscar juegos por nombre
export const buscarJuegos = async (nombre) => {
  try {
    const juegos = await get(`${API_CONFIG.endpoints.juegos}/buscar`, { nombre });
    // ✅ APLICAR TRANSFORMACIÓN
    return juegos ? juegos.map(transformarJuegoBackend) : null;
  } catch (error) {
    console.error('Error al buscar juegos en backend:', error);
    return null;
  }
};

// ✅ NUEVO: Obtener juegos por categoría desde el backend
export const obtenerJuegosPorCategoriaBackend = async (categoria) => {
  try {
    const juegos = await get(`${API_CONFIG.endpoints.juegos}/categoria/${categoria}`);
    return juegos ? juegos.map(transformarJuegoBackend) : null;
  } catch (error) {
    console.error('Error al obtener juegos por categoría del backend:', error);
    return null;
  }
};

// ✅ NUEVO: Obtener juegos más vistos
export const obtenerJuegosMasVistos = async () => {
  try {
    const juegos = await get(`${API_CONFIG.endpoints.juegos}/mas-vistos`);
    return juegos ? juegos.map(transformarJuegoBackend) : null;
  } catch (error) {
    console.error('Error al obtener juegos más vistos:', error);
    return null;
  }
};

// ✅ NUEVO: Obtener juegos mejor rankeados
export const obtenerJuegosMejorRankeados = async () => {
  try {
    const juegos = await get(`${API_CONFIG.endpoints.juegos}/mejor-rankeados`);
    return juegos ? juegos.map(transformarJuegoBackend) : null;
  } catch (error) {
    console.error('Error al obtener juegos mejor rankeados:', error);
    return null;
  }
};

// =================== JUEGOS DE RAWG API ===================

// Obtener juegos populares de RAWG
export const obtenerJuegosRAWG = async (params = {}) => {
  try {
    const defaultParams = {
      key: RAWG_API.key,
      page_size: 20,
      ordering: '-rating',
      ...params
    };
    
    const response = await axios.get(`${RAWG_API.baseURL}/games`, {
      params: defaultParams
    });
    
    const juegos = response.data.results || [];
    // Transformar al formato del frontend
    return juegos.map(transformarJuegoRAWG);
  } catch (error) {
    console.error('Error al obtener juegos de RAWG:', error);
    return null;
  }
};

// Obtener detalles de un juego de RAWG
export const obtenerJuegoRAWG = async (id) => {
  try {
    const response = await axios.get(`${RAWG_API.baseURL}/games/${id}`, {
      params: { key: RAWG_API.key }
    });
    
    return transformarJuegoRAWG(response.data);
  } catch (error) {
    console.error(`Error al obtener juego ${id} de RAWG:`, error);
    return null;
  }
};

// Buscar juegos en RAWG
export const buscarJuegosRAWG = async (query) => {
  try {
    const response = await axios.get(`${RAWG_API.baseURL}/games`, {
      params: {
        key: RAWG_API.key,
        search: query,
        page_size: 20
      }
    });
    
    const juegos = response.data.results || [];
    // Transformar al formato del frontend
    return juegos.map(transformarJuegoRAWG);
  } catch (error) {
    console.error('Error al buscar en RAWG:', error);
    return null;
  }
};

// Obtener screenshots de un juego
export const obtenerScreenshots = async (id) => {
  try {
    const response = await axios.get(`${RAWG_API.baseURL}/games/${id}/screenshots`, {
      params: { key: RAWG_API.key }
    });
    
    return response.data.results || [];
  } catch (error) {
    console.error('Error al obtener screenshots:', error);
    return [];
  }
};

// Obtener juegos por categoría en RAWG
export const obtenerJuegosPorCategoriaRAWG = async (categoria) => {
  try {
    const response = await axios.get(`${RAWG_API.baseURL}/games`, {
      params: {
        key: RAWG_API.key,
        genres: categoria,
        page_size: 20
      }
    });
    
    const juegos = response.data.results || [];
    return juegos.map(transformarJuegoRAWG);
  } catch (error) {
    console.error('Error al obtener juegos por categoría en RAWG:', error);
    return null;
  }
};

// =================== FUNCIONES COMBINADAS CON FALLBACK AUTOMÁTICO ===================

// Obtener todos los juegos con fallback automático
export const obtenerJuegosCombinados = async () => {
  console.log('🎮 Intentando obtener juegos...');
  
  // 1. Intentar desde el backend
  try {
    const juegosBackend = await obtenerJuegos();
    if (juegosBackend && juegosBackend.length > 0) {
      console.log('✅ Juegos obtenidos del backend');
      return juegosBackend;
    }
  } catch (error) {
    console.warn('⚠️ Backend no disponible');
  }
  
  // 2. Si falla, intentar desde RAWG
  try {
    const juegosRAWG = await obtenerJuegosRAWG();
    if (juegosRAWG && juegosRAWG.length > 0) {
      console.log('✅ Juegos obtenidos de RAWG API');
      return juegosRAWG;
    }
  } catch (error) {
    console.warn('⚠️ RAWG API no disponible');
  }
  
  // 3. Como último recurso, usar datos locales
  console.log('💾 Usando datos locales de respaldo');
  return juegosLocales;
};

// Buscar en todas las fuentes con fallback
export const buscarEnTodasLasFuentes = async (query) => {
  console.log(`🔍 Buscando: "${query}"`);
  
  // 1. Intentar buscar en el backend
  try {
    const backendResults = await buscarJuegos(query);
    if (backendResults && backendResults.length > 0) {
      console.log('✅ Resultados del backend');
      return backendResults;
    }
  } catch (error) {
    console.warn('⚠️ Búsqueda en backend falló');
  }
  
  // 2. Si falla, buscar en RAWG
  try {
    const rawgResults = await buscarJuegosRAWG(query);
    if (rawgResults && rawgResults.length > 0) {
      console.log('✅ Resultados de RAWG');
      return rawgResults;
    }
  } catch (error) {
    console.warn('⚠️ Búsqueda en RAWG falló');
  }
  
  // 3. Como último recurso, buscar en datos locales
  console.log('💾 Buscando en datos locales');
  return juegosLocales.filter(juego => 
    juego.titulo.toLowerCase().includes(query.toLowerCase()) ||
    juego.descripcion.toLowerCase().includes(query.toLowerCase())
  );
};

// Obtener un juego específico con fallback
export const obtenerJuegoPorId = async (id) => {
  console.log(`🎮 Obteniendo juego ID: ${id}`);
  
  // 1. Intentar desde el backend
  try {
    const juegoBackend = await obtenerJuego(id);
    if (juegoBackend) {
      console.log('✅ Juego obtenido del backend');
      return juegoBackend;
    }
  } catch (error) {
    console.warn('⚠️ Backend no disponible');
  }
  
  // 2. Si falla, intentar desde RAWG
  try {
    const juegoRAWG = await obtenerJuegoRAWG(id);
    if (juegoRAWG) {
      console.log('✅ Juego obtenido de RAWG');
      return juegoRAWG;
    }
  } catch (error) {
    console.warn('⚠️ RAWG API no disponible');
  }
  
  // 3. Como último recurso, buscar en datos locales
  console.log('💾 Buscando en datos locales');
  return juegosLocales.find(juego => juego.id === parseInt(id));
};

// ✅ MEJORADO: Obtener juegos por categoría con fallback (ahora usa backend primero)
export const obtenerJuegosPorCategoria = async (categoria) => {
  if (categoria === 'all') {
    return obtenerJuegosCombinados();
  }
  
  console.log(`🎮 Obteniendo juegos de categoría: ${categoria}`);
  
  // 1. Intentar desde el BACKEND primero
  try {
    const juegosBackend = await obtenerJuegosPorCategoriaBackend(categoria);
    if (juegosBackend && juegosBackend.length > 0) {
      console.log('✅ Juegos de categoría obtenidos del backend');
      return juegosBackend;
    }
  } catch (error) {
    console.warn('⚠️ Backend no disponible');
  }
  
  // 2. Si falla, intentar desde RAWG
  try {
    const juegosRAWG = await obtenerJuegosPorCategoriaRAWG(categoria);
    if (juegosRAWG && juegosRAWG.length > 0) {
      console.log('✅ Juegos de categoría obtenidos de RAWG');
      return juegosRAWG;
    }
  } catch (error) {
    console.warn('⚠️ RAWG API no disponible');
  }
  
  // 3. Como fallback, filtrar datos locales
  console.log('💾 Filtrando datos locales por categoría');
  return juegosLocales.filter(juego => 
    juego.generos.some(g => g.toLowerCase().includes(categoria.toLowerCase()))
  );
};

// =================== OBJETO DEFAULT PARA IMPORTACIONES ===================

const gameService = {
  // Funciones originales (backend) - ACTUALIZADAS CON TRANSFORMACIÓN
  obtenerJuegos,
  obtenerJuego,
  buscarJuegos,
  obtenerJuegosPorCategoriaBackend,
  obtenerJuegosMasVistos,
  obtenerJuegosMejorRankeados,
  
  // Funciones RAWG
  obtenerJuegosRAWG,
  obtenerJuegoRAWG,
  buscarJuegosRAWG,
  obtenerScreenshots,
  obtenerJuegosPorCategoriaRAWG,
  
  // Funciones combinadas con fallback (RECOMENDADAS)
  getAllGames: obtenerJuegosCombinados,
  searchGames: buscarEnTodasLasFuentes,
  getGameById: obtenerJuegoPorId,
  getGamesByCategory: obtenerJuegosPorCategoria,
  
  // Funciones nuevas
  getMostViewed: obtenerJuegosMasVistos,
  getTopRated: obtenerJuegosMejorRankeados,
};

export default gameService;
