import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const userData = await authService.login(formData);

      // Login normal (AuthContext)
      login(userData);

      // ✅ Importante: sincronizar sesión para el sistema que usa userService/ReviewService
      localStorage.setItem('usuarioActual', JSON.stringify(userData));

      if (userData.rol === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-bg-card p-8 rounded-2xl w-full max-w-md border-2 border-purple-primary">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-neon-pink neon-glow mb-2 font-orbitron">
            ManabiGames
          </h2>
          <p className="text-neon-cyan text-lg">Iniciar Sesión</p>
        </div>

        {/* Usuarios de prueba */}
        <div className="mb-6 p-4 bg-bg-dark border border-neon-cyan rounded-lg">
          <p className="text-sm text-neon-cyan mb-2 font-bold">👤 Usuarios de prueba:</p>
          <div className="text-xs text-gray-400 space-y-1 font-mono">
            <p>
              Admin: <span className="text-white">usuario: admin</span> /{' '}
              <span className="text-white">password: admin123</span>
            </p>
            <p>
              User: <span className="text-white">usuario: user</span> /{' '}
              <span className="text-white">password: user123</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Usuario */}
          <div>
            <label className="block text-neon-cyan font-bold mb-2">Usuario</label>
            <input
              type="text"
              value={formData.usuario}
              onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
              className="w-full px-4 py-3 bg-bg-dark border-2 border-purple-primary rounded-lg text-white font-mono focus:border-neon-pink outline-none"
              placeholder="admin"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-neon-cyan font-bold mb-2">Contraseña</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-bg-dark border-2 border-purple-primary rounded-lg text-white font-mono focus:border-neon-pink outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-900/20 border-2 border-red-500 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-purple-primary hover:bg-neon-pink transition-colors rounded-lg font-bold disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>

          {/* Link a registro */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              ¿No tienes cuenta?{' '}
              <Link to="/registro" className="text-neon-cyan hover:text-neon-pink transition-colors">
                Regístrate
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
