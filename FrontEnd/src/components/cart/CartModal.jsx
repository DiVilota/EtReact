import Modal from '../common/Modal';
import { useCart } from '../../context/CartContext';

const CartModal = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, clearCart, getTotal } = useCart();
  
  const formatPrice = (price) => {
    if (!price || price === 0) return 'Gratis';
    return `$${price.toLocaleString('es-CL')}`;
  };
  
  const handleCheckout = () => {
    alert('Funcionalidad de pago en desarrollo');
    // Aquí irá la integración con pasarela de pago
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🛒 Carrito de Compras"
      size="lg"
    >
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-xl text-gray-400 mb-2">Tu carrito está vacío</p>
          <p className="text-sm text-gray-600">
            Agrega juegos desde el catálogo
          </p>
        </div>
      ) : (
        <div>
          {/* Lista de items */}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto custom-scrollbar">
            {cartItems.map(item => (
              <div 
                key={item.id}
                className="flex gap-4 p-4 bg-bg-dark rounded-lg border border-purple-primary"
              >
                <img 
                  src={item.imagen || '/assets/covers/default-game.jpg'}
                  alt={item.titulo}
                  className="w-24 h-24 object-cover rounded"
                  onError={(e) => {
                    e.target.src = '/assets/covers/default-game.jpg';
                  }}
                />
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-neon-pink mb-1">
                    {item.titulo}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                    {item.descripcion}
                  </p>
                  <p className="text-xl font-bold text-neon-cyan">
                    {formatPrice(item.precio)}
                  </p>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-400 transition-colors text-xl"
                  aria-label="Eliminar del carrito"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
          
          {/* Total y acciones */}
          <div className="border-t-2 border-purple-primary pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-gray-300">Total:</span>
              <span className="text-3xl font-bold text-neon-pink font-orbitron">
                {formatPrice(getTotal())}
              </span>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="flex-1 px-4 py-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors rounded-lg font-bold"
              >
                Vaciar Carrito
              </button>
              
              <button
                onClick={handleCheckout}
                className="flex-1 px-4 py-3 bg-purple-primary hover:bg-neon-pink transition-colors rounded-lg font-bold"
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CartModal;