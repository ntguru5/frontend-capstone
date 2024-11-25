import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import LineGraph from '../components/LineGraph.jsx';
import PieChart from '../components/PieChart.jsx';
import BathroomLogModal from '../components/bathroomLogModal.jsx';
// import { bathroomApi } from '../api/axios.js';

export default function Home() {
  const [isBathroomModalOpen, setIsBathroomModalOpen] = useState(false);
  const [bathroomData, setBathroomData] = useState({
    pee: {
      data: [],
      labels: []
    },
    poop: {
      data: [],
      labels: []
    },
    consistency: {
      data: [0, 0, 0],
      labels: ['Normal', 'Soft', 'Hard']
    }
  });
  const [error, setError] = useState('');

  const fetchBathroomData = async () => {
    try {
      const { data } = await axios.get('/api/bathroom-logs/stats');
      if (data.success) {
        setBathroomData(data.data);
        setError('');
      }
    } catch (err) {
      setError('Error fetching bathroom data. Please try again later.');
      console.error('Error fetching bathroom data:', err.message);
    }
  };

  useEffect(() => {
    fetchBathroomData();
  }, []);

  const handleAddBathroomLog = async (logData) => {
    try {
      await axios.post('/api/bathroom-logs', logData);
      await fetchBathroomData();
      setIsBathroomModalOpen(false);
      setError('');
    } catch (err) {
      setError('Error adding bathroom log. Please try again.');
      console.error('Error adding bathroom log:', err.message);
    }
  };

  const getMostCommonTime = () => {
    const allData = [...bathroomData.pee.data, ...bathroomData.poop.data];
    const total = allData.reduce((a, b) => a + b, 0);
    const average = total / (allData.length || 1);

    if (average === 0) return { time: 'N/A', description: 'No data available' };

    const maxIndex = allData.indexOf(Math.max(...allData));
    const time = bathroomData.pee.labels[maxIndex];

    return {
      time,
      description: `Most active on ${time}`
    };
  };

  const mostCommonTime = getMostCommonTime();

  return (
    <div className="p-8 ml-20 min-h-screen relative">
      <div className="fixed inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none ml-20">
        <span className="text-[40rem]">💩</span>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="relative z-10">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Pet Health Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Urination Frequency</h2>
              <button
                onClick={() => setIsBathroomModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus size={16} />
                Add Log
              </button>
            </div>
            <LineGraph
              title="Times per Day"
              data={bathroomData.pee.data}
              labels={bathroomData.pee.labels}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Defecation Frequency</h2>
              <button
                onClick={() => setIsBathroomModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus size={16} />
                Add Log
              </button>
            </div>
            <LineGraph
              title="Times per Day"
              data={bathroomData.poop.data}
              labels={bathroomData.poop.labels}
            />
          </div>
        </div>

        <div className="max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Stool Consistency Distribution</h2>
          </div>
          <PieChart
            data={bathroomData.consistency.data}
            labels={bathroomData.consistency.labels}
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Average Urination</h3>
            <p className="text-2xl font-semibold text-gray-900">
              {(bathroomData.pee.data.reduce((a, b) => a + b, 0) / Math.max(1, bathroomData.pee.data.length)).toFixed(1)}x/day
            </p>
            <p className="text-sm text-gray-500 mt-1">Last 7 days</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Average Defecation</h3>
            <p className="text-2xl font-semibold text-gray-900">
              {(bathroomData.poop.data.reduce((a, b) => a + b, 0) / Math.max(1, bathroomData.poop.data.length)).toFixed(1)}x/day
            </p>
            <p className="text-sm text-gray-500 mt-1">Last 7 days</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Most Common Time</h3>
            <p className="text-2xl font-semibold text-gray-900">{mostCommonTime.time}</p>
            <p className="text-sm text-gray-500 mt-1">{mostCommonTime.description}</p>
          </div>
        </div>
      </div>

      <BathroomLogModal
        isOpen={isBathroomModalOpen}
        onClose={() => setIsBathroomModalOpen(false)}
        onSubmit={handleAddBathroomLog}
      />
    </div>
  );
}
