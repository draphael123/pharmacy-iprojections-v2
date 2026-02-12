import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown } from 'lucide-react';

function SKUBreakdown({ data }) {
  const [sortBy, setSortBy] = useState('quantity');
  const [sortOrder, setSortOrder] = useState('desc');
  const [expandedSKU, setExpandedSKU] = useState(null);

  const skuData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const skuMap = new Map();
    
    data.forEach(record => {
      const sku = record.sku;
      if (!skuMap.has(sku)) {
        skuMap.set(sku, {
          sku: sku,
          quantity: 0,
          revenue: 0,
          weeks: [],
          projectedQuantity: 0,
          historicalQuantity: 0
        });
      }
      
      const entry = skuMap.get(sku);
      entry.quantity += record.quantity || 0;
      entry.revenue += (record.total || 0) + (record.amount || 0);
      
      if (record.is_projection) {
        entry.projectedQuantity += record.quantity || 0;
      } else {
        entry.historicalQuantity += record.quantity || 0;
      }
      
      entry.weeks.push({
        week: record.year_week,
        quantity: record.quantity || 0,
        isProjection: record.is_projection || false
      });
    });

    let result = Array.from(skuMap.values());
    
    // Calculate trend
    result = result.map(item => {
      const recentWeeks = item.weeks.slice(-4);
      const olderWeeks = item.weeks.slice(-8, -4);
      
      const recentAvg = recentWeeks.reduce((sum, w) => sum + w.quantity, 0) / recentWeeks.length;
      const olderAvg = olderWeeks.length > 0 
        ? olderWeeks.reduce((sum, w) => sum + w.quantity, 0) / olderWeeks.length 
        : recentAvg;
      
      const trend = olderAvg > 0 ? ((recentAvg - olderAvg) / olderAvg) * 100 : 0;
      
      return { ...item, trend };
    });

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return result;
  }, [data, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              onClick={() => handleSort('sku')}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              <div className="flex items-center space-x-1">
                <span>SKU</span>
                <SortIcon field="sku" />
              </div>
            </th>
            <th
              onClick={() => handleSort('quantity')}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              <div className="flex items-center space-x-1">
                <span>Total Quantity</span>
                <SortIcon field="quantity" />
              </div>
            </th>
            <th
              onClick={() => handleSort('revenue')}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              <div className="flex items-center space-x-1">
                <span>Revenue</span>
                <SortIcon field="revenue" />
              </div>
            </th>
            <th
              onClick={() => handleSort('trend')}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              <div className="flex items-center space-x-1">
                <span>Trend</span>
                <SortIcon field="trend" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Projected vs Historical
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {skuData.slice(0, 50).map((item) => (
            <tr
              key={item.sku}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setExpandedSKU(expandedSKU === item.sku ? null : item.sku)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{item.sku}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.quantity.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  ${item.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`flex items-center text-sm ${item.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.trend >= 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(item.trend).toFixed(1)}%
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${(item.historicalQuantity / item.quantity) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {((item.projectedQuantity / item.quantity) * 100).toFixed(0)}% proj
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {skuData.length > 50 && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Showing top 50 of {skuData.length} SKUs
        </div>
      )}
      
      {skuData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No SKU data available
        </div>
      )}
    </div>
  );
}

export default SKUBreakdown;

