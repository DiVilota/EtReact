import { createContext, useState, useContext, useEffect } from 'react';
import { 
  obtenerUsuarioActual, 
  guardarUsuarioActual, 
  limpiarUsuarioActual 
} from '../services/userService';

// Crear el contexto
const UserContext = createContext();

// Hook personalizado para usar el contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
};

// Provider del contexto
export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario al iniciar la aplicación
  useEffect(() => {
    const usuarioGuardado = obtenerUsuarioActual();
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    }
    setLoading(false);
  }, []);

  // Función para hacer login
  const login = (usuarioData) => {
    setUsuario(usuarioData);
    guardarUsuarioActual(usuarioData);
  };

  // Función para hacer logout
  const logout = () => {
    setUsuario(null);
    limpiarUsuarioActual();
  };

  // Función para actualizar datos del usuario
  const actualizarUsuario = (nuevosDatos) => {
    const usuarioActualizado = { ...usuario, ...nuevosDatos };
    setUsuario(usuarioActualizado);
    guardarUsuarioActual(usuarioActualizado);
  };

  // Verificar si hay sesión activa
  const isAuthenticated = () => {
    return usuario !== null;
  };

  const value = {
    usuario,
    loading,
    login,
    logout,
    actualizarUsuario,
    isAuthenticated
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;