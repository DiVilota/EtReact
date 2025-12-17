import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Cargar usuario desde localStorage
    const savedUser = localStorage.getItem('manabigames_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('manabigames_user', JSON.stringify(userData));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('manabigames_user');
  };
  
  const isAdmin = () => {
    return user?.rol === 'admin' || user?.rol === 'ADMIN';
  };
  
  const value = {
    user,
    isLoading,
    login,
    logout,
    isAdmin,
    isAuthenticated: !!user
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
