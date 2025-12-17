import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('manabigames_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);
  
  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem('manabigames_cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Agregar al carrito
  const addToCart = (game) => {
    setCartItems(prevItems => {
      // Verificar si ya está en el carrito
      const exists = prevItems.find(item => item.id === game.id);
      if (exists) {
        return prevItems; // No agregar duplicados
      }
      return [...prevItems, { ...game, quantity: 1 }];
    });
  };
  
  // Remover del carrito
  const removeFromCart = (gameId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== gameId));
  };
  
  // Limpiar carrito
  const clearCart = () => {
    setCartItems([]);
  };
  
  // Verificar si está en el carrito
  const isInCart = (gameId) => {
    return cartItems.some(item => item.id === gameId);
  };
  
  // Calcular total
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.precio || 0), 0);
  };
  
  // Cantidad de items
  const getItemCount = () => {
    return cartItems.length;
  };
  
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    getTotal,
    getItemCount
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};