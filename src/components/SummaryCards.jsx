import React from 'react';
import { Package, TrendingUp, DollarSign, Layers } from 'lucide-react';

function SummaryCards({ summary, pharmacy }) {
  if (!summary) return null;

  const cards = [
    {
      title: 'Total SKUs',
      value: summary.total_skus || 0,
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Total Quantity',
      value: (summary.total_quantity || 0).toLocaleString(),
      icon: Layers,
      color: 'bg-green-500',
      change: '+8.2%'
    },
    {
      title: 'Total Revenue',
      value: `$${(summary.total_revenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: 'bg-purple-500',
      change: '+15.3%'
    },
    {
      title: 'Avg Weekly Quantity',
      value: (summary.avg_weekly_quantity || 0).toLocaleString(undefined, { maximumFractionDigits: 0 }),
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+5.7%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${card.color} p-3 rounded-lg`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-green-600 text-sm font-semibold">
              {card.change}
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">{card.title}</h3>
          <p className="text-3xl font-bold text-gray-900">{card.value}</p>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;

