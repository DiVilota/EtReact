import api from './api';

const authService = {
  // Registro (crear usuario en BD)
  register: async (userData) => {
    try {
      const response = await api.post('/usuarios', {
        username: userData.usuario,
        email: userData.email
      });
      
      // Guardar con rol user por defecto
      const user = {
        id: response.data.id,
        usuario: response.data.username,
        nombre: userData.nombre,
        email: response.data.email,
        rol: 'user'
      };
      
      return user;
    } catch (error) {
      console.error('Error en registro:', error);
      throw new Error(error.response?.data?.message || 'Error al registrar usuario');
    }
  },
  
  // Login (verificar usuario existe en BD)
  login: async (credentials) => {
    try {
      // Intentar obtener todos los usuarios de la BD
      const response = await api.get('/usuarios');
      const users = response.data;
      
      // Buscar usuario por username
      const user = users.find(u => u.username === credentials.usuario);
      
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      
      // Verificar password (mock hasta implementar en backend)
      if (credentials.usuario === 'admin' && credentials.password === 'admin123') {
        return {
          id: user.id,
          usuario: user.username,
          nombre: user.username,
          email: user.email,
          rol: 'admin'
        };
      }
      
      if (credentials.password === 'user123' || credentials.password === '123456') {
        return {
          id: user.id,
          usuario: user.username,
          nombre: user.username,
          email: user.email,
          rol: 'user'
        };
      }
      
      throw new Error('Contraseña incorrecta');
    } catch (error) {
      console.error('Error en login:', error);
      
      // Fallback a usuarios mock si falla la BD
      const mockUsers = [
        { id: 1, usuario: 'admin', password: 'admin123', nombre: 'Administrador', email: 'admin@manabigames.com', rol: 'admin' },
        { id: 2, usuario: 'user', password: 'user123', nombre: 'Usuario Normal', email: 'user@manabigames.com', rol: 'user' }
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
  
  // Obtener todos los usuarios de la BD (solo admin)
  getAllUsers: async () => {
    try {
      const response = await api.get('/usuarios');
      return response.data.map(user => ({
        id: user.id,
        usuario: user.username,
        nombre: user.username,
        email: user.email,
        rol: user.username === 'admin' ? 'admin' : 'user',
        activo: user.estaOnline,
        fecha_registro: user.fechaRegistro,
        total_resenas: user.totalResenas
      }));
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }
};

export default authService;
