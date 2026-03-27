'use client';

import { FaChartBar, FaChartLine, FaChartPie } from 'react-icons/fa';

export default function AnalyticsPage() {
  const metrics = [
    { label: 'Daily Orders', value: 24, change: '+12%' },
    { label: 'Weekly Revenue', value: '$15,480', change: '+8%' },
    { label: 'Active Users', value: 342, change: '+5%' },
    { label: 'Conversion Rate', value: '3.24%', change: '+0.5%' },
  ];

  
  const revenueData = [
    { day: 'Mon', revenue: 2400 },
    { day: 'Tue', revenue: 3500 },
    { day: 'Wed', revenue: 2800 },
    { day: 'Thu', revenue: 3900 },
    { day: 'Fri', revenue: 4200 },
    { day: 'Sat', revenue: 4800 },
    { day: 'Sun', revenue: 3200 },
  ];

  
  const categoryData = [
    { name: 'Electronics', value: 35, color: '#3B82F6' },
    { name: 'Fashion', value: 25, color: '#10B981' },
    { name: 'Home', value: 20, color: '#F59E0B' },
    { name: 'Sports', value: 12, color: '#EF4444' },
    { name: 'Other', value: 8, color: '#8B5CF6' },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  
  const SimpleBarChart = ({ data, maxValue }: any) => (
    <svg viewBox="0 0 700 300" className="w-full h-80">
      {data.map((item: any, idx: number) => {
        const barHeight = (item.revenue / maxValue) * 250;
        const x = 50 + idx * 90;
        const y = 280 - barHeight;
        
        return (
          <g key={idx}>
            <rect x={x} y={y} width="60" height={barHeight} fill="#3B82F6" rx="4" />
            <text x={x + 30} y="290" textAnchor="middle" className="text-xs font-semibold" fill="#6B7280">
              {item.day}
            </text>
            <text x={x + 30} y={y - 10} textAnchor="middle" className="text-xs font-bold" fill="#1F2937">
              ${(item.revenue / 100).toFixed(0)}
            </text>
          </g>
        );
      })}
    </svg>
  );

  
  const SimplePieChart = ({ data }: any) => {
    const totalValue = data.reduce((sum: number, item: any) => sum + item.value, 0);
    let currentAngle = -90;

    return (
      <svg viewBox="0 0 300 300" className="w-full h-80">
        {data.map((item: any, idx: number) => {
          const sliceValue = item.value;
          const slicePercent = sliceValue / totalValue;
          const sliceAngle = slicePercent * 360;

          const startAngle = currentAngle;
          const endAngle = currentAngle + sliceAngle;

          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;

          const x1 = 150 + 100 * Math.cos(startRad);
          const y1 = 150 + 100 * Math.sin(startRad);
          const x2 = 150 + 100 * Math.cos(endRad);
          const y2 = 150 + 100 * Math.sin(endRad);

          const largeArc = sliceAngle > 180 ? 1 : 0;

          const pathData = [
            `M 150 150`,
            `L ${x1} ${y1}`,
            `A 100 100 0 ${largeArc} 1 ${x2} ${y2}`,
            'Z',
          ].join(' ');

          const labelAngle = startAngle + sliceAngle / 2;
          const labelRad = (labelAngle * Math.PI) / 180;
          const labelX = 150 + 65 * Math.cos(labelRad);
          const labelY = 150 + 65 * Math.sin(labelRad);

          currentAngle = endAngle;

          return (
            <g key={idx}>
              <path d={pathData} fill={item.color} stroke="white" strokeWidth="2" />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-bold"
                fill="white"
              >
                {sliceValue}%
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">View marketplace analytics and insights.</p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">{metric.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              <span className="text-green-600 text-sm font-semibold">{metric.change}</span>
            </div>
          </div>
        ))}
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <FaChartLine className="text-blue-600 dark:text-blue-400" size={20} />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Revenue Trend</h2>
          </div>
          <SimpleBarChart data={revenueData} maxValue={maxRevenue} />
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <FaChartPie className="text-green-600 dark:text-green-400" size={20} />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Category Distribution</h2>
          </div>
          <SimplePieChart data={categoryData} />
        </div>
      </div>

    
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales by Category</h2>
        <div className="space-y-4">
          {categoryData.map((cat) => (
            <div key={cat.name}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cat.name}</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{cat.value}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full transition-all duration-300 rounded-full"
                  style={{ width: `${cat.value}%`, backgroundColor: cat.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Selling Products</h2>
        <div className="space-y-3">
          {[
            { name: 'Wireless Headphones', sales: 245, icon: '🎧' },
            { name: 'Gaming Keyboard', sales: 189, icon: '⌨️' },
            { name: 'Office Chair', sales: 156, icon: '🪑' },
            { name: 'Monitor', sales: 142, icon: '🖥️' },
          ].map((product) => (
            <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-xl">{product.icon}</span>
                <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
              </div>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">{product.sales} sales</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
