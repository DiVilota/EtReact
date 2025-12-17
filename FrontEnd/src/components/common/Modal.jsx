import { useEffect } from "react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
}) => {
  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-full mx-4",
  };

  const sizeClass = sizes[size] || sizes.md;

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm animate-fade"
      onClick={onClose}
    >
      {/* Contenedor del modal */}
      <div
        className={`
          ${sizeClass}
          w-full
          bg-bg-card
          border-2 border-purple-primary
          rounded-xl
          shadow-2xl
          shadow-purple-primary/50
          animate-scaleIn
          max-h-[90vh]
          overflow-y-auto
          custom-scrollbar
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del modal */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-purple-primary sticky top-0 bg-bg-card z-10">
            {title && (
              <h2 className="text-2xl font-bold text-neon-pink neon-glow font-orbitron">
                {title}
              </h2>
            )}

            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-neon-cyan hover:text-neon-pink transition-colors text-2xl ml-auto"
                aria-label="Cerrar modal"
                type="button"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* Contenido del modal */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
