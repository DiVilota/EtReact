const StatCard = ({ title, value, icon, color = 'purple-primary', trend, subtitle }) => {
  return (
    <div className={`p-6 bg-bg-card border-2 border-${color} rounded-xl hover:border-neon-pink transition-all`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-4xl font-bold text-neon-pink font-orbitron">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
      
      {trend && (
        <div className="flex items-center gap-2 text-sm">
          <span className={trend > 0 ? 'text-green-500' : 'text-red-500'}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          <span className="text-gray-500">vs mes anterior</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
