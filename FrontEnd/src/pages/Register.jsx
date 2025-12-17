import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    usuario: '',
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.usuario.trim()) {
      newErrors.usuario = 'El usuario es requerido';
    } else if (formData.usuario.length < 3) {
      newErrors.usuario = 'El usuario debe tener al menos 3 caracteres';
    }
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      const userData = await authService.register(registerData);
      
      // Auto-login después de registro
      login(userData);
      navigate('/');
    } catch (err) {
      setErrors({ submit: err.message || 'Error al registrar usuario' });
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
          <p className="text-neon-cyan text-lg">Crear Cuenta</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Usuario */}
          <div>
            <label className="block text-neon-cyan font-bold mb-2 text-sm">
              Usuario
            </label>
            <input
              type="text"
              value={formData.usuario}
              onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
              className="w-full px-4 py-2 bg-bg-dark border-2 border-purple-primary rounded-lg text-white font-mono focus:border-neon-pink outline-none"
              placeholder="usuario123"
            />
            {errors.usuario && (
              <p className="text-red-500 text-xs mt-1">{errors.usuario}</p>
            )}
          </div>
          
          {/* Nombre */}
          <div>
            <label className="block text-neon-cyan font-bold mb-2 text-sm">
              Nombre Completo
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full px-4 py-2 bg-bg-dark border-2 border-purple-primary rounded-lg text-white font-mono focus:border-neon-pink outline-none"
              placeholder="Juan Pérez"
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
            )}
          </div>
          
          {/* Email */}
          <div>
            <label className="block text-neon-cyan font-bold mb-2 text-sm">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-bg-dark border-2 border-purple-primary rounded-lg text-white font-mono focus:border-neon-pink outline-none"
              placeholder="correo@ejemplo.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          
          {/* Password */}
          <div>
            <label className="block text-neon-cyan font-bold mb-2 text-sm">
              Contraseña
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 bg-bg-dark border-2 border-purple-primary rounded-lg text-white font-mono focus:border-neon-pink outline-none"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          
          {/* Confirmar Password */}
          <div>
            <label className="block text-neon-cyan font-bold mb-2 text-sm">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-2 bg-bg-dark border-2 border-purple-primary rounded-lg text-white font-mono focus:border-neon-pink outline-none"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>
          
          {/* Error general */}
          {errors.submit && (
            <div className="p-4 bg-red-900/20 border-2 border-red-500 rounded-lg">
              <p className="text-red-400 text-sm">{errors.submit}</p>
            </div>
          )}
          
          {/* Botón */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-purple-primary hover:bg-neon-pink transition-colors rounded-lg font-bold disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
          
          {/* Link a login */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-neon-cyan hover:text-neon-pink transition-colors">
                Inicia sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;