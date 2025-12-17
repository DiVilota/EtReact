import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/common/Loading';
import StatCard from '../components/dashboard/StatCard';
import BarChart from '../components/dashboard/BarChart';
import GamesTable from '../components/dashboard/GamesTable';
import ReviewsTable from '../components/dashboard/ReviewsTable';
import UsersTable from '../components/dashboard/UsersTable';
import estadisticasService from '../services/estadisticasService';
import gameService from '../services/gameService';
import authService from '../services/authService';

const Dashboard = () => {
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('estadisticas');
  const [stats, setStats] = useState(null);
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!isAdmin()) {
      navigate('/login');
      return;
    }
    loadData();
  }, []);
  
  const loadData = async () => {
    try {
      setIsLoading(true);
      const [statsData, gamesData, usersData] = await Promise.all([
        estadisticasService.getEstadisticasGenerales(),
        gameService.getAllGames(),
        authService.getAllUsers()
      ]);
      
      setStats(statsData);
      setGames(gamesData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteGame = (id) => {
    if (confirm('¿Seguro que quieres eliminar este juego?')) {
      setGames(prev => prev.filter(g => g.id !== id));
      alert('Juego eliminado (funcionalidad completa en desarrollo)');
    }
  };
  
  const handleDeleteReview = (id) => {
    if (confirm('¿Seguro que quieres eliminar esta reseña?')) {
      alert('Reseña eliminada (funcionalidad completa en desarrollo)');
    }
  };
  
  const tabs = [
    { id: 'estadisticas', name: '📊 Estadísticas', icon: '📊' },
    { id: 'juegos', name: '🎮 Juegos', icon: '🎮' },
    { id: 'resenas', name: '⭐ Reseñas', icon: '⭐' },
    { id: 'usuarios', name: '👥 Usuarios', icon: '👥' }
  ];
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading message="Cargando dashboard..." />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neon-pink neon-glow mb-2 font-orbitron">
            Dashboard Admin
          </h1>
          <p className="text-gray-400 font-mono">
            Bienvenido, {user?.nombre || 'Administrador'}
          </p>
        </div>
        
        {/* Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-6 py-3 rounded-lg font-bold whitespace-nowrap transition-all
                ${activeTab === tab.id
                  ? 'bg-purple-primary text-white border-2 border-neon-pink'
                  : 'bg-bg-card text-gray-400 border-2 border-purple-primary hover:border-neon-cyan'
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </div>
        
        {/* Contenido según tab activo */}
        {activeTab === 'estadisticas' && stats && (
          <div>
            {/* Grid de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Juegos"
                value={stats.total_juegos}
                icon="🎮"
                trend={8}
              />
              <StatCard
                title="Total Usuarios"
                value={stats.total_usuarios}
                icon="👥"
                trend={12}
              />
              <StatCard
                title="Total Reseñas"
                value={stats.total_resenas}
                icon="⭐"
                trend={-3}
              />
              <StatCard
                title="Usuarios Activos"
                value={stats.usuarios_activos}
                icon="🔥"
                trend={5}
              />
            </div>
            
            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <BarChart
                title="🏆 Juegos Más Populares"
                data={stats.juegos_populares?.map(j => ({
                  label: j.titulo,
                  value: j.ventas || 0
                })) || []}
              />
              
              <div className="p-6 bg-bg-card border-2 border-purple-primary rounded-xl">
                <h3 className="text-xl font-bold text-neon-cyan mb-6 font-orbitron">
                  💰 Ventas del Mes
                </h3>
                <div className="text-center">
                  <p className="text-5xl font-bold text-neon-pink mb-2 font-orbitron">
                    ${(stats.ventas_mes || 0).toLocaleString('es-CL')}
                  </p>
                  <p className="text-gray-400">CLP</p>
                </div>
              </div>
            </div>
            
            {/* Reseñas recientes */}
            <div className="p-6 bg-bg-card border-2 border-purple-primary rounded-xl">
              <h3 className="text-xl font-bold text-neon-cyan mb-4 font-orbitron">
                📝 Reseñas Recientes
              </h3>
              <ReviewsTable
                reviews={stats.resenas_recientes || []}
                onDelete={handleDeleteReview}
              />
            </div>
          </div>
        )}
        
        {activeTab === 'juegos' && (
          <div className="p-6 bg-bg-card border-2 border-purple-primary rounded-xl">
            <h2 className="text-2xl font-bold text-neon-cyan mb-6 font-orbitron">
              Gestión de Juegos
            </h2>
            <GamesTable
              games={games}
              onDelete={handleDeleteGame}
            />
          </div>
        )}
        
        {activeTab === 'resenas' && stats && (
          <div className="p-6 bg-bg-card border-2 border-purple-primary rounded-xl">
            <h2 className="text-2xl font-bold text-neon-cyan mb-6 font-orbitron">
              Gestión de Reseñas
            </h2>
            <ReviewsTable
              reviews={stats.resenas_recientes || []}
              onDelete={handleDeleteReview}
              onApprove={(id) => alert('Reseña aprobada')}
            />
          </div>
        )}
        
        {activeTab === 'usuarios' && (
          <div className="p-6 bg-bg-card border-2 border-purple-primary rounded-xl">
            <h2 className="text-2xl font-bold text-neon-cyan mb-6 font-orbitron">
              Gestión de Usuarios
            </h2>
            <UsersTable users={users} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
