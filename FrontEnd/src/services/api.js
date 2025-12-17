import axios from 'axios';
import { API_CONFIG } from '../utils/constants';

// Crear instancia de Axios con configuración base
const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para requests 
api.interceptors.request.use(
  (config) => {
    
    console.log(`🚀 Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response || error);
    
    // Manejo de errores comunes
    if (error.response) {
      // El servidor respondió con un código de error
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          console.error('Bad Request:', data);
          break;
        case 401:
          console.error('No autorizado - Redirigir a login');
          // Aquí podrías redirigir al login
          break;
        case 404:
          console.error('Recurso no encontrado:', data);
          break;
        case 500:
          console.error('Error del servidor:', data);
          break;
        default:
          console.error('Error desconocido:', data);
      }
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta
      console.error('Sin respuesta del servidor:', error.request);
    } else {
      // Algo pasó al configurar la petición
      console.error('Error en la configuración:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Función helper para peticiones GET
export const get = async (endpoint, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función helper para peticiones POST
export const post = async (endpoint, data = {}) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función helper para peticiones PUT
export const put = async (endpoint, data = {}) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función helper para peticiones DELETE
export const del = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;