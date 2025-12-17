const Loading = ({ message = "Cargando..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-16 h-16">
        {/* Spinner exterior - Rosa neón */}
        <div className="absolute inset-0 border-4 border-neon-pink border-t-transparent rounded-full animate-spin" />

        {/* Spinner interior - Cyan neón */}
        <div className="absolute inset-2 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin" />

        {/* Punto central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-purple-primary rounded-full animate-pulse" />
        </div>
      </div>

      {/* Mensaje de carga */}
      <p className="mt-4 text-neon-cyan font-mono text-sm animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default Loading;
