const UsersTable = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-purple-primary">
            <th className="text-left p-4 text-neon-cyan">ID</th>
            <th className="text-left p-4 text-neon-cyan">Usuario</th>
            <th className="text-left p-4 text-neon-cyan">Nombre</th>
            <th className="text-left p-4 text-neon-cyan">Email</th>
            <th className="text-left p-4 text-neon-cyan">Rol</th>
            <th className="text-left p-4 text-neon-cyan">Estado</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b border-purple-primary/30 hover:bg-bg-dark transition-colors">
              <td className="p-4 text-gray-400">{user.id}</td>
              <td className="p-4 text-white font-bold">{user.usuario}</td>
              <td className="p-4 text-gray-300">{user.nombre}</td>
              <td className="p-4 text-gray-400">{user.email}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  user.rol === 'admin' 
                    ? 'bg-purple-primary text-white' 
                    : 'bg-gray-700 text-gray-300'
                }`}>
                  {user.rol}
                </span>
              </td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  user.activo 
                    ? 'bg-green-600 text-white' 
                    : 'bg-red-600 text-white'
                }`}>
                  {user.activo ? 'Activo' : 'Inactivo'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {users.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No hay usuarios registrados
        </div>
      )}
    </div>
  );
};

export default UsersTable;
