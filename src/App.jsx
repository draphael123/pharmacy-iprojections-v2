import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, TrendingUp, Package, Calendar } from 'lucide-react';
import PharmacySelector from './components/PharmacySelector';
import WeeklyChart from './components/WeeklyChart';
import MonthlyChart from './components/MonthlyChart';
import SKUBreakdown from './components/SKUBreakdown';
import SummaryCards from './components/SummaryCards';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [data, setData] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/data');
      setData(response.data);
      
      // Set first pharmacy as default
      const pharmacies = Object.keys(response.data.summary);
      if (pharmacies.length > 0) {
        setSelectedPharmacy(pharmacies[0]);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Make sure the backend is running and data is processed.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-red-500 text-center mb-4">
            <Activity className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
            <p className="text-gray-600">{error}</p>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Setup Instructions:</h3>
            <ol className="text-sm space-y-1 list-decimal list-inside text-gray-700">
              <li>Install backend dependencies: <code className="bg-white px-2 py-1 rounded">pip install -r backend/requirements.txt</code></li>
              <li>Process data: <code className="bg-white px-2 py-1 rounded">npm run process-data</code></li>
              <li>Start backend: <code className="bg-white px-2 py-1 rounded">npm run backend</code></li>
              <li>Refresh this page</li>
            </ol>
          </div>
          <button
            onClick={fetchData}
            className="mt-6 w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data || !selectedPharmacy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const pharmacyData = {
    weekly: data.weekly_data.filter(d => d.pharmacy === selectedPharmacy),
    monthly: data.monthly_data.filter(d => d.pharmacy === selectedPharmacy),
    summary: data.summary[selectedPharmacy]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-600 p-3 rounded-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Pharmacy Projections Dashboard
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Real-time inventory tracking and forecasting
                </p>
              </div>
            </div>
            <PharmacySelector
              pharmacies={Object.keys(data.summary)}
              selected={selectedPharmacy}
              onSelect={setSelectedPharmacy}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <SummaryCards summary={pharmacyData.summary} pharmacy={selectedPharmacy} />

        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Projections */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Calendar className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-bold text-gray-900">Weekly Projections</h2>
            </div>
            <WeeklyChart data={pharmacyData.weekly} />
          </div>

          {/* Monthly Overview */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-bold text-gray-900">Monthly Overview</h2>
            </div>
            <MonthlyChart data={pharmacyData.monthly} />
          </div>
        </div>

        {/* SKU Breakdown */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Package className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-bold text-gray-900">SKU Breakdown</h2>
          </div>
          <SKUBreakdown data={pharmacyData.weekly} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            Last updated: {new Date(data.last_updated).toLocaleString()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

