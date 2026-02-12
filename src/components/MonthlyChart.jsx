import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function MonthlyChart({ data }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Aggregate by month
    const monthlyMap = new Map();
    
    data.forEach(record => {
      const month = record.year_month;
      if (!monthlyMap.has(month)) {
        monthlyMap.set(month, {
          month: month,
          quantity: 0,
          revenue: 0
        });
      }
      
      const entry = monthlyMap.get(month);
      entry.quantity += record.quantity || 0;
      entry.revenue += (record.total || 0) + (record.amount || 0);
    });

    return Array.from(monthlyMap.values())
      .sort((a, b) => a.month.localeCompare(b.month))
      .map(entry => ({
        ...entry,
        monthLabel: new Date(entry.month + '-01').toLocaleDateString('en-US', { 
          month: 'short', 
          year: 'numeric' 
        })
      }));
  }, [data]);

  // Calculate month-over-month growth
  const withGrowth = chartData.map((entry, index) => {
    if (index === 0) return { ...entry, growth: 0 };
    
    const prevRevenue = chartData[index - 1].revenue;
    const growth = prevRevenue > 0 
      ? ((entry.revenue - prevRevenue) / prevRevenue) * 100 
      : 0;
    
    return { ...entry, growth };
  });

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={withGrowth}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="monthLabel"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px'
            }}
            formatter={(value, name) => {
              if (name === 'growth') {
                return [`${value.toFixed(1)}%`, 'MoM Growth'];
              }
              return [
                value.toLocaleString(undefined, { maximumFractionDigits: 0 }),
                name === 'quantity' ? 'Quantity' : 'Revenue ($)'
              ];
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="rect"
          />
          <Bar
            dataKey="quantity"
            fill="#0ea5e9"
            radius={[8, 8, 0, 0]}
            name="Quantity"
          />
          <Bar
            dataKey="revenue"
            fill="#8b5cf6"
            radius={[8, 8, 0, 0]}
            name="Revenue ($)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyChart;

