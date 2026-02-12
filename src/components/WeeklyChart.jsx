import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { format, parseISO } from 'date-fns';

function WeeklyChart({ data }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Aggregate by week
    const weeklyMap = new Map();
    
    data.forEach(record => {
      const week = record.year_week;
      if (!weeklyMap.has(week)) {
        weeklyMap.set(week, {
          week: week,
          weekStart: record.week_start,
          quantity: 0,
          revenue: 0,
          isProjection: record.is_projection || false
        });
      }
      
      const entry = weeklyMap.get(week);
      entry.quantity += record.quantity || 0;
      entry.revenue += (record.total || 0) + (record.amount || 0);
    });

    return Array.from(weeklyMap.values())
      .sort((a, b) => new Date(a.weekStart) - new Date(b.weekStart))
      .map(entry => ({
        ...entry,
        weekLabel: format(parseISO(entry.weekStart), 'MMM dd')
      }));
  }, [data]);

  // Find the split point between historical and projected data
  const lastHistoricalIndex = chartData.findIndex(d => d.isProjection) - 1;

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="weekLabel"
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
            formatter={(value, name) => [
              typeof value === 'number' ? value.toLocaleString(undefined, { maximumFractionDigits: 0 }) : value,
              name === 'quantity' ? 'Quantity' : 'Revenue ($)'
            ]}
            labelFormatter={(label) => `Week of ${label}`}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          
          {/* Reference line to separate historical from projected */}
          {lastHistoricalIndex >= 0 && (
            <ReferenceLine
              x={chartData[lastHistoricalIndex]?.weekLabel}
              stroke="#94a3b8"
              strokeDasharray="5 5"
              label={{ value: 'Projection →', position: 'top' }}
            />
          )}
          
          <Line
            type="monotone"
            dataKey="quantity"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={{ fill: '#0ea5e9', r: 4 }}
            activeDot={{ r: 6 }}
            name="Quantity"
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ fill: '#8b5cf6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Revenue ($)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeeklyChart;

