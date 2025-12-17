const BarChart = ({ data, title }) => {
  // data: [{ label, value }]
  
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="p-6 bg-bg-card border-2 border-purple-primary rounded-xl">
      <h3 className="text-xl font-bold text-neon-cyan mb-6 font-orbitron">
        {title}
      </h3>
      
      <div className="space-y-4">
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          
          return (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-300 font-mono">{item.label}</span>
                <span className="text-sm text-neon-cyan font-bold">{item.value}</span>
              </div>
              
              <div className="w-full bg-bg-dark rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-primary to-neon-pink transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
