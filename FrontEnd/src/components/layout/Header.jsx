import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import CartIcon  from '../cart/CartIcon';

const Header = () => {
  const { usuario, logout } = useUser();

  return (
    <header className="bg-bg-dark p-4 flex justify-between items-center border-b border-purple-primary sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/assets/logo/ManabiGames Logo.png" 
            alt="Logo ManabiGames" 
            className="h-12"
            onError={(e) => {
              e.target.style.display = 'none';
              console.warn('Logo no encontrado');
            }}
          />
          <h1 className="text-3xl neon font-orbitron">ManabiGames</h1>
        </Link>
      </div>
      
      <nav className="flex items-center space-x-6">
        {/* Enlaces principales */}
        <div className="space-x-6 text-neon-cyan">
          <Link to="/" className="hover:underline transition-colors hover:text-neon-pink">
            Inicio
          </Link>
          <Link to="/contacto" className="hover:underline transition-colors hover:text-neon-pink">
            Contacto
          </Link>
        </div>

       
        
        {/* Botón Dashboard */}
        <CartIcon />

        <Link 
          to="/dashboard" 
          className="dashboard-btn text-white px-4 py-2 rounded-lg font-bold text-sm"
        >
          📊 Dashboard
        </Link>

        {/* Usuario / Registro */}
        {usuario ? (
          <div className="flex items-center gap-3">
            <span className="text-neon-cyan text-sm">
              👤 {usuario.nombre || usuario.usuario}
            </span>
            <button
              onClick={logout}
              className="text-red-400 hover:text-red-300 text-sm transition-colors"
            >
              Salir
            </button>
          </div>
        ) : (
          <Link 
            to="/registro" 
            className="text-neon-cyan hover:text-neon-pink transition-colors text-sm"
          >
            Registrarse
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;