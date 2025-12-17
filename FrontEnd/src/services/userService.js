import { get, post } from './api';
import { API_CONFIG } from '../utils/constants';

// =================== USUARIOS ===================

// Crear un nuevo usuario
export const crearUsuario = async (datosUsuario) => {
  try {
    const data = await post(API_CONFIG.endpoints.usuarios, datosUsuario);
    console.log('Usuario creado exitosamente:', data);
    return data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  try {
    return await get(API_CONFIG.endpoints.usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};

// Obtener un usuario específico
export const obtenerUsuario = async (id) => {
  try {
    return await get(`${API_CONFIG.endpoints.usuarios}/${id}`);
  } catch (error) {
    console.error(`Error al obtener usuario ${id}:`, error);
    throw error;
  }
};

// Buscar usuario por email
export const buscarUsuarioPorEmail = async (email) => {
  try {
    const usuarios = await obtenerUsuarios();
    return usuarios.find(u => u.email === email || u.correo === email) || null;
  } catch (error) {
    console.error('Error al buscar usuario por email:', error);
    return null;
  }
};

// Buscar usuario por nombre
export const buscarUsuarioPorNombre = async (nombre) => {
  try {
    const usuarios = await obtenerUsuarios();
    return usuarios.find(u => u.username === nombre || u.usuario === nombre) || null;
  } catch (error) {
    console.error('Error al buscar usuario por nombre:', error);
    return null;
  }
};

// =================== AUTENTICACIÓN LOCAL ===================

const STORAGE_KEY = 'usuarioActual';

// Obtener usuario actual del localStorage
export const obtenerUsuarioActual = () => {
  try {
    const usuario = localStorage.getItem(STORAGE_KEY);
    return usuario ? JSON.parse(usuario) : null;
  } catch (error) {
    console.error('Error al obtener usuario actual:', error);
    return null;
  }
};

// Guardar usuario actual en localStorage
export const guardarUsuarioActual = (usuario) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
    return true;
  } catch (error) {
    console.error('Error al guardar usuario actual:', error);
    return false;
  }
};

// Limpiar usuario actual (logout)
export const limpiarUsuarioActual = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error al limpiar usuario actual:', error);
    return false;
  }
};

// Verificar si hay sesión activa
export const haySesionActiva = () => {
  return obtenerUsuarioActual() !== null;
};

// =================== REGISTRO CON VALIDACIÓN ===================

// Validar datos de registro
export const validarDatosRegistro = (datos) => {
  const errores = {};
  
  if (!datos.usuario || datos.usuario.trim().length < 3) {
    errores.usuario = 'El usuario debe tener al menos 3 caracteres';
  }
  
  if (!datos.correo || !datos.correo.includes('@')) {
    errores.correo = 'Email inválido';
  }
  
  if (!datos.clave || datos.clave.length < 6) {
    errores.clave = 'La contraseña debe tener al menos 6 caracteres';
  }
  
  return errores;
};

// Registrar usuario con validación
export const registrarUsuario = async (datos) => {
  try {
    // Validar datos
    const errores = validarDatosRegistro(datos);
    if (Object.keys(errores).length > 0) {
      throw new Error(Object.values(errores).join(', '));
    }
    
    // Verificar si el usuario ya existe
    const usuarioExistente = await buscarUsuarioPorEmail(datos.correo);
    if (usuarioExistente) {
      throw new Error('Este correo ya está registrado');
    }
    
    // Crear usuario
    const nuevoUsuario = await crearUsuario({
      nombre: datos.usuario,
      correo: datos.correo,
      pass: datos.clave
    });
    
    // Guardar sesión
    guardarUsuarioActual(nuevoUsuario);
    
    return {
      exito: true,
      mensaje: 'Usuario registrado exitosamente',
      usuario: nuevoUsuario
    };
    
  } catch (error) {
    console.error('Error en registro:', error);
    return {
      exito: false,
      mensaje: error.message || 'Error al registrar usuario',
      usuario: null
    };
  }
};

// Login simple (simulado)
export const loginUsuario = async (email, password) => {
  try {
    const usuario = await buscarUsuarioPorEmail(email);
    
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    
    // Aquí deberías validar la contraseña con el backend
    // Por ahora, solo guardamos la sesión
    guardarUsuarioActual(usuario);
    
    return {
      exito: true,
      mensaje: 'Login exitoso',
      usuario
    };
    
  } catch (error) {
    return {
      exito: false,
      mensaje: error.message || 'Error al iniciar sesión',
      usuario: null
    };
  }
};

// Logout
export const logoutUsuario = () => {
  limpiarUsuarioActual();
  return true;
};