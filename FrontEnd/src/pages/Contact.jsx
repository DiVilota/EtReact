import { useState } from 'react';
import api from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.asunto.trim()) {
      newErrors.asunto = 'El asunto es requerido';
    }
    
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    } else if (formData.mensaje.length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      // Enviar a backend (combinar asunto con mensaje)
      await api.post('/contacto', {
        nombre: formData.nombre,
        email: formData.email,
        mensaje: `Asunto: ${formData.asunto}\n\n${formData.mensaje}`
      });
      
      setSuccess(true);
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Error al enviar mensaje. Intenta nuevamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neon-pink neon-glow mb-4 font-orbitron">
            Contáctanos
          </h1>
          <p className="text-gray-400 font-mono">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte
          </p>
        </div>
        
        <div className="bg-bg-card p-8 rounded-xl border-2 border-purple-primary">
          {success && (
            <div className="mb-6 p-4 bg-green-900/20 border-2 border-green-500 rounded-lg">
              <p className="text-green-400 text-center">
                ✓ Mensaje enviado exitosamente. Te contactaremos pronto.
              </p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-neon-cyan font-bold mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full px-4 py-3 bg-bg-dark border-2 border-purple-primary rounded-lg text-white font-mono focus:border-neon-pink outline-none"
                placeholder="Juan Pérez"
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
              )}
            </div>
            
            {/* Email */}
            <div>
              <label className="block text-neon-cyan font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-bg-dark border-2 border-purple-primary rounded-lg text-white font-mono focus:border-neon-pink outline-none"
                placeholder="correo@ejemplo.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            
            {/* Asunto */}
            <div>
              <label className="block text-neon-cyan font-bold mb-2">
                Asunto
              </label>
              <input
                type="text"
                value={formData.asunto}
                onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                className="w-full px-4 py-3 bg-bg-dark border-2 border-purple-primary rounded-lg text-white font-mono focus:border-neon-pink outline-none"
                placeholder="¿En qué podemos ayudarte?"
              />
              {errors.asunto && (
                <p className="text-red-500 text-sm mt-1">{errors.asunto}</p>
              )}
            </div>
            
            {/* Mensaje */}
            <div>
              <label className="block text-neon-cyan font-bold mb-2">
                Mensaje
              </label>
              <textarea
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                rows="6"
                className="w-full px-4 py-3 bg-bg-dark border-2 border-purple-primary rounded-lg text-white font-mono focus:border-neon-pink outline-none resize-none"
                placeholder="Escribe tu mensaje aquí..."
              />
              <div className="flex justify-between mt-1">
                {errors.mensaje ? (
                  <p className="text-red-500 text-sm">{errors.mensaje}</p>
                ) : (
                  <p className="text-gray-500 text-sm">Mínimo 10 caracteres</p>
                )}
                <p className="text-gray-500 text-sm">{formData.mensaje.length}</p>
              </div>
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
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </div>
        
        {/* Info adicional */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-bg-card border border-purple-primary rounded-lg">
            <div className="text-3xl mb-2">📧</div>
            <p className="text-neon-cyan font-bold">Email</p>
            <p className="text-gray-400 text-sm">contacto@manabigames.com</p>
          </div>
          
          <div className="text-center p-4 bg-bg-card border border-purple-primary rounded-lg">
            <div className="text-3xl mb-2">💬</div>
            <p className="text-neon-cyan font-bold">Discord</p>
            <p className="text-gray-400 text-sm">@ManabiGames</p>
          </div>
          
          <div className="text-center p-4 bg-bg-card border border-purple-primary rounded-lg">
            <div className="text-3xl mb-2">🐦</div>
            <p className="text-neon-cyan font-bold">Twitter</p>
            <p className="text-gray-400 text-sm">@ManabiGames</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
