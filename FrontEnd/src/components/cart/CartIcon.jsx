import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import CartModal from './CartModal';

const CartIcon = () => {
  const { getItemCount } = useCart();
  const [showCart, setShowCart] = useState(false);
  const itemCount = getItemCount();
  
  return (
    <>
      <button
        onClick={() => setShowCart(true)}
        className="relative p-2 hover:text-neon-pink transition-colors"
        aria-label="Carrito de compras"
      >
        <span className="text-2xl">🛒</span>
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-neon-pink text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
      
      <CartModal 
        isOpen={showCart}
        onClose={() => setShowCart(false)}
      />
    </>
  );
};

export default CartIcon;