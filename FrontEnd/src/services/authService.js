import api from './api';

const authService = {
  // Login
  login: async (credentials) => {
    try {
      const response = await api.post('/usuarios/login', credentials);
      return response.data;
    } catch (error) {
      // Usuarios mock para desarrollo
      const mockUsers = [
        { id: 1, usuario: 'admin', password: 'admin123', nombre: 'Administrador', rol: 'admin' },
        { id: 2, usuario: 'user', password: 'user123', nombre: 'Usuario Normal', rol: 'user' }
      ];
      
      const user = mockUsers.find(
        u => u.usuario === credentials.usuario && u.password === credentials.password
      );
      
      if (user) {
        const { password, ...userData } = user;
        return userData;
      }
      
      throw new Error('Credenciales inválidas');
    }
  },
  
  // Registro
  register: async (userData) => {
    try {
      const response = await api.post('/usuarios', userData);
      return response.data;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  },
  
  // Obtener todos los usuarios (solo admin)
  getAllUsers: async () => {
    try {
      const response = await api.get('/usuarios');
      return response.data;
    } catch (error) {
      // Usuarios mock
      return [
        { id: 1, usuario: 'admin', nombre: 'Administrador', email: 'admin@manabigames.com', rol: 'admin', activo: true },
        { id: 2, usuario: 'user1', nombre: 'Juan Pérez', email: 'juan@email.com', rol: 'user', activo: true },
        { id: 3, usuario: 'user2', nombre: 'María López', email: 'maria@email.com', rol: 'user', activo: true },
        { id: 4, usuario: 'user3', nombre: 'Pedro González', email: 'pedro@email.com', rol: 'user', activo: false }
      ];
    }
  }
};

export default authService;
