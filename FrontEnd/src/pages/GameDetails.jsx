import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from '../components/common/StarRating';
import Loading from '../components/common/Loading';
import ReviewList from '../components/review/ReviewList';
import gameService from '../services/gameService';
import useReviews from '../hooks/useReviews';
import { useCart } from '../context/CartContext';

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { reviews, isLoading: reviewsLoading, addReview, deleteReview } = useReviews(id);
  
  useEffect(() => {
    loadGameDetails();
  }, [id]);
  
  const loadGameDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Obtener detalles del juego
      const gameData = await gameService.getGameById(id);
      
      if (!gameData) {
        setError('Juego no encontrado');
        return;
      }
      
      setGame(gameData);
      
      // Intentar obtener screenshots si está disponible
      try {
        const screenshotsData = await gameService.obtenerScreenshots(id);
        setScreenshots(screenshotsData);
      } catch (err) {
        console.warn('No se pudieron cargar screenshots');
      }
      
    } catch (err) {
      setError(err.message || 'Error al cargar el juego');
      console.error('Error loading game details:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Función para formatear precio
  const formatPrice = (price) => {
    if (!price || price === 0) return 'Gratis';
    return `$${price.toLocaleString('es-CL')}`;
  };
  
  // Función para obtener color de plataforma
  const getPlatformColor = (platform) => {
    const colors = {
      'PC': 'bg-blue-500',
      'PlayStation': 'bg-indigo-500',
      'Xbox': 'bg-green-500',
      'Nintendo': 'bg-red-500',
      'Mobile': 'bg-purple-500'
    };
    
    for (const [key, color] of Object.entries(colors)) {
      if (platform.includes(key)) return color;
    }
    return 'bg-gray-500';
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading message="Cargando detalles del juego..." />
      </div>
    );
  }
  
  // Error state
  if (error || !game) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-2xl text-neon-pink font-bold mb-4">
            {error || 'Juego no encontrado'}
          </h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-purple-primary hover:bg-neon-pink transition-colors rounded-lg font-bold"
          >
            ← Volver al catálogo
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      {/* Hero Section con imagen de fondo */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: game.imagen ? `url(${game.imagen})` : 'none',
          backgroundColor: game.imagen ? 'transparent' : '#1a1a2e'
        }}
      >
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        
        {/* Contenido del hero */}
        <div className="relative container mx-auto h-full flex items-end p-8">
          <div>
            <button
              onClick={() => navigate('/')}
              className="mb-4 text-neon-cyan hover:text-neon-pink transition-colors flex items-center gap-2"
            >
              ← Volver al catálogo
            </button>
            
            <h1 className="text-4xl md:text-6xl font-bold text-neon-pink neon-glow mb-4 font-orbitron">
              {game.titulo}
            </h1>
            
            <div className="flex items-center gap-4 flex-wrap">
              <StarRating 
                rating={game.valoracion_promedio || 0} 
                readonly 
                size="lg" 
              />
              
              {game.fecha_lanzamiento && (
                <span className="text-neon-cyan font-mono">
                  📅 {game.fecha_lanzamiento}
                </span>
              )}
              
              {game.desarrollador && (
                <span className="text-gray-400 font-mono">
                  🎮 {game.desarrollador}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal - Descripción */}
          <div className="lg:col-span-2">
            {/* Precio destacado */}
            <div className="mb-6 p-6 bg-bg-card border-2 border-purple-primary rounded-xl">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Precio</p>
                  <p className="text-4xl font-bold text-neon-pink font-orbitron">
                    {formatPrice(game.precio)}
                  </p>
                </div>
                {isInCart(game.id) ? (
                  <button 
                    disabled
                    className="px-8 py-3 bg-gray-600 text-gray-400 rounded-lg font-bold text-lg cursor-not-allowed"
                  >
                    ✓ En el Carrito
                  </button>
                ) : (
                  <button 
                    onClick={() => addToCart(game)}
                    className="px-8 py-3 bg-purple-primary hover:bg-neon-pink transition-colors rounded-lg font-bold text-lg"
                  >
                    🛒 Agregar al Carrito
                  </button>
                )}
              </div>
            </div>
            
            {/* Descripción */}
            <div className="mb-8 p-6 bg-bg-card border-2 border-purple-primary rounded-xl">
              <h2 className="text-2xl font-bold text-neon-cyan mb-4 font-orbitron">
                Descripción
              </h2>
              <p className="text-gray-300 leading-relaxed font-mono">
                {game.descripcion || 'Sin descripción disponible'}
              </p>
            </div>
            
            {/* Screenshots */}
            {screenshots && screenshots.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-neon-cyan mb-4 font-orbitron">
                  Capturas de pantalla
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {screenshots.slice(0, 4).map((screenshot, index) => (
                    <div 
                      key={index}
                      className="aspect-video bg-bg-card rounded-lg overflow-hidden border-2 border-purple-primary hover:border-neon-pink transition-all"
                    >
                      <img 
                        src={screenshot.image} 
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Reseñas */}
            <div className="p-6 bg-bg-card border-2 border-purple-primary rounded-xl">
              <ReviewList
                reviews={reviews}
                isLoading={reviewsLoading}
                onAddReview={addReview}
                onDeleteReview={deleteReview}
              />
            </div>
          </div>
          
          {/* Sidebar - Información adicional */}
          <div>
            {/* Plataformas */}
            {game.plataformas && game.plataformas.length > 0 && (
              <div className="mb-6 p-6 bg-bg-card border-2 border-purple-primary rounded-xl">
                <h3 className="text-xl font-bold text-neon-pink mb-4 font-orbitron">
                  Plataformas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {game.plataformas.map((plataforma, index) => (
                    <span 
                      key={index}
                      className={`
                        ${getPlatformColor(plataforma)}
                        text-white 
                        px-3 
                        py-2 
                        rounded-lg
                        font-mono
                        text-sm
                      `}
                    >
                      {plataforma}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Géneros */}
            {game.generos && game.generos.length > 0 && (
              <div className="mb-6 p-6 bg-bg-card border-2 border-purple-primary rounded-xl">
                <h3 className="text-xl font-bold text-neon-pink mb-4 font-orbitron">
                  Géneros
                </h3>
                <div className="flex flex-wrap gap-2">
                  {game.generos.map((genero, index) => (
                    <span 
                      key={index}
                      className="
                        border-2 border-neon-cyan
                        text-neon-cyan 
                        px-3 
                        py-2 
                        rounded-lg
                        font-mono
                        text-sm
                        hover:bg-neon-cyan
                        hover:text-bg-dark
                        transition-colors
                        cursor-pointer
                      "
                    >
                      {genero}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Estadísticas */}
            <div className="p-6 bg-bg-card border-2 border-purple-primary rounded-xl">
              <h3 className="text-xl font-bold text-neon-pink mb-4 font-orbitron">
                Estadísticas
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Valoración</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-neon-cyan">
                      {(game.valoracion_promedio || 0).toFixed(1)}
                    </span>
                    <span className="text-gray-500">/5.0</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm mb-1">Reseñas</p>
                  <p className="text-2xl font-bold text-neon-cyan">
                    {game.total_resenas || 0}
                  </p>
                </div>
                
                {game.fecha_lanzamiento && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Lanzamiento</p>
                    <p className="text-lg font-bold text-neon-cyan font-mono">
                      {game.fecha_lanzamiento}
                    </p>
                  </div>
                )}
                
                {game.desarrollador && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Desarrollador</p>
                    <p className="text-lg font-bold text-neon-cyan font-mono">
                      {game.desarrollador}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
