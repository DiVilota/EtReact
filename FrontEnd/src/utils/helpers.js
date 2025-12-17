// Validación de email
export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Formatear fecha
export const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Renderizar estrellas para rating
export const renderizarEstrellas = (rating, total = 5) => {
  let estrellas = '';
  for (let i = 1; i <= total; i++) {
    estrellas += i <= rating ? '★' : '☆';
  }
  return estrellas;
};

// Generar array de estrellas para componentes
export const generarArrayEstrellas = (rating, total = 5) => {
  return Array.from({ length: total }, (_, i) => ({
    filled: i < rating,
    value: i + 1
  }));
};

// Truncar texto
export const truncarTexto = (texto, longitudMaxima = 100) => {
  if (!texto) return '';
  if (texto.length <= longitudMaxima) return texto;
  return texto.substring(0, longitudMaxima) + '...';
};

// Capitalizar primera letra
export const capitalizar = (texto) => {
  if (!texto) return '';
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

// Validar datos de reseña
export const validarDatosResena = (datos) => {
  const errores = [];
  
  if (!datos.rating || datos.rating < 1 || datos.rating > 5) {
    errores.push('La calificación debe estar entre 1 y 5 estrellas');
  }
  
  if (!datos.usuarioId) {
    errores.push('Usuario no identificado');
  }
  
  if (!datos.juegoId) {
    errores.push('Juego no identificado');
  }
  
  if (datos.comentario && datos.comentario.length > 1000) {
    errores.push('El comentario no puede exceder 1000 caracteres');
  }
  
  return errores;
};

// Formatear número con separador de miles
export const formatearNumero = (numero) => {
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Obtener parámetro de URL
export const obtenerParametroURL = (nombre) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(nombre);
};

// Debounce para búsquedas
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Validar usuario actual en localStorage
export const obtenerUsuarioActual = () => {
  try {
    const usuario = localStorage.getItem('usuarioActual');
    return usuario ? JSON.parse(usuario) : null;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return null;
  }
};

export const guardarUsuarioActual = (usuario) => {
  try {
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    return true;
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    return false;
  }
};

export const limpiarUsuarioActual = () => {
  try {
    localStorage.removeItem('usuarioActual');
    return true;
  } catch (error) {
    console.error('Error al limpiar usuario:', error);
    return false;
  }
};

// Generar ID único temporal
export const generarIdTemporal = () => {
  return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Obtener color según rating
export const obtenerColorRating = (rating) => {
  if (rating >= 4.5) return 'text-green-500';
  if (rating >= 3.5) return 'text-yellow-500';
  if (rating >= 2.5) return 'text-orange-500';
  return 'text-red-500';
};

// Parsear consolas de RAWG API
export const parsearConsolas = (platforms) => {
  if (!platforms || !Array.isArray(platforms)) return 'No especificado';
  return platforms.map(p => p.platform.name).join(', ');
};

// Validar formulario genérico
export const validarFormulario = (campos) => {
  const errores = {};
  
  Object.entries(campos).forEach(([nombre, config]) => {
    const { valor, requerido, minLength, maxLength, tipo } = config;
    
    if (requerido && !valor) {
      errores[nombre] = 'Este campo es requerido';
      return;
    }
    
    if (minLength && valor.length < minLength) {
      errores[nombre] = `Mínimo ${minLength} caracteres`;
      return;
    }
    
    if (maxLength && valor.length > maxLength) {
      errores[nombre] = `Máximo ${maxLength} caracteres`;
      return;
    }
    
    if (tipo === 'email' && !validarEmail(valor)) {
      errores[nombre] = 'Email inválido';
      return;
    }
  });
  
  return errores;
};